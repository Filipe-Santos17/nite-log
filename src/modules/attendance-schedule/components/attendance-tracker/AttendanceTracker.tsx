import React from "react";

import "./AttendanceTracker.css";
import Card from "../card/Card";
import FilledButton from "../../../core/components/filled-btn/FilledButton";

const greenCheck = require("../../assets/icons/green-check.png");

const AttendanceTracker = () => {
    // TODO: clock out from attendance list

    return (
        <Card>
            <span className="entry-okay">Entrada registrada.</span>
            <img src={greenCheck} alt="Green check" className="green-check" />
            <FilledButton title="Encerrar"/>
        </Card>
    );
};

export default AttendanceTracker;