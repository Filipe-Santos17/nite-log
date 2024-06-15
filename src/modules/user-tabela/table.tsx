import React from "react"
import "./style/style.css"
import HeaderWithIcon from "../core/components/header/HeaderWithIcon"
import { navigate } from "wouter/use-browser-location"
import TrLine from "./components/trLine"

import data from "./data-fake.json"

export default function TabelaAvaliador() {
  
  return (
    <>
      <HeaderWithIcon
        onClickLogo={() => navigate(`/home`)}
      />

      <section className="container-table card-container">
        <section className="box-table">
          <p style={{color: "white"}}>Tabela de Acompanhamento</p>
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
          <button>
            Criar nova task
          </button>
        </footer>
      </section>
    </>
  )
}