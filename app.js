var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');

var jwt = require('jsonwebtoken');

//Database
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host: '37.123.188.101',
    user: 'readwrite',
    password: 'bergstedtarn3512'
});



//use bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.set('secret','ilovescotchyscotch');

app.get('/',function (req,res) {
    res.send("Hello this is the api for pokemon");
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


var apiRoutes = express.Router();

//this will return the token to be used by the client to get other info
apiRoutes.post('/login', function(req, res){
    //here you should login with username and password
    //before you get the token

    //get user from database
    var qureyString = 'SELECT * FROM pokemon.User WHERE User.Username = ? AND User.Password = ?;';

    connection.query(qureyString,[req.body.Username,req.body.Password],function (err, rows, fields) {
        if (err || rows.length !== 1)
        {
            res.json({
                sucess: false,
                message: "can't find user or the password is incorrect"
            });
        }
        else
        {
            //generate token
            var token = jwt.sign(rows[0],app.get('secret'),{
            expiresInMinutes: 1440 // expires in 24 hours
        });

            //return token
            res.json({
                sucess: true,
                message: "here is your token",
                token: token
            });
        }
    });


});

//create new user with POST
apiRoutes.post('/signup', function (req,res) {
    var username = req.body.Username;
    var password = req.body.Password;
    var characterid = req.body.CharacterId;
    var succ = true;
    var mess = "All went well";

    var queryString = "INSERT INTO " +
        "`pokemon`.`User` ( `Username`, `Password`,`characterId` ) VALUES (?, ?, ?);";

    connection.query(queryString,[username,password, characterid],function (err,rows,fields) {
        if(err)
        {
            succ = false;
            mess = "You done goofed";
            con
        }
    });

    for(var i=1;i<5;i++){
      var queryString = "INSERT INTO " +
       "`pokemon`.`CharactersItem` (`characterId`, `itemId`, `amount`) VALUES (?,?,0);";

       connection.query(queryString,[characterid,i],function (err,rows,fields){
         if(err)
         {
           succ = false;
           mess = "You done goofed";
         }
       });
    }
    res.json({
      sucess: succ,
      message: mess
    });
});


//create new character with POST
apiRoutes.post('/charcreate', function (req,res) {
    var charname = req.body.Charname;

    var queryString = "INSERT INTO " +
        "`pokemon`.`Character` (`name`) VALUES (?);";

        connection.query(queryString,[charname], function(err,rows,fields){
          if(err)
          {
            res.json({
                sucess: false,
                message: "Error"
            });
          }
          else {
            {
              res.json({
                sucess: true,
                message: "Character created",
                charId: rows.insertId
              });
            }
          }
        });
});

//routes that don't require login
require('./routes/attack.js')(apiRoutes,connection);
require('./routes/area.js')(apiRoutes,connection);
require('./routes/monster.js')(apiRoutes,connection);
require('./routes/item.js')(apiRoutes,connection);

//checks token
apiRoutes.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('secret'), function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});

apiRoutes.get('/', function(req, res) {
    res.json({ message: 'Welcome to the API for the pokemon' });
});

//routes that requires user to be logged in.
require('./routes/user.js')(apiRoutes,connection);
require('./routes/character.js')(apiRoutes,connection);

app.use('/api',apiRoutes);



app.listen(8000);
console.log('server is running on ' + 8000);
