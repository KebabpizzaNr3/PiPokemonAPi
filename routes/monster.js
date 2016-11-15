/**
 * Created by Tobias on 2016-04-18.
 */
module.exports = function (apiRoutes,connection) {

    //get all the monsters in the game
    apiRoutes.get('/monster',function (req,res) {

        var queryString = 'SELECT * ' +
            'FROM Pallettown.Monster;';

        connection.query(queryString, function (err, rows, fields) {
            if (err) {
                //throw err;
                res.json({
                    message: "Error in the database"
                });
            }
            else {
                res.json(rows);
            }
        });
    });

    //find monsters by their name
    apiRoutes.get('/monster/name/:monsterName',function (req,res) {

        var monsterName = req.params.monsterName;

        if(!monsterName)
        {
            res.json({
                message: "No MonsterName in the url string"
            });
            return;
        }

        var qureyString = 'SELECT * ' +
            'FROM Pallettown.Monster ' +
            'WHERE Monster.Name = ?;';

        connection.query(qureyString,[monsterName],function (err, rows, fields) {
            if (err) {
                //throw err;
                res.json({
                    message: "Error in the database"
                });
                return;
            }
            else {
                res.json(rows);
            }
        });
    });

    //find monsters by id
    apiRoutes.get('/monster/id/:monsterId',function (req,res) {

        var monsterId = req.params.monsterId;

        if(!monsterId)
        {
            res.json({
                message: "No MonsterId in the url string"
            });
            return;
        }

        var qureyString = 'SELECT * ' +
            'FROM Pallettown.Monster ' +
            'WHERE Monster.id = ?;';

        connection.query(qureyString,[monsterId],function (err, rows, fields) {
            if (err) {
                //throw err;
                res.json({
                    message: "Error in the database"
                });
                return;
            }
            else {
                res.json(rows);
            }
        });
    });

    //get monster by type
    apiRoutes.get('/monster/type/:monsterType',function (req,res) {
        var monsterType = req.params.monsterType;

        monsterType = monsterType.replace(" ", "");
        var types = monsterType.split(",");

        var queryString = 'SELECT * ' +
            'FROM Pallettown.Monster ' +
            "WHERE Monster.type IN (?";

        if(types.length > 1) {
            for (var i = 1; i < types.length; i++) {
              queryString += ",'" + types[i] + "'";
            }
        }

        queryString += ") AND Monster.evolveLevel IS NOT NULL AND Monster.id > 9;";

        console.log(queryString);

        connection.query(queryString,[types[0]],function (err, rows, fields) {
            if (err) {
                //throw err;
                res.json({
                    message: "Error in the database"
                });
                return;
            }
            else {
                res.json(rows);
            }
        });


    });

    //get the attacks for monster with id
    apiRoutes.get('/monster/:id/attacks',function (req,res) {
        // var monsterId = req.params.id;
        var monsterIds = JSON.parse(req.params.id);

        var queryString = 'SELECT * ' +
            'FROM Pallettown.MonstersAttack ' +
            'WHERE monsterId IN (?';

          for (var i = 1; i < monsterIds.length; i++) {
            queryString += ",'" + monsterIds[i] + "'";
          }

        queryString+= ");";

        connection.query(queryString,[monsterIds[0]],function (err, rows, fields) {
            if (err) {
                //throw err;
                res.json({
                    message: "Error in the database"
                });
                return;
            }
            else {
                res.json(rows);
            }
        });
    });
};
