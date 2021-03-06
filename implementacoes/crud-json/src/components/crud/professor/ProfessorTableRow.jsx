import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProfessorTableRow = (props) => {
  const { id, name, university, degree } = props.professor;

  function deleteProfessor() {
    if(window.confirm(`Deseja excluir o elemento de ID: ${id}?`)) {
      axios.delete(`http://localhost:3001/professors/${id}`)
        .then((res) => props.deleteProfessorById(id))
        .catch((error) => console.log(error))
    }
  }

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{university}</td>
      <td>{degree}</td>
      <td style={{ textAlign: "center" }}>
        <Link className="btn btn-warning" to={`/editProfessor/${id}`}>
          Editar
        </Link>
      </td>
      <td style={{ textAlign: "center" }}>
        <button className="btn btn-danger" onClick={() => deleteProfessor()}>Apagar</button>
      </td>
    </tr>
  );
};

export default ProfessorTableRow;
