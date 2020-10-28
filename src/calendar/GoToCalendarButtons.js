import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCalendarWeek, faCalendarDay } from "@fortawesome/free-solid-svg-icons";

export default function GoToCalendarButtons() {



    return (
        <div className="calendar-buttons container ">
            <div className="row justify-content-md-center ">
                <div className="col text-center">
                    <NavLink to="/calendarday" className="link-btn btn-lg btn-block my-2" activeClassName="link-btn-active">                   
                        <FontAwesomeIcon className="facalendar text-white mr-2" icon={faCalendarDay} />
                            Day       
                    </NavLink>
                </div>
                <div className="col text-center">
                    <NavLink to="/calendarweek" className="link-btn btn-lg btn-block my-2" activeClassName="link-btn-active">                    
                        <FontAwesomeIcon className="facalendar text-white mr-2" icon={faCalendarWeek} />
                            Week
                    </NavLink>
                </div>
                <div className="col text-center" >
                    <NavLink to="/home" className="link-btn btn-lg btn-block my-2" activeClassName="link-btn-active">                     
                        <FontAwesomeIcon className="facalendar text-white mr-2" icon={faCalendar} />
                            Month                  
                    </NavLink>
                </div>
            </div>
        </div>
    );





}