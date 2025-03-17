const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

class Student {
    constructor(hoTen, lop) {
        this.id = GenString(16);
        this.mssv = GenNumber(11);
        this.hoTen = hoTen;
        this.lop = lop;
        this.isDeleted = false;
    }
}

let students = [];

function GenString(length) {
    let source = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let index = 0; index < length; index++) {
        let rd = Math.floor(Math.random() * source.length);
        result += source.charAt(rd);
    }
    return result;
}

function GenNumber(length) {
    let result = "";
    for (let index = 0; index < length; index++) {
        let rd = Math.floor(Math.random() * 10);
        result += rd.toString();
    }
    return result;
}

app.get('/students', (req, res) => {
    res.send(students.filter(student => !student.isDeleted));
});

app.post('/students', (req, res) => {
    const { hoTen, lop } = req.body;
    const newStudent = new Student(hoTen, lop);
    students.push(newStudent);
    res.send(newStudent);
});

app.put('/students/:id', (req, res) => {
    const id = req.params.id;
    const student = students.find(s => s.id === id);
    const { hoTen, lop } = req.body;
    if (student) {
        if (hoTen) student.hoTen = hoTen;
        if (lop) student.lop = lop;
        res.send(student);
    } else {
        res.status(404).send({ message: "Student not found" });
    }
});

app.delete('/students/:id', (req, res) => {
    const id = req.params.id;
    const student = students.find(s => s.id === id);
    if (student) {
        student.isDeleted = true;
        res.send(student);
    } else {
        res.status(404).send({ message: "Student not found" });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});