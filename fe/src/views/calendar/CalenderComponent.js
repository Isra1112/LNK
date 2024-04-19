import React from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getData,addData } from '../../api/calender.js';
import { logout } from '../../api/login.js';
import './calender.css';
import event from '../event.js';


const localizer = momentLocalizer(moment)

class CalendarViews extends React.Component {
    state = {
        showModalForm: false,
        events: [],
        formData: {
            email: '',
            date: new Date(),
            description: '',
        },
    };

    componentDidMount() {
        this.getDataApi()
    }

    getDataApi = () => {
        getData().then((res) => {

            let data = res.data.data.map((item) => {                
                return {
                    title: item.title,
                    start: new Date(item.start),
                    end: new Date(item.end),
                    desc: item.desc
                };
            });
            this.setState({ events: data });
        }).catch((err) => {
            console.log('err', err);
        });
    }

    logoutHandle = () => {
        console.log('logoutHandle');
        logout().then((res) => {
            console.log('res', res);
            res.data && localStorage.removeItem('token');
            window.location.href = "/#/login";
        }
        ).catch((err) => {
            console.log('err', err);
        });
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            formData: {
                ...prevState.formData,
                [name]: value,
            },
        }));
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('Form data:', this.state.formData);
        addData(this.state.formData).then((res) => {
            console.log('res', res);
            this.setState({showModal: false})
            // refresh the data
            this.getDataApi()
        }).catch((err) => {
            console.log('err', err);
        });
    };

    render() {
        const { events, showModal, formData } = this.state;
        return <div>
            <h1>Big Calendar</h1>
            <div style={{marginBottom:"1rem"}}>
            <button onClick={() => this.setState({ showModal: true })}>Create</button>
            <button onClick={this.logoutHandle}>logout</button>

            </div>

            { !showModal &&(<Calendar
                localizer={localizer}
                step={60}
                events={this.state.events}
                // events={event}
                // startAccessor="start"
                // endAccessor="end"
                style={{ height: 500 }}
                // onShowMore={(events, date) => this.setState({ showModal: true, events })}
            />)}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <div className='modal-header'>
                        <h3>Add Event</h3>
                        <span className="close" onClick={() => this.setState({ showModal: false })}>
                            &times;
                        </span>

                        </div>
                        <form onSubmit={this.handleFormSubmit}>
                            <label>
                                Email:
                                <input type="text" name="email" value={formData.email} onChange={this.handleInputChange} />
                            </label>
                            <br />
                            <label>
                                Date:
                                <input type="date" name="date" value={formData.date} onChange={this.handleInputChange} />
                            </label>
                            <br />
                            <label>
                                Description:
                                <textarea name="description" value={formData.description} onChange={this.handleInputChange} />
                            </label>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>;
    }
}

export default CalendarViews;