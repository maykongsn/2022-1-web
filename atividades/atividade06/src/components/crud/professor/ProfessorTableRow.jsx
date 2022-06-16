import React from "react";
import { Link } from "react-router-dom";

import FirebaseProfessorService from "../../../services/FirebaseProfessorService";

const ProfessorTableRow = (props) => {
    const { _id, name, university, degree } = props.professor;

    function deleteProfessor() {
        if(window.confirm(`Deseja excluir o elemento de ID: ${_id}?`)) {
            FirebaseProfessorService.delete(
                props.firestore,
                () => {
                    alert('Professor ' + _id + ' apagado com sucesso!');
                },
                _id
            )
        }
    }

    return (
        <tr>
            <td>{_id}</td>
            <td>{name}</td>
            <td>{university}</td>
            <td>{degree}</td>
            <td style={{ textAlign: "center" }}>
                <Link className="btn btn-warning" to={`/editProfessor/${_id}`}>
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
