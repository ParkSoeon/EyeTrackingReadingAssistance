"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import Separator from "@/components/ui/separator"

type ReportData = {
  bookTitle: string
  date: Date | null
  share: {
    title: string
    text: string
  },
  discussion: {
    wordCloudImage: string
    topWords: string[]
  }
  storyAnalysis: {
    branches: {
      situation: string
      choice: string
      reason: string
    }[]
    reconstructed: string
    storyType: string
    otherTypes: string[]
  }
  quiz: {
    total: number
    correct: number
    items: {
      number: number
      question: string
      answer: string
      isCorrect: boolean
      type: string
    }[]
  }
}

export default function ReportRoute() {
  const [data, setData] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // useEffect(() => {
  //   fetch("/api/report")
  //     .then((res) => res.json())
  //     .then(setData)
  //     .catch(() => setError("불러오기 실패"))
  //     .finally(() => setLoading(false))
  // }, [])
  useEffect(() => {
    const mock: ReportData = {
      bookTitle: "금도끼 은도끼",
      date: new Date(),
      share: {
        title: "가천 어린이 독서 보고서",
        text: "가천이의 독서 성장을 확인해보세요!",
      },
      discussion: {
        wordCloudImage: "https://i.ibb.co/wzV9gVm/wordcloud-example.png",
        topWords: ["연기", "사람", "기사", "생각", "연예인"],
      },
      storyAnalysis: {
        reconstructed:
          "가천이는 금도끼를 보고 반짝이는 모습에 반해 금도끼를 선택했어요...",
        storyType: "흥미위주 탐험형🏕️",
        otherTypes: ["도덕 추구형 (53%)", "감성/공감형 (27%)"],
        branches: [
          {
            situation: "산신령이 금도끼를 줬을 때",
            choice: "금도끼",
            reason: "예뻐서",
          },
          {
            situation: "산신령이 은도끼를 줬을 때",
            choice: "은도끼",
            reason: "자기 도끼니까",
          },
        ],
      },
      quiz: {
        total: 5,
        correct: 4,
        items: [
          {
            number: 1,
            question: "산신령이 나타났을 때, 나무꾼은 어떻게 반응했나요?",
            answer: "놀랐다",
            isCorrect: true,
            type: "기본 이해력",
          },
          {
            number: 2,
            question: "산신령이 무엇을 먼저 보여줬나요?",
            answer: "금도끼",
            isCorrect: true,
            type: "사고력",
          },
          {
            number: 3,
            question: "나무꾼이 정직하다는 걸 어떻게 알 수 있었나요?",
            answer: "자기 도끼만 가져갔다",
            isCorrect: true,
            type: "논리성",
          },
          {
            number: 4,
            question: "산신령은 나무꾼에게 왜 보상을 줬나요?",
            answer: "거짓말을 했기 때문에",
            isCorrect: false,
            type: "논리성",
          },
          {
            number: 5,
            question: "결국 나무꾼이 받은 것은?",
            answer: "모든 도끼",
            isCorrect: true,
            type: "기본 이해력",
          },
        ],
      },
    }

    setData(mock)
  }, [])

  // if (loading) return <div className="p-6">로딩 중...</div>
  if (error || !data) return <div className="p-6 text-red-600">{error || "데이터 없음"}</div>

  return <ReportPage data={data} />
}

