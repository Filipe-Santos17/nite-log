import React from "react";

import "./AttendanceAndSchedules.css";

import {UserContextType} from "../../core/types/User";
import {UserContext} from "../../core/context/userContext";
import AttendanceHeader from "./header/AttendanceHeader";
import AttendanceTracker from "./AttandanceTracker/AttendanceTracker";
import ScheduleTable from "./ScheduleTable/ScheduleTable";

const AttendanceAndSchedules = () => {
    const {
        globalUser
    } = React.useContext(UserContext) as UserContextType

    return (
        <section className="attendance-schedules">
            <AttendanceHeader />

            <AttendanceTracker />

            <ScheduleTable />
        </section>
    );
};

export default AttendanceAndSchedules;