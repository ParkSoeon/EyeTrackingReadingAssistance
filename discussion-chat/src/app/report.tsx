"use client"

import type React from "react"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send } from "lucide-react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import Separator from "@/components/ui/separator"

export default function ReportPage() {
  const today = format(new Date(), "yyyy/MM/dd (E)", { locale: ko })
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ScrollArea className="flex-1 p-10 w-[90%] mx-auto">
      <div className="relative mb-12">
        {/* 날짜 및 도서명 오른쪽 상단 고정 */}
        <div className="absolute top-20 left-[100px] right-0 text-large text-gray-600 font-bold space-y-1 text-right pt-10 mr-20">
          <p> <span className="font-bold"> 📅 날짜:{today} </span></p>
          <p> <span className="font-bold"> 📖 도서명: 금도끼 은도끼 </span></p>
        </div>

        {/* 제목 중앙 정렬 */}
        <div className="text-center pt-8">
          <h1 className="text-5xl font-extrabold">
            가천 어린이 독서 보고서
          </h1>
        </div>
      </div>

      {/* 1. 퀴즈 채점 결과 */}
      <section className="mb-8 pt-16 pl-6">
        <h2 className="text-2xl font-extrabold mb-4 pt-4 pl-10">1. 도서 내용 퀴즈 채점 결과</h2>
        <p className="text-lg font-bold mb-4 pt-4 pl-16">
          <p> 가천 어린이가 푼 도서 내용 퀴즈 결과입니다. 📝 </p>
          총 <span className="text-blue-600">5</span> 문제 중,{" "}
          <span className="text-green-600">4</span> 문제를 맞혔어요! 🎉
        </p>

        <div className="space-y-3 text-base pt-4 pl-16 pb-8">
          <div className="p-3 bg-gray-100 rounded-lg pt-6 pb-6 mr-20">
        <p className="font-medium"><span className="font-semibold">1번)</span> 질문: 나무꾼은~~ (질문 유형: 사고력)</p>
        <p className="mt-1">가천이의 답변: @@ (<span className="text-green-600 font-semibold">✅ 정답</span>)</p>
          </div>

          <div className="p-3 bg-gray-100 rounded-lg pt-6 pb-6 mr-20">
        <p className="font-medium"><span className="font-semibold">2번)</span> 질문: 산신령은~~ (질문 유형: 논리성) ⏱</p>
        <p className="mt-1">가천이의 답변: 3번 (<span className="text-green-600 font-semibold">✅ 정답</span>)</p>
          </div>

          <div className="p-3 bg-gray-100 rounded-lg pt-6 pb-6 mr-20">
        <p className="font-medium"><span className="font-semibold">3번)</span> 질문: 나무꾼은~~한 다음, ~~ (질문 유형: 논리성)</p>
        <p className="mt-1">가천이의 답변: ### (<span className="text-green-600 font-semibold">✅ 정답</span>)</p>
          </div>

          <div className="p-3 bg-gray-100 rounded-lg pt-6 pb-6 mr-20">
        <p className="font-medium"><span className="font-semibold">4번)</span> 질문: 나무꾼은 @@하였다. (질문 유형: 기본 이해력)</p>
        <p className="mt-1">가천이의 답변: @@ (<span className="text-yellow-500 font-semibold">🤔 오답</span>)</p>
          </div>

          <div className="p-3 bg-gray-100 rounded-lg pt-6 pb-6 mr-20">
        <p className="font-medium"><span className="font-semibold">5번)</span> 질문: 나무꾼은 @@하였다. (질문 유형: 기본 이해력)</p>
        <p className="mt-1">가천이의 답변: ~@~@ (<span className="text-green-600 font-semibold">✅ 정답</span>)</p>
          </div>
        </div>
      </section>

    <Separator className="my-8" />

    {/* 2. 어린이의 재구성 이야기 분석 */}
    <section className="mb-8 pt-5 pl-6 mr-20">
      <h2 className="text-2xl font-extrabold mb-4 pt-4 pl-10">2. 재구성 이야기 분석</h2>
      <p className="text-lg font-bold mb-4 pt-4 pl-16">
        <p> 가천 어린이의 재구성 이야기 결과입니다. 📚 </p>
      </p>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-700 text-white text-m font-bold ml-20 px-5 py-1 rounded-full hover:bg-gray-700 transition"
      >
        {isOpen ? "▼  가천 어린이의 이야기 본기 선택 상세 접기" : "▶  가천 어린이의 이야기 본기 선택 상세 보기"}
      </button>

      {isOpen && (
        <div className="mt-4 bg-gray-200 p-4 ml-20 rounded-lg text-lg space-y-3">
        <div>
        <p className="font-bold text-gray-900 pt-2 pl-5">분기 1) 상황: 나무꾼이 ~하려고 할 때,</p>
        <p className="ml-4 text-gray-800 pl-5 pt-3">가천이의 선택: 금도끼<br/>이유: 반짝이니까 예뻐서</p>
        </div>
        <div>
        <p className="font-bold text-gray-900 pt-5 pl-5">분기 2) 상황: 나무꾼이 ~일 때,</p>
        <p className="ml-4 text-gray-800 pl-5 pt-3">가천이의 선택: 은도끼<br/>이유: 진짜 본인이 잃어버린 도끼니까</p>
        </div>
        <div>
        <p className="font-bold text-gray-900 pt-5 pl-5">분기 3) 상황: 산신령이~</p>
        <p className="ml-4 text-gray-800 pl-5 pt-3">가천이의 선택: 둘 다<br/>이유: 착해서 받을 자격이 있음</p>
        </div>
        </div>
      )}

      <div className="mt-8 text-gray-800 ml-20">
        <p className="text-lg font-bold text-gray-900">가천이의 재구성 이야기:</p>
        <p className="pl-5 pt-3">가천이는 나무꾼이 금도끼를 줬을 때, 반짝이는 모습에 반해 금도끼를 선택했어요. 하지만 나무꾼이 은도끼를 잃어버렸을 때, 진짜 본인이 잃어버린 도끼라는 것을 알고 은도끼를 선택했어요. 마지막으로 산신령이 둘 다 주었을 때, 가천이는 착한 나무꾼이니까 둘 다 받을 자격이 있다고 생각해서 둘 다 받았어요.</p>
      </div>
      <Separator className="my-8 mx-auto w-[90%]" />

      <div className="mt-8 text-gray-800 ml-20">
        <p className="text-lg font-bold text-gray-900">분기 선택 이유 작성에 있어,</p>
        <p className="pl-5 pt-3">'금이 더 좋아서', '더 재밌는 이야기가 될 것 같아서'와 같은 이유를 제시한 것으로 보아</p>
      </div>

      <div className="mt-10 ml-20 pl-10">
        <p className="text-lg font-bold text-gray-900">가천 어린이는</p>
        <p className="pl-5 pt-3 text-2xl font-bold">→ ’흥미위주 탐험형🏕️’으로 보입니다.</p>
      </div>
      <Separator className="my-8 mx-auto w-[90%]" />

      <div className="mt-8 text-gray-800 ml-20">
        <p className="text-lg font-bold text-gray-900">동일 연령대 아이들의 이 외의 독서 유형으로는,</p>
        <p className="text-lg pl-5 pt-3">• 도덕적이고 정석적인 행동을 추구하는, <span className="font-bold">도덕 추구형 (53%)</span></p>
        <p className="text-lg pl-5 pt-3 pb-5">• 타인을 헤아리는 감성이 풍부한, <span className="font-bold">감성/공감 기반 행동 추구형 (27%)</span></p>
        <p>등이 있습니다.</p>
      </div>
    </section>

          <Separator className="my-8" />

          {/* 3. 사용자 토론 태도 분석 */}
          <section className="mb-8 pt-5 pl-6">
            <h2 className="text-2xl font-extrabold mb-4 pt-4 pl-10">3. 토론 태도 분석</h2>
            <p className="text-lg font-bold mb-4 pt-4 pl-16">
              <p> 가천 어린이의 토론 대화 기반의 태도 분석 결과입니다. 💬 </p>
            </p>
          {/* 워드클라우드 이미지 */}
            <div className="bg-gray-200 p-6 rounded-md mb-6 ml-20 mr-20">
                <p className="ml-5 text-lg font-semibold mb-2">🖼 가천이의 토론 내용 워드클라우드</p>
                <img
                src="https://i.ibb.co/wzV9gVm/wordcloud-example.png" // ✅ 실제 이미지 URL로 교체하세요
                alt="Word Cloud"
                className="mx-auto rounded-md border shadow-md"
                style={{ maxHeight: "300px", objectFit: "contain" }}
                />
              </div>

                {/* Top 5 단어 리스트 */}
                <div className="mb-4 ml-20 text-lg pb-10">
                  <h3 className="font-bold mb-2">📝 최빈 단어들 리스트 (Top5)</h3>
                  <ul className="list-disc list-inside text-gray-800 space-y-1 pl-4">
                    <li>연기</li>
                    <li>사람</li>
                    <li>기사</li>
                    <li>생각</li>
                    <li>연예인</li>
                  </ul>
                </div>

                {/* 분석 결과 */}
                <div className="mb-4 ml-20 text-lg pb-10">
                  <p className="font-bold mb-2">📌 분석 결과:</p>
                  <p>연기, 사람, 기사, 생각, 연예인과 같은 단어들을 자주 언급했어요.</p>
                </div>
          </section>

            <div className="p-6 bg-blue-600 text-white rounded-full text-2xl font-bold mx-auto text-center w-[60%] flex items-center justify-center h-16">
              오늘도 열심히 공부한 가천이를 위해 큰 칭찬의 말 부탁드려요🧣 🙌
            </div>

          {/* 공유 섹션 */}
          <div className="text-center mt-8">
            <p className="text-gray-500 text-xl font-bold mb-2 pt-8">레포트 내용 공유하기</p>

            {/* 공유 버튼 */}
            <button
              onClick={() => {
              if (navigator.share) {
                navigator.share({
                title: '가천 어린이 독서 보고서',
                text: '가천이의 독서 성장을 확인해보세요!',
                url: window.location.href,
                }).catch((err) => console.log('공유 실패:', err));
              } else {
                alert("공유 기능이 이 브라우저에서 지원되지 않아요.");
              }
              }}
              className="mx-auto text-gray-700 hover:text-blue-600 transition pb-10 pt-4"
              style={{ paddingBottom: "200px" }}
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
