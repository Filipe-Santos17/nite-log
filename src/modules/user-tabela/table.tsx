import React, {useState, useEffect} from "react"
import "./style/style.css"
import HeaderWithIcon from "../core/components/header/HeaderWithIcon"
import { navigate } from "wouter/use-browser-location"
import TrLine from "./components/trLine"
import Button from "./components/button"
import Modal from "./components/modal"
import { DataTable } from "./@types/types"

import data from "./data-fake.json"

export default function TabelaAvaliador() {

  const [dataTable, setDataTable] = useState<DataTable[] | null>(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  function handleSetModal(){
    setModalIsOpen(prev => !prev)
  }

  useEffect(() => {
    async function getDataTableFromBackend(){
      // const dataFromBack = await fetch("http://", {
      //   method: "GET",
      // })
      // const dataFromBackJson = await dataFromBack.json()
      setTimeout(() => {
        setDataTable(data)
      }, 5000)
    }

    getDataTableFromBackend()
  }, [])
  
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
                {/*A tabela pode descer mas o titulo deve ficar parado */}
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
              { dataTable ? (
                dataTable.map((dado, i) => (
                  <TrLine data={dado} key={i} openModal={setModalIsOpen}/>
                ))
              ) : (
                <p>Carregando...</p>
              )
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