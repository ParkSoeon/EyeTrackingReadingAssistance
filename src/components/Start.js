import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Start.css';

function Start() {
  const navigate = useNavigate();

  const handleStartClick = () => {
    console.log('Start button clicked!');
    navigate('/login');
  };

  return (
    <div className="start-container">
      <div className="start-box">
        <h1>헝겅이</h1>
        <p>나만의 독서 기록장</p>
        <button onClick={handleStartClick} className="start-button">
          시작하기
        </button>
      </div>
    </div>
  );
}

export default Start; 