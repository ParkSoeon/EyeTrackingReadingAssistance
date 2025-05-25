import openai
from openai import OpenAI

import random
import json
import numpy as np
import re
from sklearn.metrics.pairwise import cosine_similarity

# API 키 설정
client = OpenAI(api_key="")

# Load Embedding & Text Data
with open(
    "./tagged_woodcutter_chunks_with_embeddings.json",
    "r",
    encoding="utf-8",
) as f:
    embeddings = json.load(f)

with open(
    "./tagged_woodcutter_chunks.json",
    "r",
    encoding="utf-8",
) as f:
    chunks = json.load(f)

embedding_lookup = {e["text_id"]: e["embedding"] for e in embeddings}

question_types = ["이해형", "추론형", "비판적 사고형", "창의적 사고형"]
answer_type_counts = {"서술형": 4, "4개의 선택지가 있는 객관식": 2, "단답형": 3}


def retrieve_top_k_chunks(query_text, all_chunks, k=3):
    query_embedding = (
        client.embeddings.create(model="text-embedding-3-small", input=query_text)
        .data[0]
        .embedding
    )
    query_embedding = np.array([query_embedding])

    scores = []
    for chunk in all_chunks:
        chunk_id = chunk["chunk_id"]
        if chunk_id not in embedding_lookup:
            continue
        chunk_embedding = np.array([embedding_lookup[chunk_id]])
        sim = cosine_similarity(query_embedding, chunk_embedding)[0][0]
        scores.append((sim, chunk))

    top_k = sorted(scores, key=lambda x: x[0], reverse=True)[:k]
    return [c["text"] for _, c in top_k]


def generate_question(chunk, question_type, answer_type):
    context_text = chunk["text"]

    system_prompt = f"""
    당신은 어린이 독서 프로그램을 위한 문제 출제 AI입니다.
    다음 문장을 바탕으로 '{question_type}' 유형의 '{answer_type}' 형식 문제를 하나 만들어 주세요.
    질문은 원문 내용을 벗어나지 않도록 생성하고, 반드시 다음 JSON 코드 블럭으로 출력해주세요:

    ```json
    {{
    "문제": "...",
    "답변": "...",
    "근거": "..."
    }}
    ```
    """

    top_chunks = retrieve_top_k_chunks(context_text, chunks, k=3)
    combined_context = "\n".join(
        [f"{i+1}. {text}" for i, text in enumerate(top_chunks)]
    )

    user_prompt = f"""
    [문단들]
    {combined_context}

    [요청]
    '{question_type}' 유형의 '{answer_type}' 형식 문제를 하나 만들어 주세요.
    질문은 주어진 문단에 기반해 생성하고, 정답과 반드시 정답의 '근거 문장'도 함께 생성해 주세요.
    """

    try:
        response = client.chat.completions.create(
            model="gpt-4",
            temperature=0.7,
            messages=[
                {"role": "system", "content": system_prompt.strip()},
                {"role": "user", "content": user_prompt.strip()},
            ],
        )
        content = response.choices[0].message.content
        content_clean = re.sub(r"```json|```", "", content).strip()
        parsed = json.loads(content_clean)

        return {
            "question_type": question_type,
            "answer_type": answer_type,
            "chunk_id": chunk["chunk_id"],
            "text": chunk["text"],
            "question": parsed["문제"],
            "answer": parsed["답변"],
            "rationale": parsed["근거"],
        }

    except Exception as e:
        return {
            "question_type": question_type,
            "answer_type": answer_type,
            "chunk_id": chunk["chunk_id"],
            "text": chunk["text"],
            "question": "ERROR",
            "answer": "ERROR",
            "rationale": f"Parsing failed: {str(e)}",
        }


# 질문 생성 및 저장
question_list = []
used_chunk_ids = set()

chunk_pool = chunks.copy()
random.shuffle(chunk_pool)

for q_type in question_types:
    for a_type, count in answer_type_counts.items():
        used_chunk_ids = set()
        for _ in range(count):
            for chunk in chunk_pool:
                if chunk["chunk_id"] not in used_chunk_ids:
                    used_chunk_ids.add(chunk["chunk_id"])
                    item = generate_question(chunk, q_type, a_type)
                    question_list.append(item)
                    print(
                        f"생성 완료: {q_type} / {a_type} (chunk_id: {chunk['chunk_id']})"
                    )
                    break

with open("generated_questions.json", "w", encoding="utf-8") as f:
    json.dump(question_list, f, ensure_ascii=False, indent=4)
