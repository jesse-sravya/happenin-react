import React, {useState} from 'react'
import Header from './Header'
import DatePicker from "react-datepicker";
import { create_event } from '../apis/events'

import "react-datepicker/dist/react-datepicker.css";

const CreateEvent = ({ user, setPage, logout }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [eventName, setEventName] = useState("")
    const [eventLocation, setEventLocation] = useState("")
    const [eventVisibility, setEventVisibility] = useState(false)

    const handleChange = (setter, event) => {
        setter(event.target.value)
    }

    const onSubmit = () => {
        const event_details = {
            "event_name": eventName,
            "location": eventLocation,
            "start_date": startDate.toISOString(),
            "end_date": endDate.toISOString(),
            "visibility": eventVisibility
        }

        create_event(event_details, () => setPage('public-events'))
    }

    return (
        <>
            <Header user={user} setPage={setPage} logout={logout} />
            <div className='container h-100'>
                <div className='row h-100'>
                    <div className='col-12 col-md-10 offset-md-1 center-content'>
                        <div className='frosted-container px-3 py-4 w-100'>
                            <h2 className='text-center my-4'>Sup'?</h2>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="formGroupName">Name</label>
                                    <input type="text" className="form-control" id="formGroupName" placeholder="What's happenin?" onChange={(event) => handleChange(setEventName, event)} value={eventName} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="formGroupLocation">WHERE</label>
                                    <input type="text" className="form-control" id="formGroupLocation" placeholder="Where's it happenin?" onChange={(event) => handleChange(setEventLocation, event)} value={eventLocation} />
                                </div>
                                <div className="form-group">
                                    <label >WHEN IS IT STARTING</label>
                                    <div>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={setStartDate}
                                            showTimeSelect
                                            dateFormat="Pp"
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label >WHEN IS IT ENDING</label>
                                    <div>
                                        <DatePicker
                                            selected={endDate}
                                            onChange={setEndDate}
                                            showTimeSelect
                                            dateFormat="Pp"
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="gridCheck" onChange={(event) => setEventVisibility(event.target.checked)} value={eventVisibility} />
                                        <label className="form-check-label" htmlFor="gridCheck">
                                            Public event
                                        </label>
                                    </div>
                                </div>
                            </form>
                            <div className="center-content">
                                <button className='accent-button form' onClick={onSubmit}>CREATE EVENT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateEvent
