import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log('Login component mounted!');
  }, []);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    displayName: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 로그인 로직 구현
    console.log('Login attempt:', formData);
    // 로그인 성공 시 모드 선택 화면으로 이동
    navigate('/select-mode');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>로그인</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">아이디</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="아이디를 입력하세요"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="displayName">사용자 이름</label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              placeholder="사용자 이름을 입력하세요"
              required
            />
          </div>

          <button type="submit" className="login-button">
            시작하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login; 