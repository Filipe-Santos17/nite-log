import React from "react";

interface TextAreaComponent extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>  {
    title: string,
    id: string,
}

export default function Input({title, id, ...props}: TextAreaComponent){
    return(
        <div className="input-component">
            <label htmlFor={id}>{title}</label>
            <textarea id={id} {...props}/>
        </div>
    )
}