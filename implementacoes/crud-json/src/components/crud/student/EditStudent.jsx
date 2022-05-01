import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditStudent = (props) => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [ira, setIra] = useState(0);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/students/' + params.id)
      .then(
        (res) => {
          setName(res.data.name);
          setCourse(res.data.course);
          setIra(res.data.ira);
        }
      )
      .catch(
        (error) => {
          console.log(error);
        }
      )
  }, [params.id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedStudent = { name, course, ira };
    
    axios.put('http://localhost:3001/students/' + params.id, updatedStudent)
      .then(
        (res) => {
          console.log(res.data);
          navigate("/listStudent");
        }
      )
      .catch((error) => console.log(error));
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

export default EditStudent;
