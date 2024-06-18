import React from "react"
import Input from "./input"

interface ModalProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function Modal({open, setOpen}: ModalProps){

    function handleClickModal(e: React.MouseEvent<HTMLElement, MouseEvent>){
        if(e.target === e.currentTarget){
            setOpen(false)
        }
    }

    return (
        <>
            {open && (
                <section className="modal-box" onClick={handleClickModal}>
                    <div className="modal-content modal-table">
                        <div className="box-one">
                            <Input type="text" id="name" title="Nome"/>
                            <section>
                                <Input type="text" id="name" title="Data"/>
                                <Input type="text" id="name" title="Hora"/>
                            </section>
                            <section>
                                <Input type="text" id="name" title="Aprovado"/>
                                <Input type="text" id="name" title="Execução"/>
                            </section>
                            <textarea name="" id=""></textarea>
                        </div>
                        <div>
                            <textarea name="" id=""></textarea>
                            <textarea name="" id=""></textarea>
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}