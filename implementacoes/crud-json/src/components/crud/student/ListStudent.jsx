import React, { useState, useEffect } from "react";
import axios from "axios";

import StudentTableRow from "./StudentTableRow";

const ListStudent = () => {
  const [students, setStudents] = useState([]);

  useEffect(
    () => {
      axios.get('http://localhost:3001/students')
        .then(
          (res) => {
            setStudents(res.data)
          }
        )
        .catch(
          (error) => {
            console.log(error);
          }
        )
    }, []
  );

  function deleteStudentById(id) {
    let studentsTemp = students;
    for(let i = 0; i < studentsTemp.length; i++) {
      if(studentsTemp[i].id === id) {
        studentsTemp.splice(i, 1);
      }
    }
    setStudents([...studentsTemp]);
  }

  function generateTable() {
    if (!students) return;
    return students.map((student, index) => {
      return <StudentTableRow student={student} key={index} deleteStudentById={deleteStudentById} />;
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

export default ListStudent;
