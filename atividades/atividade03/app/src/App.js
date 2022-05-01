import { Routes, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Home from "./components/Home";
import About from "./components/About";

import CreateStudent from "./components/crud/student/CreateStudent";
import EditStudent from "./components/crud/student/EditStudent";
import ListStudent from "./components/crud/student/ListStudent";

import CreateProfessor from "./components/crud/professor/CreateProfessor";
import ListProfessor from "./components/crud/professor/ListProfessor";
import EditProfessor from "./components/crud/professor/EditProfessor";

export default function App() {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to="/" className="navbar-brand" style={{ paddingLeft: 29 }}>
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
            <li class="nav-item dropdown">
              <Link
                class="nav-link dropdown-toggle"
                to="/"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Estudante
              </Link>
              <ul
                class="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <Link class="dropdown-item" to="createStudent">
                    Criar Estudante
                  </Link>
                </li>
                <li>
                  <Link class="dropdown-item" to="listStudent">
                    Listar Estudante
                  </Link>
                </li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <Link
                class="nav-link dropdown-toggle"
                to="/"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Professor
              </Link>
              <ul
                class="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <Link class="dropdown-item" to="createProfessor">
                    Criar Professor
                  </Link>
                </li>
                <li>
                  <Link class="dropdown-item" to="listProfessor">
                    Listar Professor
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="createStudent" element={<CreateStudent />} />
        <Route path="editStudent/:id" element={<EditStudent />} />
        <Route path="listStudent" element={<ListStudent />} />
        <Route path="createProfessor" element={<CreateProfessor />} />
        <Route path="editProfessor/:id" element={<EditProfessor />} />
        <Route path="listProfessor" element={<ListProfessor />} />
      </Routes>
    </div>
  );
}
