// src/main.tsx 또는 src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import HomePage from './app/pages'
import './app/globals.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>
)