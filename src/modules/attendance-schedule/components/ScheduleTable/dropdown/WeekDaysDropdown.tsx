import React, {useState} from "react";

import "./DropdownStyles.css";
import {DayOfWeek, getDayOfWeek} from "../../../../core/types/DayOfWeek";

type WeekDaysDropdownProps = {
    selectedDayOfWeek: DayOfWeek,
    onChange: (dayOfWeek: DayOfWeek) => void
}

const WeekDaysDropdown = ({selectedDayOfWeek, onChange}: WeekDaysDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleDayOfWeekChange = (dayOfWeek: DayOfWeek) => {
        toggleDropdown();
        onChange(dayOfWeek);
    }

    return (
        <div className="dropdown-container">
            <div className="dropdown-header" onClick={toggleDropdown}>
                {getDayOfWeek(selectedDayOfWeek) || getDayOfWeek(DayOfWeek.SEGUNDA)}
            </div>
            {isOpen && (
                <div className="dropdown-list-container">
                    <ul className="dropdown-list">
                        {Object.values(DayOfWeek).map((dayOfWeek, index) => {
                            return <li
                                className="dropdown-item"
                                onClick={handleDayOfWeekChange.bind(null, dayOfWeek as DayOfWeek)}
                                key={index}
                            >{getDayOfWeek(dayOfWeek as DayOfWeek)}</li>
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default WeekDaysDropdown;