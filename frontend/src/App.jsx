import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from "../src/features/auth/pages/Register"
import Login from "../src/features/auth/pages/Login"
import Protected from "../src/features/auth/components/Protected"
import Home from "../src/features/interview/pages/Home"
import InterviewReport from "../src/features/interview/pages/InterviewReport"

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Protected> <Home/> </Protected>} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path="/interview/:interviewId" element={<Protected> <InterviewReport/> </Protected>} />
    </Routes>
  )
}

export default App