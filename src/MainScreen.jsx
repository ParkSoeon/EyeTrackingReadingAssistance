import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainScreen.css';

const treeSrc = '/logo/tree.png';

function LeftTrees() {
  return (
    <div className="flex items-end pl-16">
      <img src={treeSrc} alt="tree" className="w-[120px] h-[120px] z-10" />
      <img src={treeSrc} alt="tree" className="w-[160px] h-[160px] -ml-20 z-20" />
      <img src={treeSrc} alt="tree" className="w-[120px] h-[120px] -ml-20 z-10" />
    </div>
  );
}

function RightTrees() {
  return (
    <div className="flex items-end pr-16">
      <img src={treeSrc} alt="tree" className="w-[120px] h-[120px] z-10" />
      <img src={treeSrc} alt="tree" className="w-[160px] h-[160px] -mr-20 z-20" />
      <img src={treeSrc} alt="tree" className="w-[120px] h-[120px] -mr-20 z-10" />
    </div>
  );
}

function MainScreen() {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen bg-[#B3E0FF] flex flex-col justify-center items-center text-center font-pretendard overflow-hidden relative">
      {/* 중앙 컨텐츠 */}
      <div className="z-20 flex flex-col items-center justify-center w-full max-w-[700px] mx-auto mb-32">
        <div className="font-jua text-white text-[2.2rem] font-extrabold mb-2 drop-shadow-md tracking-tight" style={{color: '#fff'}}>아동용 독서지원 플랫폼</div>
        <div className="font-jua text-white font-extrabold mb-8 drop-shadow-lg tracking-widest leading-none" style={{ color: '#fff', fontSize: '8vw', lineHeight: 1, letterSpacing: '0.04em', textShadow: '0 4px 16px rgba(0,0,0,0.10)' }}>ITDA</div>
        <button
          className="font-jua text-[#7EC6F7] font-extrabold text-[2rem] flex items-center justify-center mx-auto"
          style={{
            width: '340px',
            height: '64px',
            borderRadius: '40px',
            background: 'white',
            letterSpacing: '0.02em',
            boxShadow: '0 2px 12px 0 rgba(126,198,247,0.10)',
            whiteSpace: 'nowrap',
            outline: 'none',
            border: 'none',
          }}
          onClick={() => navigate('/books')}
          tabIndex={0}
          onFocus={e => e.target.style.boxShadow = '0 2px 12px 0 rgba(126,198,247,0.10)'}
          onBlur={e => e.target.style.boxShadow = '0 2px 12px 0 rgba(126,198,247,0.10)'}
        >
          시작하기
        </button>
      </div>
      {/* 하단 양쪽 끝 나무 그룹 */}
      <div className="fixed bottom-0 left-0 w-full flex flex-row justify-between items-end z-10 pointer-events-none">
        <LeftTrees />
        <RightTrees />
      </div>
    </div>
  );
}

export default MainScreen; 