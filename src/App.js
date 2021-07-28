import {useEffect, useState} from 'react'
import Login from './components/Login'
import Home from './components/Home'
import CreateEvent from './components/CreateEvent'

import './App.css';

function App() {
  const [page, setPage] = useState('login')
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setPage('public-events')
    }
  }, [])

  const logout = () => {
    setPage('login')
    setUser(null)
    localStorage.clear()
    window.location.reload();
  }

  switch (page) {
    case 'public-events': return <Home user={localStorage.getItem('accessToken')} setPage={setPage} logout={logout} />
    case 'create-event': return <CreateEvent setPage={setPage} user={user} logout={logout} />
    default: return <Login setPage={setPage} user={user} callback={(user) => {
      setUser(user)
      setPage('public-events')
    }} />
  }
}

export default App;
