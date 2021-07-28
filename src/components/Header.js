import React from 'react'


const Header = ({ user, setPage, logout }) => {
    return (
        <header>
            <div className='d-flex justify-content-between align-items-center'>
                <button className='custom-button' onClick={() => setPage('public-events')}>
                    What's up?
                </button>
                <div>
                    <img src='/logo.png' alt='' height='60' />
                </div>
                {
                    user ? (
                        <button className='custom-button' onClick={logout}>
                            LOGOUT
                        </button>
                    ) : (
                        <button className='custom-button' onClick={() => setPage('login')}>
                            LOGIN
                        </button>
                    )
                }
            </div>
        </header>
    )
}

export default Header
