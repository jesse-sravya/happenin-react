import React from 'react'
import GoogleLogin from 'react-google-login'
import { handle_login } from '../apis/events'

const Login = ({ setPage, callback }) => {
    return (
        <div className='container h-100'>
           <div className='row h-100'>
                <div className='col-12 col-lg-8 offset-lg-2 center-content'>
                    <div className='frosted-container overflow-hidden grid'>
                        <div className='row h-100 center-content'>
                            <div className='col-12 col-lg-6 center-content text-center h-50 white-back'>
                                <div className='px-4 my-4'>
                                    <img src='/logo.png' alt='' height='60' />
                                    <hr />
                                    <p className='text-center color-accent'>
                                        Host events and share with people
                                        Discover events that you can join<br/>
                                        Events are synced to google<br/>
                                    </p>
                                </div>
                            </div>
                            <div className='col-12 col-lg-6 center-content login-options h-50'>
                                <div className='px-3 my-4'>
                                    <GoogleLogin
                                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                        buttonText='LOGIN WITH GOOGLE'
                                        onSuccess={(response) => handle_login(callback, response)}
                                        onFailure={(response) => console.log('failed to login', response)}
                                        cookiePolicy='single_host_origin'
                                        scope="https://www.googleapis.com/auth/calendar"
                                    />
                                    <button className='mt-4 custom-button' onClick={() => setPage('public-events')}>
                                        Check Latest Events<br/>
                                        <span className='font-300'>(Doesn’t require sign-in)</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
