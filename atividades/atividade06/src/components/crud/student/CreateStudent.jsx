import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import FirebaseContext from "../../../utils/FirebaseContext";
import FirebaseStudentService from '../../../services/FirebaseStudentService';

const CreateStudentPage = () =>
    <FirebaseContext.Consumer>
        {
            (firebase) => <CreateStudent firebase={firebase} />
        }
    </FirebaseContext.Consumer>


const CreateStudent = (props) => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [ira, setIra] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const newStudent = { name, course, ira };
    FirebaseStudentService.create(
        props.firebase.getFirestoreDb(),
        () => {
            alert(`Aluno ${name} criado com sucesso.`)
            navigate("/listStudent")
        },
        newStudent
    )
  };

  return (
    <div>
      <h2>Criar Estudante</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div>
            <label>Nome</label>
            <input
              type="text"
              className="form-control"
              value={name ?? ""}
              name="name"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div>
            <label>Curso</label>
            <input
              type="text"
              className="form-control"
              value={course ?? ""}
              name="course"
              onChange={(event) => setCourse(event.target.value)}
            />
          </div>
          <div>
            <label>IRA</label>
            <input
              type="text"
              className="form-control"
              value={ira === null || ira === undefined ? 0 : ira}
              name="ira"
              onChange={(event) => setIra(event.target.value)}
            />
          </div>
          <div style={{ paddingTop: 20 }}>
            <input
              type="submit"
              value="Criar Estudante"
              className="btn btn-primary"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateStudentPage;
