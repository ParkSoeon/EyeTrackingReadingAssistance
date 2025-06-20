import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    username: '',
    password: '',
    age: '',
    gender: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // --- 하드코딩된 테스트 계정 처리 시작 ---
    if (form.username === 'testuser' && form.password === 'test1234') {
      console.log('Test user signup simulated. Navigating to login.');
      navigate('/login');
      return; // API 호출을 건너뛰고 함수 종료
    }
    // --- 하드코딩된 테스트 계정 처리 끝 ---

    try {
      const response = await fetch('http://localhost:8000/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
          name: form.name
        })
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.detail || data.message || '회원가입에 실패했습니다.');
        return;
      }
      navigate('/login');
    } catch {
      setError('서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        <h1 className="login-title">회원가입</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="signup-form-2row">
          <div className="signup-row">
            <div className="form-group">
              <label htmlFor="name">이름</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="이름을 입력하세요"
                required
              />
            </div>
            <div className="form-group">
              <label>나이</label>
              <select name="age" value={form.age} onChange={handleChange} required>
                <option value="">나이를 선택하세요</option>
                <option value="3-4">3~4세</option>
                <option value="5-6">5~5세</option>
                <option value="7-8">7~8세</option>
              </select>
            </div>
          </div>
          <div className="signup-row">
            <div className="form-group">
              <label htmlFor="username">아이디</label>
              <input
                type="text"
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="아이디를 입력하세요"
                required
              />
            </div>
            <div className="form-group">
              <label>성별</label>
              <div className="gender-toggle-group">
                <button
                  type="button"
                  className={`gender-toggle-btn${form.gender === '남자' ? ' selected' : ''}`}
                  onClick={() => setForm(prev => ({ ...prev, gender: '남자' }))}
                >
                  남자
                </button>
                <button
                  type="button"
                  className={`gender-toggle-btn${form.gender === '여자' ? ' selected' : ''}`}
                  onClick={() => setForm(prev => ({ ...prev, gender: '여자' }))}
                >
                  여자
                </button>
              </div>
            </div>
          </div>
          <div className="signup-row">
            <div className="form-group" style={{ width: '350px' }}>
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>
            <button type="submit" className="login-button" style={{ marginTop: '24px', width: '350px' }}>
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup; 