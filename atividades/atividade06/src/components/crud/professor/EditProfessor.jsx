import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import FirebaseContext from '../../../utils/FirebaseContext';
import FirebaseProfessorService from '../../../services/FirebaseProfessorService';

const EditProfessorPage = () =>
    <FirebaseContext.Consumer>
        {
            (firebase) => <EditProfessor firebase={firebase} />
        }
    </FirebaseContext.Consumer>

const EditProfessor = (props) => {
    const [name, setName] = useState("");
    const [university, setUniversity] = useState("");
    const [degree, setDegree] = useState(0);
    const params = useParams();
    const navigate = useNavigate();   

    useEffect(() => {
        FirebaseProfessorService.retrieve(
            props.firebase.getFirestoreDb(),
            (professor) => {
                setName(professor.name);
                setUniversity(professor.university);
                setDegree(professor.degree);
            },
            params.id
        )
    }, [params.id, props.firebase]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedProfessor = { name, university, degree };
    
    FirebaseProfessorService.update(
        props.firebase.getFirestoreDb(),
        () => {
            navigate('/listProfessor')
        },
        params.id,
        updatedProfessor
    )
  };

  return (
    <div>
      <h2>Editar Professor</h2>
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
          <div colspan={2} style={{ paddingTop: 20 }}>
            <input type="submit" value="Salvar" className="btn btn-primary" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfessorPage;
