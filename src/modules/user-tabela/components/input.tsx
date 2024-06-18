import React from "react";

interface InputComponent extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>  {
    title: string,
    id: string,
}

export default function Input({title, id, ...props}: InputComponent){
    return(
        <div className="input-component">
            <label htmlFor={id}>{title}</label>
            <input id={id} {...props}/>
        </div>
    )
}