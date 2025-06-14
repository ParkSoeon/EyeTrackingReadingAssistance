import React from 'react';
import './SelectMode.css';

const modes = [
  {
    img: '/logo/book.png',
    label: '책읽기',
    className: 'mode-card mode-read',
    btnClass: 'mode-btn mode-btn-read',
  },
  {
    img: '/logo/file.png',
    label: '분석',
    className: 'mode-card mode-analyze',
    btnClass: 'mode-btn mode-btn-analyze',
  },
  {
    img: '/logo/robot.png',
    label: '토론',
    className: 'mode-card mode-discuss',
    btnClass: 'mode-btn mode-btn-discuss',
  },
];

function SelectMode() {
  return (
    <div className="selectmode-bg">
      <div className="selectmode-container">
        {modes.map((mode, idx) => (
          <div className={mode.className} key={idx}>
            <img src={mode.img} alt={mode.label} className="mode-img" />
            <button className={mode.btnClass}>{mode.label}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectMode; 