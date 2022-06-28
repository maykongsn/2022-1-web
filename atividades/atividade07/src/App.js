import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Home from "./components/Home";
import About from "./components/About";
import SignUp from "./components/SignUp";

import CreateStudent from "./components/crud/student/CreateStudent";
import EditStudent from "./components/crud/student/EditStudent";
import ListStudent from "./components/crud/student/ListStudent";

import CreateProfessor from "./components/crud/professor/CreateProfessor";
import ListProfessor from "./components/crud/professor/ListProfessor";
import EditProfessor from "./components/crud/professor/EditProfessor";

import FirebaseUserService from './services/FirebaseUserService';

import FirebaseContext from "./utils/FirebaseContext";

import MyToast from "./utils/MyToast";

const AppPage = () =>
  <FirebaseContext.Consumer>
    {(firebase) => <App firebase={firebase} />}
  </FirebaseContext.Consumer>

function App(props) {
  const [logged, setLogged] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toast, setToast] = useState({ header: '', body: '' });

  const navigate = useNavigate();

  const logout = () => {
    FirebaseUserService.logout(
      props.firebase.getAuthentication(),
      (res) => {
        if (res) {
          props.firebase.setUser(null)
          setLogged(false)
          navigate('/')
        }
      }
    )
  }

  const renderLoginButtonLogout = () => {
    if (props.firebase.getUser() != null)
      return (
        <div style={{ marginRight: 20 }}>
          Olá, {props.firebase.getUser().email}
          <button onClick={() => logout()} style={{ marginLeft: 20 }}>Logout</button>
        </div>
      )
    return
  }

  const renderToast = () => {
    return <MyToast
      show={showToast}
      header={toast.header}
      body={toast.body}
      setShowToast={setShowToast}
      bg='secondary'
    />
  }

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand" style={{ paddingLeft: 29 }}>
          UFC
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="navitem">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="about" className="nav-link">
                About
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="/"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Estudante
              </Link>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <Link className="dropdown-item" to="createStudent">
                    Criar Estudante
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="listStudent">
                    Listar Estudante
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="/"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Professor
              </Link>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <Link className="dropdown-item" to="createProfessor">
                    Criar Professor
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="listProfessor">
                    Listar Professor
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        {renderToast()}
        {renderLoginButtonLogout()}
      </nav>

      <Routes>
        <Route path="/" element={<Home setLogged={setLogged} setShowToast={setShowToast} setToast={setToast} />} />
        <Route path="about" element={<About />} />
        <Route path="signup" element={<SignUp setLogged={setLogged} setShowToast={setShowToast} setToast={setToast}/>} />
        <Route path="createStudent" element={<CreateStudent setShowToast={setShowToast} setToast={setToast}/>}/>
        <Route path="editStudent/:id" element={<EditStudent setShowToast={setShowToast} setToast={setToast}/>} />
        <Route path="listStudent" element={<ListStudent setShowToast={setShowToast} setToast={setToast}/>}/>
        <Route path="createProfessor" element={<CreateProfessor setShowToast={setShowToast} setToast={setToast}/>} />
        <Route path="editProfessor/:id" element={<EditProfessor setShowToast={setShowToast} setToast={setToast}/>} />
        <Route path="listProfessor" element={<ListProfessor setShowToast={setShowToast} setToast={setToast}/>} />
      </Routes>
    </div>
  );
}

export default AppPage;