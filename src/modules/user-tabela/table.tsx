import React, {useState} from "react"
import "./style/style.css"
import HeaderWithIcon from "../core/components/header/HeaderWithIcon"
import { navigate } from "wouter/use-browser-location"
import TrLine from "./components/trLine"
import Button from "./components/button"
import Modal from "./components/modal"

import data from "./data-fake.json"

export default function TabelaAvaliador() {

  const [modalIsOpen, setModalIsOpen] = useState(false)

  function handleSetModal(){
    setModalIsOpen(prev => !prev)
  }
  
  return (
    <>
      <HeaderWithIcon
        onClickLogo={() => navigate(`/home`)}
      />

      <section className="container-table card-container">
        <section className="box-table">
          <h2 className="titulo-page">Tabela de Acompanhamento</h2>
          <table className="tabela-main">
            <thead className="header-table">
              <tr>
                <th>nome</th>
                <th>data</th>
                <th>atividade</th>
                <th>hora</th>
                <th>aprovado</th>
                <th>execução</th>
                <th>observação</th>
                <th></th> 
              </tr>
            </thead>
            <tbody className="body-table">
              {
                data.map((dado, i) => (
                  <TrLine data={dado} key={i} />
                ))
              }
            </tbody>
          </table>
        </section>
        <footer>
          <Button text="Criar nova task" onClick={handleSetModal}/>
        </footer>
        <Modal open={modalIsOpen} setOpen={setModalIsOpen}/>
      </section>
    </>
  )
}