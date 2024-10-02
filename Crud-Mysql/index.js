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

app.post('/' , function(req , res){
    var name =  req.body.name;
    var email =  req.body.email;
    var mno =  req.body.mno;
    
    // con.connect(function(error){
    //     if(error) throw error;

    //     // var sql = "INSERT INTO students(name , email , mno) VALUES('"+name+"' , '"+email+"' , '"+mno+"')";    // WAY - 1
    //     var sql = "INSERT INTO students(name , email , mno) VALUES(? , ? , ?)";                                  // WAY - 2
    //     con.query(sql ,[ name , email , mno ], function(error , result){ 
    //         if(error) throw error;
    //         res.send("Student Registered Successfully..." +result.insertId);
    //     }); 
    // });

    con.connect(function(error){
        if(error) throw error;

        var sql = "INSERT INTO students(name , email , mno) VALUES ?";       
        
        var values = [
            [name , email , mno]
        ];                                                                            // WAY -3

        con.query(sql , [values] , function(error , result){ 
            if(error) throw error;
            res.redirect('/students');
            // res.send("Student Registered Successfully..." +result.insertId);
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
            res.render(__dirname+"/students" , {students:result});
        });
    });
});

app.get('/delete-student' , function(req , res){
    con.connect(function(error){
        if(error) console.log(error);
        var sql = "delete from students where id=?";
        var id = req.query.id;

        con.query(sql, [id] , function(error, result){
            if(error) console.log(error);
            // console.log(result);
            res.redirect("/students");
        });
    });
});

app.get('/update-student' , function(req , res){
    con.connect(function(error){
        if(error) console.log(error);
        var sql = "select * from students where id=?";
        var id = req.query.id;

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

    con.connect(function(error){
        if(error) console.log(error);
        var sql = "UPDATE students set name=?,email=?,mno=? where id=?";
        var id = req.query.id;

        con.query(sql, [name , email , mno , id] , function(error, result){
            if(error) console.log(error);
            // console.log(result);
            res.redirect('/students');
        });
    });
});

app.get('/search-students' , function(req , res){
    con.connect(function(error){
        if(error) console.log(error);
        var sql = "select * from students";

        con.query(sql, function(error, result){
            if(error) console.log(error);
            // console.log(result);
            res.render(__dirname+"/search-students" , {students:result});
        });
    });
});

    app.get('/search' , function(req, res){
        var name = req.query.name;
        var email = req.query.email;
        var mno = req.query.mno;

        con.connect(function(error){
            if(error) console.log(error);
            var sql = "SELECT * from students where name LIKE '%"+name+"%' AND email LIKE '%"+email+"%' AND mno LIKE '%"+mno+"%'";

            con.query(sql, function(error, result){
                if(error) console.log(error);
                res.render(__dirname+'/search-students' , {students:result});
            })
        })
    })

app.listen(port);
    console.log(`Server Start At http://localhost:${port}`);
    