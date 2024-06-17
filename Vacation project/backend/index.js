//imports
const express = require('express')
const session = require('express-session')
const cors = require('cors')
const { SQL } = require('./db/dbconfig')

//initialization
const app = express()
const port = process.env.PORT || 1000

app.use(cors({
    origin:"http://localhost:3000",
    credentials: true
}))
 
app.use(express.json())
 
app.use(session({
    secret:"myProject",
    name:"session",
    saveUninitialized: true,
    resave:true,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24
    } 
}))

// Routes
app.use('/users', require('./routes/users'))
app.use('/vacations', require('./routes/vacations'))
app.use('/admin', require('./routes/admin'))


app.get('/', async (req, res) => {
    try {
        const users = await SQL(`SELECT * FROM users WHERE role="admin"`);
        console.table(users);
        res.send(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
 
app.listen(port, ()=> console.log("Server connected/Port 1000 "))
