import React, { useState, useEffect } from "react";
import axios from "axios";

import ProfessorTableRow from "./ProfessorTableRow";

const ListProfessor = () => {
  const [professors, setProfessors] = useState([]);

  useEffect(
    () => {
      axios.get('http://localhost:3001/professors')
        .then(
          (res) => {
            setProfessors(res.data);
          }
        )
        .catch((error) => console.log(error))
    }, []
  )

  function deleteProfessorById(id){
    let professorsTemp = professors
    for(let i=0; i < professorsTemp.length; i++){
        if(professorsTemp[i].id === id){
            professorsTemp.splice(i,1)
        }
    }
    setProfessors([...professorsTemp]);
  }

  function generateTable() {
    if (!professors) return;

    return professors.map((professor, index) => {
      return <ProfessorTableRow professor={professor} key={index} deleteProfessorById={deleteProfessorById} />;
    });
  }

  return (
    <div>
      <h2>Listar Professor</h2>
      <table className="table table-striped">
        <thead>
          <th>ID</th>
          <th>Nome</th>
          <th>Universidade</th>
          <th>Titulação</th>
          <th colSpan={2} style={{ textAlign: "center" }}></th>
        </thead>
        <tbody>{generateTable()}</tbody>
      </table>
    </div>
  );
};

export default ListProfessor;
