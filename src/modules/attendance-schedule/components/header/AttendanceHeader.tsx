import React, {MouseEventHandler} from "react";

import "./AttendanceHeader.css";

const defaultUserIcon = require("../../assets/icons/default-user.png");

type AttendanceHeaderProps = {
    onClick?: MouseEventHandler
}

const AttendanceHeader = ({onClick}: AttendanceHeaderProps) => {
    return (
        <header>
            <span className="page-title">NiteLog</span>
            <img
                src={defaultUserIcon}
                alt="User Icon"
                className="user-icon"
                onClick={onClick}
            />
        </header>
    );
};

export default AttendanceHeader;