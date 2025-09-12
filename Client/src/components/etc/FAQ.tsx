import { useState } from 'react'
import Block from '../ui/Block'
import useThemeStore from '../../stores/others/ThemeStore'

// velog 주소 데이터
const urlData = [
  {
    url: 'https://velog.io/@aistjq1691/LOSTARK-OPEN-API-KEY-%EB%B0%9C%EA%B8%89-%EB%B0%A9%EB%B2%95',
    title: 'LOSTARK API-Key 생성 방법',
  },

  {
    url: 'https://velog.io/@aistjq1691/LOAPLAN-%EC%82%AC%EC%9A%A9-%EA%B0%80%EC%9D%B4%EB%93%9C-gut24twi',
    title: 'LOAPLAN 사용 가이드',
  },
]

// FAQ 데이터
const FAQData = [
  {
    question: 'API 발급은 어떻게 하나요?',
    answer: (
      <a
        href={urlData[0].url}
        target='_blank'
        className='text-blue-600 hover:underline dark:text-blue-400'
      >
        LOSTARK API 사이트에서 발급받을 수 있습니다.
      </a>
    ),
  },
  {
    question: '어떻게 사용하는지 모르겠어요.',
    answer: (
      <a
        href={urlData[1].url}
        target='_blank'
        className='text-blue-600 hover:underline dark:text-blue-400'
      >
        사용 가이드를 참고해주세요.
      </a>
    ),
  },
  {
    question: '다른 기기에 접속시 저장한 내용이 없어집니다.',
    answer: `현재 저장 방식은 "브라우저" 기준이기에  다른 
    디바이스에 접속 시 기존 정보가 보이지 않습니다.
    빠른 시일 내 개선하겠습니다.`,
  },
  {
    question: '사용 중 불편하거나 개선했으면 하는 점이 있어요.',
    answer: (
      <>
        서비스 운영은 처음이라 미숙한 부분이 많습니다 ㅠㅠ [
        <a
          href='mailto:loaplan1234@gmail.com'
          className='text-blue-600 hover:underline dark:text-blue-400'
        >
          loaplan1234@gmail.com
        </a>
        ]으로 의견을 보내주시면 감사하겠습니다.
      </>
    ),
  },
]

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const darkmode = useThemeStore((state) => state.darkMode)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div>
      <Block title='FAQ' auth={true} width={390}>
        <div className='w-full'>
          {FAQData.map((item, index) => (
            <div key={index} className='flex flex-col gap-4'>
              <button
                onClick={() => toggleFAQ(index)}
                className={`flex w-full items-center justify-between rounded-md p-4 text-left text-white shadow-md transition-colors ${darkmode ? 'bg-black shadow-gray-700' : 'bg-green text-black'}`}
              >
                <h4>{index + 1 + '. ' + item.question}</h4>
              </button>

              <div
                className={`overflow-hidden px-2 transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-screen pb-4' : 'max-h-0'
                }`}
              >
                <h4 className='whitespace-pre-line text-black'>{item.answer}</h4>
              </div>
            </div>
          ))}
        </div>
      </Block>
    </div>
  )
}

export default FAQ
