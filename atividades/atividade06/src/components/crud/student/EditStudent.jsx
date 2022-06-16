import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import FirebaseContext from '../../../utils/FirebaseContext';
import FirebaseStudentService from '../../../services/FirebaseStudentService';

const EditStudentPage = () =>
    <FirebaseContext.Consumer>
        {
            (firebase) => <EditStudent firebase={firebase} />
        }
    </FirebaseContext.Consumer>

const EditStudent = (props) => {
    const [name, setName] = useState("");
    const [course, setCourse] = useState("");
    const [ira, setIra] = useState(0);
    const params = useParams();
    const navigate = useNavigate();   

    useEffect(() => {
        FirebaseStudentService.retrieve(
            props.firebase.getFirestoreDb(),
            (student) => {
                setName(student.name);
                setCourse(student.course);
                setIra(student.ira);
            },
            params.id
        )
    }, [params.id, props.firebase]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedStudent = { name, course, ira };
    
    FirebaseStudentService.update(
        props.firebase.getFirestoreDb(),
        () => {
            navigate('/listStudent')
        },
        params.id,
        updatedStudent
    )
  };

  return (
    <div>
      <h2>Editar Estudante</h2>
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
          <div colspan={2} style={{ paddingTop: 20 }}>
            <input type="submit" value="Salvar" className="btn btn-primary" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditStudentPage;
