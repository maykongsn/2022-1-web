import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import FirebaseContext from "../../../utils/FirebaseContext";
import FirebaseProfessorService from '../../../services/FirebaseProfessorService';

const CreateProfessorPage = () =>
    <FirebaseContext.Consumer>
        {
            (firebase) => <CreateProfessor firebase={firebase} />
        }
    </FirebaseContext.Consumer>


const CreateProfessor = (props) => {
  const [name, setName] = useState("");
  const [university, setUniversity] = useState("");
  const [degree, setDegree] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const newProfessor = { name, university, degree };
    FirebaseProfessorService.create(
        props.firebase.getFirestoreDb(),
        () => {
            alert(`Professor ${name} criado com sucesso.`)
            navigate("/listProfessor")
        },
        newProfessor
    )
  };

  return (
    <div>
      <h2>Criar Professor</h2>
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
            <label>Universidade</label>
            <input
              type="text"
              className="form-control"
              value={university ?? ""}
              name="university"
              onChange={(event) => setUniversity(event.target.value)}
            />
          </div>
          <div>
            <label>Titulação</label>
            <input
              type="text"
              className="form-control"
              value={degree === null || degree === undefined ? 0 : degree}
              name="degree"
              onChange={(event) => setDegree(event.target.value)}
            />
          </div>
          <div style={{ paddingTop: 20 }}>
            <input
              type="submit"
              value="Criar Professor"
              className="btn btn-primary"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProfessorPage;
