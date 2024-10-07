const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const mysqlConnection = require('./connection'); // Adjust path as needed
const { serializeUser } = require('passport');

module.exports = (passport) => {
    
    // REGISTER USER
    passport.use('local-register', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    }, async (req, email, password, done) => {
        try {
            // Check if user already exists
            const sqlCheck = 'SELECT * FROM user WHERE email = ?';
            mysqlConnection.query(sqlCheck, [email], async (err, results) => {
                if (err) return done(err);
                if (results.length > 0) return done(null, false, { message: 'Email already exists.' });
                
                // Hash the password
                const hashpassword = await bcrypt.hash(password, 10);
                
                // Prepare new user data
                const newUser = {
                    name: req.body.name,
                    email: email,
                    password: hashpassword,
                };
                
                // Insert new user into the database
                const sqlInsert = 'INSERT INTO user (name, email, password) VALUES (?, ?, ?)';
                mysqlConnection.query(sqlInsert, [newUser.name, newUser.email, newUser.password], (error, insertResults) => {
                    if (error) return done(error);
                    newUser.id = insertResults.insertId; // Add the new user's ID
                    return done(null, newUser);
                });
            });
        } catch (error) {
            return done(error);
        }
    }));
    
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser((id, done) => {
        const sqlFind = 'SELECT * FROM user WHERE id = ?';
        mysqlConnection.query(sqlFind, [id], (error, results) => {
            if (error) return done(error);
            done(null, results[0]);
        });
    });
    
    // LOGIN USER  
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    }, async (req, email, password, done) => {
        try {
            // Check if user exists
            const sql = 'SELECT * FROM user WHERE email = ?';
            mysqlConnection.query(sql, [email], async (err, results) => {
                if (err) return done(err);
                if (results.length === 0) {
                    return done(null, false, { message: 'Email Not Found.' });
                }
                
                const user = results[0];
                // console.log(results));

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Password Not Match.' });
        }

        // If everything is good, return the user
        return done(null, user);
        
      });
    } catch (error) {
      return done(error);
    }
  }));

};
