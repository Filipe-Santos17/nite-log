import React, {MouseEventHandler} from 'react';
import './FilledButton.css';

type FilledButtonProps = {
    onClick?: MouseEventHandler;
    type?: 'button' | 'submit' | 'reset';
    title: string;
};

const FilledButton = ({onClick, type = "button",title}: FilledButtonProps) => {
    return (
        <button onClick={onClick} type={type} className={`filled-btn`}>
            {title}
        </button>
    );
};

export default FilledButton;