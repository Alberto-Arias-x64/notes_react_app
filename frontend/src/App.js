import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, Navigate } from 'react-router-dom'
import { io } from 'socket.io-client'

import Login from './pages/Login'
import Profile from './pages/Profile'
import Principal_notes from './pages/Principal'

import { init_login } from './actions/user'
import { url_dir } from './URL'

export const socket = io(url_dir)

function App() {
  const state = useSelector(state => state)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(init_login())
  }, [])

  return (
    <main>
      <img src={`${url_dir}/tiny/backstage.png`} alt="background" />
      <Routes>
        <Route path='/login' element={<Login />} />
        {state.user.code === 'LOGGED' ?
          <>
            <Route path='/' element={<Principal_notes />} />
            <Route path='/profile/:id' element={<Profile />} />
            <Route path='*' element={<p>NOT FOUND</p>} />
          </>
          : null}
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </main>
  )
}

export default App;