# 문제를 직접 생성하고 (5개), 사용자와의 답을 비교해 정답수 체크 
# 후 사용자가 궁금한점 질의응답 


# cd 12-RAG
#streamlit run app2.py
import streamlit as st
from dotenv import load_dotenv
import os
import json

from langchain_community.document_loaders import PyMuPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

# 환경 변수 불러오기
load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")

# 문서 로드 및 분할
loader = PyMuPDFLoader("data/나무꾼.pdf")
docs = loader.load()

text_splitter = RecursiveCharacterTextSplitter(chunk_size=200, chunk_overlap=50)
split_documents = text_splitter.split_documents(docs)

# 임베딩 및 벡터스토어
embeddings = OpenAIEmbeddings()
vectorstore = FAISS.from_documents(split_documents, embeddings)
retriever = vectorstore.as_retriever()

# RAG 프롬프트 (산신령)
# prompt = PromptTemplate.from_template(
#     """You are an assistant for question-answering tasks.
# Should you speak like a mountain spirit. Let's answer without honorifics.
# The way you speak is antique and formal, and you should use an old-fashioned tone.

# Use the following context to answer the question.
# If you don't know the answer, say you don't know.

# Answer in Korean.

# #Context:
# {context}

# #Question:
# {question}

# #Answer:"""
# )

#프롬프트2( 아이에게 )
prompt = PromptTemplate.from_template(
    """You are an assistant for question-answering tasks.
Please answer as if you're kindly explaining things to a child. Use simple, friendly, and clear Korean.
Avoid difficult words, and speak like you're having a gentle conversation with a young child.

Use the following context to answer the question.
If you don't know the answer, say you don't know in a kind and honest way.

Answer in Korean.


#Context:
{context}

#Question:
{question}

#Answer:"""
)


# 체인 구성
llm = ChatOpenAI(model_name="gpt-4o", temperature=0, openai_api_key=openai_api_key)
chain = (
    {"context": retriever, "question": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)

# 여기부터 퀴즈 + 대화 상태 관리 및 UI
import re

def generate_quiz():
    prompt_text = """
'나무꾼' 이야기 관련 문제 5개를 JSON 배열 형식으로 만들어줘.
각 문제는 이렇게 구성돼야 해:
{
    "question": "문제 내용",
    "answer": "정답(간단히)",
    "explanation": "간단한 정답 해설"
}

예:
[
  {"question": "나무꾼은 어떤 도끼가 자신의 도끼라고 하였니?", 
   "answer": "쇠도끼", 
   "explanation": "나무꾼은 쇠도끼를 자신의 것으로 말했다."
   },
  ...
]

문제, 정답, 해설 모두 한국어로 써줘.
"""
    response = llm.invoke(prompt_text)
    raw_text = response.content.strip()
    print("🔍 응답 원문:\n", raw_text[:300])
    
     # 코드 블럭 기호(````json`) 제거 및 JSON 배열 추출
    json_str_match = re.search(r'\[\s*{.*?}\s*]', raw_text, re.DOTALL)
    if json_str_match:
        json_str = json_str_match.group()
        try:
            quiz_list = json.loads(json_str)
            return quiz_list
        except Exception as e:
            st.error(f"JSON 파싱 실패: {e}")
    else:
        st.error("응답에서 JSON 배열을 찾을 수 없습니다.")

    return []

    #try:
        #quiz_list = json.loads(response.content)

    #except Exception as e:
       # st.error(f"문제 생성 JSON 파싱 실패: {e}")
      #  quiz_list = []
   # return quiz_list

if "quiz_list" not in st.session_state:
    st.session_state.quiz_list = generate_quiz()
    st.session_state.current_q = 0
    st.session_state.score = 0
    st.session_state.user_answers = []
    st.session_state.quiz_finished = False

st.title("📚 질의응답 Chat")

if not st.session_state.quiz_finished and st.session_state.current_q < len(st.session_state.quiz_list):
    quiz = st.session_state.quiz_list[st.session_state.current_q]
    st.write(f"문제 {st.session_state.current_q + 1}: {quiz['question']}")
    user_answer = st.text_input("답을 입력하세요:", key=f"answer_{st.session_state.current_q}")

    if st.button("제출", key=f"submit_{st.session_state.current_q}"):
        if not user_answer.strip():
            st.warning("답을 입력해주세요.")
        else:
            st.session_state.user_answers.append(user_answer.strip())
            correct_answer = quiz['answer'].strip()
            if user_answer.strip() == correct_answer:
                st.success("정답입니다!")
                st.session_state.score += 1
            else:
                st.error(f"틀렸습니다. 정답은 '{correct_answer}' 입니다.")
                
            # 입력란 초기화
            #st.session_state[f"answer_{st.session_state.current_q}"] = ""
        
            st.session_state.current_q += 1
            if st.session_state.current_q == len(st.session_state.quiz_list):
                st.session_state.quiz_finished = True
            st.rerun()

elif st.session_state.quiz_finished:
    st.write(f"퀴즈 완료! 점수: {st.session_state.score} / {len(st.session_state.quiz_list)}")
    st.write("오답 해설:")
    for i, quiz in enumerate(st.session_state.quiz_list):
        user_ans = st.session_state.user_answers[i] if i < len(st.session_state.user_answers) else ""
        if user_ans != quiz['answer']:
            st.write(f"- 문제 {i+1}: {quiz['question']}")
            st.write(f"  - 당신의 답: {user_ans}")
            st.write(f"  - 정답: {quiz['answer']}")
            st.write(f"  - 해설: {quiz['explanation']}")
            st.write("")

    st.write("---")
    st.write("궁금한 점을 질문해 주세요.")

    user_question = st.text_input("질문 입력:", key="user_question")
    if st.button("질문하기", key="ask_button") and user_question.strip():
        with st.spinner("답변 생성 중..."):
            # RAG 체인에 질문을 보내서 문서 기반 답변 생성
            response = chain.invoke(user_question)
            st.write(response)

else:
    # 퀴즈 시작 전이나 기타 초기 상태일 경우
    st.write("잠시만 기다려 주세요... 문제를 생성 중입니다.")