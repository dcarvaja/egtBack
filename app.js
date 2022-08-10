const express = require('express');
const cors = require('cors');
const app = express();
const { Pool } = require('pg');

const client = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'abcd1234',
    port: 5432
});

client.connect();

app.use(cors());

app.post('/login', (req, res) => {
    let data = client.query('SELECT password FROM "Usuario" WHERE usuario="' + res.data.user + '"');
    data.then(info => {
        if(info.rows[0].password === req.data.password)
            res.status(200).send({
                token: 'Logged'
            })
        else
            res.status(401).send();
    })
});

app.use('/data', (req, res) => {
    try {
        let data = client.query('SELECT * FROM public."Registro"');
        data.then(info => {
            let registered = [];
            let courses = {};
            info.rows.forEach(elmt => registered.push(elmt.idAlumno));
            let dataAlumnos = client.query('SELECT * FROM "Alumno" WHERE ')
            res.send({
                data: info.rows
            });
        })
    } catch (e) {
        console.log(e);
        res.status(500);
    }
});

app.get('/courses', (req, res) => {
    try {
        let data = client.query('SELECT * FROM public."Curso"');
        data.then(info => {
            res.send({
                data: info.rows
            });
        })
    } catch (e) {
        console.log(e);
        res.status(500);
    }

});

app.post('/data', (req, res) => {
    try {
        let data = req.data;
        // Implementar query a BD y response..
    } catch (e) {
        console.log(e);
        res.status(500);
    }
})

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'))