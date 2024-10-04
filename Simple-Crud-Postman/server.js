const Connection = require('./connection');

const express = require('express');
const app = express();
const port = 7777;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// ADD USER
app.post('/users', (req, res) => {
    const user = req.body;

    // Basic validation 
    if (!user.name || !user.email) {
        return res.status(400).send({ error: 'Name and email are required' });
    }

    const userData = [user.name, user.email];
    const query = 'INSERT INTO user (name, email) VALUES (?, ?)';

    Connection.query(query, userData, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: 'Database error' });
        }

        res.status(201).send({
            error: false,
            code: 200,
            message: "User Added Successfully...",
            data: {
                user: {
                    id: result.insertId,
                    name: user.name,
                    email: user.email
                }
            }
        });

        console.log('User added:', { id: result.insertId, name: user.name, email: user.email });
    });
});



// GET ALL USERS
app.get('/users', (req, res) => {
    Connection.query('SELECT * FROM user', (err, rows) => {
        if (err) {
            return res.status(500).send({
                error: true,
                message: "Data Not Found",
            });

        } else {
            res.status(200).send({
                error: false,
                code: 200,
                message: "User's Retrieved Successfully...",
                data: {
                    user: rows
                }
            });
            console.log(rows);
        }
    });
});


// GET SPECIFIC ID
app.get('/users/:id', (req, res) => {
    Connection.query('SELECT * FROM user WHERE id=?', [req.params.id], (err, rows) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                error: true,
                message: "Internal Server Error",
            });
        }

        if (rows.length === 0) {
            return res.status(404).send({
                error: true,
                message: "User not found",
            });
        }

        res.status(200).send({
            error: false,
            code: 200,
            message: "User Retrieved Successfully...",
            data: {
                user: rows
            }
        });

        console.log(rows);
    });
});

// UPDATE USER
app.patch('/users', (req, res) => {
    const user = req.body;

    Connection.query('UPDATE user SET ? WHERE id = ?', [user, user.id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                error: true,
                message: "Internal Server Error",
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({
                error: true,
                message: "User not found",
            });
        }

        res.status(200).send({
            error: false,
            code: 200,
            message: "User Updated Successfully...",
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                }
            }
        });

        console.log(result);
    });
});


// DELETE USER
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;

    // First, fetch the user data
    Connection.query('SELECT * FROM user WHERE id = ?', [userId], (err, users) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                error: true,
                message: "Internal Server Error",
            });
        }

        if (users.length === 0) {
            return res.status(404).send({
                error: true,
                message: "User not found",
            });
        }

        const user = users[0]; 

        Connection.query('DELETE FROM user WHERE id = ?', [userId], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send({
                    error: true,
                    message: "Internal Server Error",
                });
            }

            res.status(200).send({
                error: false,
                message: "User Deleted Successfully...",
                data: {
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    }
                }
            });
           console.log(result);
        });
    });
});



app.listen(port, () => {
    console.log(`Server Start At http://localhost:${port}`);
});