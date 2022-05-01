const ProfessorModel = require('../../models/professor/ProfessorModel');

let professors = [
    {_id: 0, name: "Jefferson", university: "UFC", degree: "Doutor"},
    {_id: 1, name: "Roberto", university: "UFC", degree: "Mestre"},
    {_id: 2, name: "Fulano", university: "UFC", degree: "Mestre"}
]
let _id = 3;

class ProfessorService {
    static create(data) {
        let professor = new ProfessorModel(
            _id++,
            data.name,
            data.university,
            data.degree);
        professors.push(professor);
        return professor;
    }

    static retrieve(_id) {
        for (let i = 0; i < professors.length; i++) {
            if (professors[i]._id == _id) {
                return professors[i];
            }
        }
        return {};
    }

    static update(_id, data) {
        for (let professor of professors) {
            if (professor._id == _id) {
                professor.name = data.name;
                professor.university = data.university;
                professor.degree = data.degree;
                return professor;
            }
        }
        return null;
    }

    static delete(_id) {
        for (let i = 0; i < professors.length; i++) {
            if (professors[i]._id == _id) {
                professors.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    static list() {
        return professors;
    }
}

module.exports = ProfessorService;
