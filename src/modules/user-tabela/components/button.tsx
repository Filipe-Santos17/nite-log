import React from "react";

interface BtnComponent extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>  {
    text: string,
    othersClasses?: string
}

export default function Button({text, othersClasses = "", ...props}: BtnComponent){
    return (
        <button className={`filled-btn ${othersClasses}`} {...props}>{text}</button>
    )
}