import React, { useState } from "react"
import Input from "./input"
import Button from "./button"

interface ModalProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function Modal({ open, setOpen }: ModalProps) {

    const [dataModal, setDataModal] = useState({
        name: "",
        date: "",
        task: "",
        status: null,
        raitingStars: 0,
        obs: "",
        evidence: ""
    })

    function handleClickModal(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        if (e.target === e.currentTarget) {
            closeModal()
        }
    }

    function closeModal() {
        setOpen(false)
    }

    async function saveDataModal() {

    }

    return (
        <>
            {open && (
                <section className="modal-box" onClick={handleClickModal}>
                    <div className="modal-content modal-table">
                        <article className="title-modal-table">
                            Crie suas informações aqui
                        </article>
                        <form className="form-modal-table">
                            <div className="box-one">
                                <Input type="text" id="name" title="Nome" />
                                <section>
                                    <Input type="date" id="data-time" title="Data" />
                                    <Input type="time" id="hour-time" title="Hora" />
                                </section>
                                <section>
                                    <div className="input-component">
                                        <label htmlFor="aprovado">Aprovado</label>
                                        <div className="box-aprovacao">
                                            <div className="subbox-aprovacao">
                                                <label htmlFor="aprovado">Sim</label>
                                                <input id="aprovado" name="status" type="radio" />
                                            </div>
                                            <div className="subbox-aprovacao">
                                                <label htmlFor="naoaprovado">Não</label>
                                                <input id="naoaprovado" name="status" type="radio" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-component">
                                        <label htmlFor="estrelas">Execução</label>
                                        {/* <input id={id} {...props}/> */}
                                    </div>
                                </section>
                                <div className="textarea-component">
                                    <label htmlFor="execution">Execução</label>
                                    <textarea name="execution" id="execution" />
                                </div>
                            </div>
                            <div className="box-two">
                                <div className="textarea-component">
                                    <label htmlFor="observation">Observação</label>
                                    <textarea name="observation" id="observation"></textarea>
                                </div>
                                <div className="textarea-component">
                                    <label htmlFor="evidence">Evidência</label>
                                    <textarea name="evidence" id="evidence"></textarea>
                                </div>
                            </div>
                        </form>
                        <footer>
                            <Button text="Fechar" othersClasses="btn-secondary" onClick={closeModal} />
                            <Button text="Salvar" onClick={saveDataModal} />
                        </footer>
                    </div>
                </section>
            )}
        </>
    )
}