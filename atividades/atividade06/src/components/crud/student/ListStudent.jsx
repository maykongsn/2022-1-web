import React, { useState, useEffect } from "react";


import StudentTableRow from "./StudentTableRow";

import FirebaseContext from "../../../utils/FirebaseContext";
import FirebaseStudentService from "../../../services/FirebaseStudentService";

const ListStudentPage = () =>
    <FirebaseContext.Consumer>
        {
            (firebase) => <ListStudent firebase={firebase} />
        }
    </FirebaseContext.Consumer>

const ListStudent = (props) => {
    const [students, setStudents] = useState([]);

    useEffect(
        () => {
            FirebaseStudentService.list_onSnapshot(
                props.firebase.getFirestoreDb(),
                (students) => {
                    setStudents(students)
                }
            )
        }, [props.firebase, students]
    );

    function deleteStudentById(_id) {
        let studentsTemp = students;
        for(let i = 0; i < studentsTemp.length; i++) {
            if(studentsTemp[i]._id === _id) {
                studentsTemp.splice(i, 1);
            }
        }
        setStudents([...studentsTemp]);
    }

    function generateTable() {
        if (!students) return;
        return students.map((student, index) => {
            return <StudentTableRow student={student} key={index} deleteStudentById={deleteStudentById} firestore={props.firebase.getFirestoreDb()} />;
        });
    }

    return (
        <div>
            <h2>Listar Estudante</h2>
            <table className="table table-striped">
                <thead>
                    <th>iD</th>
                    <th>Nome</th>
                    <th>Curso</th>
                    <th>IRA</th>
                    <th colSpan="2"></th>
                </thead>
                <tbody>{generateTable()}</tbody>
            </table>
        </div>
    );
};

export default ListStudentPage;
