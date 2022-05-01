import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProfessor = (props) => {
  const [name, setName] = useState("");
  const [university, setUniversity] = useState("");
  const [degree, setDegree] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3002/crud/professors/retrieve/' + params.id)
      .then(
        (res) => {
          setName(res.data.name);
          setUniversity(res.data.university);
          setDegree(res.data.degree);
        }
      )
      .catch((error) => console.log(error));
  }, [params.id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedProfessor = { name, university, degree};

    axios.put(`http://localhost:3002/crud/professors/update/` + params.id, updatedProfessor)
      .then((res) => navigate("/listProfessor"))
      .then((error) => console.log(error))
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
          <div style={{ paddingTop: 20 }}>
            <input type="submit" value="Salvar" className="btn btn-primary" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfessor;
