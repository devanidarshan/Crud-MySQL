var con = require('./connection');
var express = require('express');
var app = express();
var port = 7777;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine' ,'ejs');

app.get('/' , function(req , res){
    res.sendFile(__dirname+'/register.html');
});

app.post('/', function(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const mno = req.body.mno;

    con.connect(function(error) {
        if (error) {
            console.error('Database connection failed:', error);
            res.status(500).send('Database connection error.');
            return;
        }
        
        const sql = "INSERT INTO students (name, email, mno) VALUES ?";
        const values = [[name, email, mno]];

        con.query(sql, [values], function(error, result) {
            if (error) {
                console.error('SQL query error:', error);
                res.status(500).send('Error inserting data into database.');
                return;
            }

            res.send("Data inserted successfully.");
        });
    });
});

app.get('/students' , function(req , res){
    con.connect(function(error){
        if(error) console.log(error);
        var sql = "select * from students";

        con.query(sql, function(error, result){
            if(error) console.log(error);
            // console.log(result);
            res.render(__dirname+"/student" , {students:result});
        });
    });
});

// app.get('/delete-student' , function(req , res){
//     con.connect(function(error){
//         if(error) console.log(error);
//         var id = req.query.id;
//         var sql = "DELETE from students where id=?";

//         con.query(sql, [id] , function(error, result){
//             if(error) console.log(error);
//             // console.log(result);
//             res.send("Student record Deleted...");
//         });
//     });
// });

app.get('/delete-student', function(req, res) {
    const id = req.query.id;

    const sql = "DELETE FROM students WHERE id = ?";

    con.query(sql, [id], function(error, result) {
        if (error) {
            console.error(error);
        }
        res.send("Student record deleted successfully...");
    });
});

app.get('/update-student' , function(req , res){
    con.connect(function(error){
        if(error) console.log(error);
        var id = req.query.id;  
        var sql = "select * from students where id=?";

        con.query(sql, [id] , function(error, result){
            if(error) console.log(error);
            // console.log(result);
            res.render(__dirname+"/update-student" , {students:result});
        });
    });
});

app.post('/update-student' , function(req , res){

    var name = req.body.name;
    var email = req.body.email;
    var mno = req.body.mno;
    var id = req.body.id;

        var sql = "UPDATE students set name=?,email=?,mno=? where id=?";

        con.query(sql, [name , email , mno , id] , function(error, result){
            if(error) console.log(error);
            // console.log(result);
            res.send('Students Record Updated...');
        });
});

app.get('/search-students' , function(req , res){
    con.connect(function(error){
        if(error) console.log(error);
        var sql = "select * from students";

        con.query(sql, function(error, result){
            if(error) console.log(error);
            // console.log(result);
            res.render(__dirname+"/search-student" , {students:result});
        });
    });
});

app.get('/searching' , function(req, res){
    var name = req.query.name;
    var email = req.query.email;
    var mno = req.query.mno;

    con.connect(function(error){
        if(error) console.log(error);
        var sql = "SELECT * from students where name LIKE '%"+name+"%' AND email LIKE '%"+email+"%' AND mno LIKE '%"+mno+"%'";

        con.query(sql, function(error, result){
            if(error) console.log(error);
            res.send(result);
        });
    });
});


app.listen(port);
    console.log(`Server Start At http://localhost:${port}`);