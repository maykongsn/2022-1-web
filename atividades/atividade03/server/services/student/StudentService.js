const StudentModel = require('../../models/student/StudentModel');

let students = [
    { _id: 0, name: "Maykon", course: "SI", ira: 8 },
    { _id: 1, name: "Fulano", course: "SI", ira: 8.1 },
    { _id: 2, name: "Beltrano", course: "SI", ira: 9.5}
]
let _id = 3;

class StudentService {
    static create(data) {
        let student = new StudentModel(
            _id++,
            data.name,
            data.course,
            data.ira);
        students.push(student);
        return student;
    }
    
    static retrieve(_id) {
        for (let i = 0; i < students.length; i++) {
            if (students[i]._id == _id) {
                return students[i];
            }
        }
        return {};
    }

    static update(_id, data) {
        for (let student of students) {
            if (student._id == _id) {
                student.name = data.name;
                student.course = data.course;
                student.ira = data.ira;
                return student;
            }
        }
        return null;
    }

    static delete(_id) {
        for (let i = 0; i < students.length; i++) {
            if (students[i]._id == _id) {
                students.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    static list() {
        return students;
    }
}

module.exports = StudentService;
