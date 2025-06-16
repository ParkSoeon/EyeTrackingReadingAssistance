import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectMode.css';

const modes = [
  {
    img: '/logo/book.png',
    label: '책읽기',
    className: 'mode-card mode-read',
    btnClass: 'mode-btn mode-btn-read',
    path: '/book'
  },
  {
    img: '/logo/file.png',
    label: '분석',
    className: 'mode-card mode-analyze',
    btnClass: 'mode-btn mode-btn-analyze',
    path: '/report'
  },
  {
    img: '/logo/robot.png',
    label: '토론',
    className: 'mode-card mode-discuss',
    btnClass: 'mode-btn mode-btn-discuss',
    path: '/discussion-chat'
  },
];

function SelectMode() {
  const navigate = useNavigate();

  return (
    <div className="selectmode-bg">
      <div className="selectmode-container">
        {modes.map((mode, idx) => (
          <div className={mode.className} key={idx}>
            <img src={mode.img} alt={mode.label} className="mode-img" />
            <button 
              className={mode.btnClass}
              onClick={() => {
                if (mode.label === '토론') {
                  window.location.href = 'http://localhost:5174/chat';
                } else if (mode.label === '분석') {
                  window.location.href = 'http://localhost:5174/report';
                } else if (mode.label === '책읽기') {
                  window.location.href = 'http://localhost:5173/book-game/';
                } else {
                  navigate(mode.path);
                }
              }}
            >
              {mode.label}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectMode; 