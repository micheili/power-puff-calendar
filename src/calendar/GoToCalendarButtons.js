import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCalendarWeek, faCalendarDay } from "@fortawesome/free-solid-svg-icons";

export default function GoToCalendarButtons() {


    return (
        <div className="calendar-buttons container">
            <div className="row justify-content-md-center ">
                <div className="col text-center">
                    <Link to="/calendarday">
                        <a className="btn btn-lg btn-block my-2" >
                        <FontAwesomeIcon className="facalendar text-white mr-2" icon={faCalendarDay} />
                            Day
                            </a>
                    </Link>
                </div>
                <div className="col text-center">
                    <Link to="/calendarweek">
                        <a className="btn btn-lg btn-block my-2" >
                        <FontAwesomeIcon className="facalendar text-white mr-2" icon={faCalendarWeek} />
                            Week</a>
                    </Link>
                </div>
                <div className="col text-center">
                    <Link to="/calendar">
                        <a className="btn btn-lg btn-block my-2" >
                        <FontAwesomeIcon className="facalendar text-white mr-2" icon={faCalendar} />
                            Month 
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );





}