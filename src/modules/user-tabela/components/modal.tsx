import React from "react"
import Input from "./input"

interface ModalProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function Modal({ open, setOpen }: ModalProps) {

    function handleClickModal(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        if (e.target === e.currentTarget) {
            setOpen(false)
        }
    }

    return (
        <>
            {open && (
                <section className="modal-box" onClick={handleClickModal}>
                    <div className="modal-content modal-table">
                        <article className="title-modal-table">
                            Crie suas informações aqui
                        </article>
                        <div className="box-one">
                            <Input type="text" id="name" title="Nome" />
                            <section>
                                <Input type="date" id="data-time" title="Data" />
                                <Input type="time" id="hour-time" title="Hora" />
                            </section>
                            <section>
                                <div className="input-component">
                                    <label htmlFor="status">Aprovado</label>
                                    <div className="box-aprovacao">
                                        <label htmlFor="aprovado">Sim</label>
                                        <input id="aprovado" name="status" type="radio"/>
                                        <label htmlFor="naoaprovado">Não</label>
                                        <input id="naoaprovado" name="status" type="radio"/>
                                    </div>
                                </div>
                                <div className="input-component">
                                    <label htmlFor="estrelas">Execução</label>
                                    {/* <input id={id} {...props}/> */}
                                </div>
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