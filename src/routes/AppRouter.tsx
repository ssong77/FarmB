// src/AppRouter.tsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SignupPage from '../pages/SignupPage'
import LoginPage from '../pages/Login'
import Home from '../pages/Home'



export default function AppRouter() {
  return (
    <Routes>
      {/* 공개 경로 */}
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* 보호된 경로 */}

      
    </Routes>
  )
}
