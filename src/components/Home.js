import React, { useEffect, useState } from 'react'
import Header from './Header'
import EventCard from './EventCard'

import { get_public_events, get_private_events } from '../apis/events'


const Home = ({ user, setPage, logout }) => {
    const [publicEvents, setPublicEvents] = useState([])
    const [privateEvents, setPrivateEvents] = useState([])

    useEffect(() => {
        const formatEvents = (events) => {
            const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]

            return events.map(item => {
                let event_date = new Date(item.start_date)
                return {
                    ...item,
                    event_date: event_date.toDateString(),
                    event_day: event_date.getDate(),
                    event_month: months[event_date.getMonth()],
                }            
            })
        }

        if (user) {
            get_private_events(logout).then(data => setPrivateEvents(formatEvents(data)))
        }
        get_public_events().then(data => setPublicEvents(formatEvents(data)))
    }, [])


    return (
        <>
            <Header user={user} setPage={setPage} logout={logout} />
            <div className='container h-100'>
                <div className='row h-100'>
                    <div className='col-12 col-lg-10 offset-lg-1 center-content'>
                        <div className='frosted-container px-3 py-4 w-100 my-4'>
                            {
                                user ? (
                                    <>
                                        <h2 className='text-center my-4'>Private happenings</h2>
                                        {
                                            privateEvents.length ? (
                                                <div className='row'>
                                                    {
                                                        privateEvents.map((happening, index) => (
                                                            <div key={`public_event_${index}`} className='col-12 col-md-6 col-lg-4 my-2'>
                                                                <EventCard happening={happening} self />
                                                            </div>
                                                        ))
                                                    }
                                                    <div className='col-12 col-md-6 col-lg-4 my-2'>
                                                        <button className='add-event' onClick={() => setPage('create-event')}>+</button>
                                                    </div>
                                                </div>
                                            ) : <button className='add-event' onClick={() => setPage('create-event')}>+</button>
                                        }
                                    </>
                                ) : (
                                    <>
                                        <h2 className='text-center mt-5 mb-4'>Private happenings</h2>
                                        <p className='text-center mb-5'>Login to see private events</p>
                                    </>
                                )
                            }
                            <h2 className='text-center my-4'>Public happenings</h2>
                            <div className='row'>
                            {
                                publicEvents && publicEvents.length ? publicEvents.map((happening, index) => (
                                    <div key={`public_event_${index}`} className='col-12 col-md-6 col-lg-4 my-2'>
                                        <EventCard happening={happening} />
                                    </div>
                                )) : <p className='text-center mb-5'>No events yet</p>
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