function ReportPage({ data }: { data: ReportData }) {
  const [isOpen, setIsOpen] = useState(false)
  const today = format(data.date ?? new Date(), "yyyy/MM/dd (E)", { locale: ko })

  return (
    <ScrollArea className="flex-1 p-10 w-[90%] mx-auto">
      <div className="relative mb-12">
        <div className="absolute top-20 left-[100px] right-0 text-large text-gray-600 font-bold space-y-1 text-right pt-10 mr-20">
          <p>📅 날짜: {today}</p>
          <p>📖 도서명: {data.bookTitle}</p>
        </div>

        <div className="text-center pt-8">
          <h1 className="text-5xl font-extrabold">가천 어린이 독서 보고서</h1>
        </div>
      </div>

      {/* 1. 퀴즈 채점 결과 */}
      <section className="mb-8 pt-16 pl-6">
        <h2 className="text-2xl font-extrabold mb-4 pt-4 pl-10">1. 도서 내용 퀴즈 채점 결과</h2>
        <div className="text-lg font-bold mb-4 pt-4 pl-16">
          <p>가천 어린이가 푼 도서 내용 퀴즈 결과입니다. 📝</p>
          총 <span className="text-blue-600">{data.quiz.total}</span> 문제 중,{" "}
          <span className="text-green-600">{data.quiz.correct}</span> 문제를 맞혔어요! 🎉
        </div>

        <div className="space-y-3 text-base pt-4 pl-16 pb-8">
          {data.quiz.items.map((item, idx) => (
            <div key={idx} className="p-3 bg-gray-100 rounded-lg pt-6 pb-6 mr-20">
              <p className="font-medium">
                <span className="font-semibold">{item.number}번)</span> 질문: {item.question}{" "}
                (질문 유형: {item.type})
              </p>
              <p className="mt-1">
                가천이의 답변: {item.answer} (
                <span
                  className={`font-semibold ${
                    item.isCorrect ? "text-green-600" : "text-yellow-500"
                  }`}
                >
                  {item.isCorrect ? "✅ 정답" : "🤔 오답"}
                </span>
                )
              </p>
            </div>
          ))}
        </div>
      </section>

      <Separator className="my-8" />

      {/* 2. 이야기 분석 */}
      <section className="mb-8 pt-5 pl-6 mr-20">
        <h2 className="text-2xl font-extrabold mb-4 pt-4 pl-10">2. 재구성 이야기 분석</h2>

        <div className="text-lg font-bold mb-4 pt-4 pl-16">
          <p>가천 어린이의 재구성 이야기 결과입니다. 📚</p>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-700 text-white text-m font-bold ml-20 px-5 py-1 rounded-full hover:bg-gray-700 transition"
        >
          {isOpen ? "▼ 이야기 분기 상세 접기" : "▶ 이야기 분기 상세 보기"}
        </button>

        {isOpen && (
          <div className="mt-4 bg-gray-200 p-4 ml-20 rounded-lg text-lg space-y-3">
            {data.storyAnalysis.branches.map((branch, idx) => (
              <div key={idx}>
                <p className="font-bold text-gray-900 pt-2 pl-5">분기 {idx + 1}) 상황: {branch.situation}</p>
                <p className="ml-4 text-gray-800 pl-5 pt-3">
                  가천이의 선택: {branch.choice}
                  <br />
                  이유: {branch.reason}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-gray-800 ml-20">
          <p className="text-lg font-bold text-gray-900">가천이의 재구성 이야기:</p>
          <p className="pl-5 pt-3">{data.storyAnalysis.reconstructed}</p>
        </div>

        <Separator className="my-8 mx-auto w-[90%]" />

        <div className="mt-10 ml-20 pl-10">
          <p className="text-lg font-bold text-gray-900">가천 어린이는</p>
          <p className="pl-5 pt-3 text-2xl font-bold">→ {data.storyAnalysis.storyType}</p>
        </div>

        <Separator className="my-8 mx-auto w-[90%]" />

        <div className="mt-8 text-gray-800 ml-20">
          <p className="text-lg font-bold text-gray-900">이 외의 독서 유형 예시:</p>
          {data.storyAnalysis.otherTypes.map((type, idx) => (
            <p key={idx} className="text-lg pl-5 pt-3">
              • {type}
            </p>
          ))}
        </div>
      </section>

      <Separator className="my-8" />

      {/* 3. 토론 분석 */}
      <section className="mb-8 pt-5 pl-6">
        <h2 className="text-2xl font-extrabold mb-4 pt-4 pl-10">3. 토론 태도 분석</h2>

        <div className="bg-gray-200 p-6 rounded-md mb-6 ml-20 mr-20">
          <p className="ml-5 text-lg font-semibold mb-2">🖼 워드클라우드</p>
          <img
            src={data.discussion.wordCloudImage}
            alt="Word Cloud"
            className="mx-auto rounded-md border shadow-md"
            style={{ maxHeight: "300px", objectFit: "contain" }}
          />
        </div>

        <div className="mb-4 ml-20 text-lg pb-10">
          <h3 className="font-bold mb-2">📝 최빈 단어 Top 5</h3>
          <ul className="list-disc list-inside text-gray-800 space-y-1 pl-4">
            {data.discussion.topWords.map((word, idx) => (
              <li key={idx}>{word}</li>
            ))}
          </ul>
        </div>
      </section>

      <div className="p-6 bg-blue-600 text-white rounded-full text-2xl font-bold mx-auto text-center w-[60%] flex items-center justify-center h-16">
        오늘도 열심히 공부한 가천이를 위해 큰 칭찬의 말 부탁드려요🧣 🙌
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-500 text-xl font-bold mb-2 pt-8">레포트 내용 공유하기</p>

        <button
          onClick={() => {
            if (navigator.share) {
              navigator
                .share({
                  title: data.share.title,
                  text: data.share.text,
                  url: window.location.href,
                })
                .catch((err) => console.log("공유 실패:", err))
            } else {
              alert("공유 기능이 이 브라우저에서 지원되지 않아요.")
            }
          }}
          className="mx-auto text-gray-700 hover:text-blue-600 transition pb-10 pt-4"
        >
          <img
            src="https://img.icons8.com/ios11/512/share.png"
            alt="Share Icon"
            className="h-8 w-8 mx-auto"
          />
        </button>
      </div>
    </ScrollArea>
  )
}