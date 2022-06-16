import React, { useState, useEffect } from "react";

import ProfessorTableRow from "./ProfessorTableRow";

import FirebaseContext from "../../../utils/FirebaseContext";
import FirebaseProfessorService from "../../../services/FirebaseProfessorService";

const ListProfessorPage = () =>
    <FirebaseContext.Consumer>
        {
            (firebase) => <ListProfessor firebase={firebase} />
        }
    </FirebaseContext.Consumer>

const ListProfessor = (props) => {
    const [professors, setProfessors] = useState([]);

    useEffect(
        () => {
            FirebaseProfessorService.list_onSnapshot(
                props.firebase.getFirestoreDb(),
                (professors) => {
                    setProfessors(professors)
                }
            )
        }, [props.firebase, professors]
    );

    function deleteProfessorById(_id) {
        let professorsTemp = professors;
        for(let i = 0; i < professorsTemp.length; i++) {
            if(professorsTemp[i]._id === _id) {
                professorsTemp.splice(i, 1);
            }
        }
        setProfessors([...professorsTemp]);
    }

    function generateTable() {
        if (!professors) return;
        return professors.map((professor, index) => {
            return <ProfessorTableRow professor={professor} key={index} deleterofessorById={deleteProfessorById} firestore={props.firebase.getFirestoreDb()} />;
        });
    }

    return (
        <div>
            <h2>Listar Professor</h2>
            <table className="table table-striped">
                <thead>
                    <th>iD</th>
                    <th>Nome</th>
                    <th>Universidade</th>
                    <th>Titulação</th>
                    <th colSpan="2"></th>
                </thead>
                <tbody>{generateTable()}</tbody>
            </table>
        </div>
    );
};

export default ListProfessorPage;
