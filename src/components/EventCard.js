import React from 'react'
import { attend_event } from '../apis/events'

const EventCard = ({ happening, self }) => {
    return (
        <div className='event-card'>
            <div className="d-flex justify-content-betweeen flex-column">
                <div className='d-flex justify-content-between w-100'>
                    <div className='event-name'>
                        <div className='event-title'>
                            {happening.event_name}
                        </div>
                        <div className='event-organizer'>
                            By {happening.creator}
                        </div>
                    </div>
                    <div>
                        <div className='d-flex flex-column align-items-center'>
                            <div className='event-date'>
                                {happening.event_day}
                            </div>
                            <div className='event-month'>
                                {happening.event_month}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-4 d-flex'>
                    <div className='max-width-max-content'>
                        <div className='label'>
                            when
                        </div>
                        <div className='description'>
                            {happening.event_date}
                        </div>
                    </div>
                    <div className='px-4 flex-1'>
                        <div className='label'>
                            where
                        </div>
                        <div className='description location'>
                            {happening.location}
                        </div>
                    </div>
                </div>
                <div className='mt-4 d-flex justify-content-between w-100'>
                    <div className=''>
                        <div className='label'>
                            who
                        </div>
                        <div className='description'>
                            {happening.event_date}
                        </div>
                    </div>
                    {
                        self ? (
                            <p className='custom-button'>
                                ATTENDING
                            </p>
                        ) : (
                            <div className=''>
                                <button className='accent-button' onClick={() => attend_event(happening.id)}>attend</button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default EventCard

