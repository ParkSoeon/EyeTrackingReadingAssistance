import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BookSelect.css';

function BookSelect() {
  const navigate = useNavigate();
  const books = [
    { src: '/logo/cat.jpg', alt: '호랑이와 곶감' },
    { src: '/logo/gold.jpg', alt: '금도끼 은도끼' },
    { src: '/logo/sun.jpg', alt: '해님달님' },
  ];

  return (
    <div className="page-background">
      <div className="book-container">
        <div className="book-title">동화를 골라보세요!</div>
        <div className="book-grid">
          {books.map((book, idx) => (
            <div
              key={idx}
              className="book-item"
              onClick={() => {
                if (book.alt === '금도끼 은도끼') navigate('/select-mode');
              }}
              style={book.alt === '금도끼 은도끼' ? { cursor: 'pointer' } : {}}
            >
              <img src={book.src} alt={book.alt} className="book-image" />
              <div className="book-label">{book.alt}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookSelect;