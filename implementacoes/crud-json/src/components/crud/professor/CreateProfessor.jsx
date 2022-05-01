import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateProfessor = () => {
  const [name, setName] = useState("");
  const [university, setUniversity] = useState("");
  const [degree, setDegree] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProfessor = { name, university, degree };
    axios.post('http://localhost:3001/professors', newProfessor)
      .then(
        (res) => {
          console.log(res.data);
          alert(`Professor ${name} criado com sucesso.`);
          navigate("/listProfessor");
        }
      )
      .catch((error) => console.log(error));
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

export default CreateProfessor;
