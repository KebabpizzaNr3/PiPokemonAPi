/**
 * Created by Tobias on 2016-04-18.
 */
module.exports = function (apiRoutes,connection) {

    //get all the attacks in the game
    apiRoutes.get('/attack',function (req,res) {

        var qureyString = 'SELECT * ' +
            'FROM Pallettown.Attack;';

        connection.query(qureyString, function (err, rows, fields) {
            if (err) {
                //throw err;
                res.json({
                    message: "ERROR"
                });
            }
            else {
                res.json(rows);
            }
        });
    });


    //get attack by id
    apiRoutes.get('/attack/:id',function (req,res) {

        var attackIds = JSON.parse(req.params.id);

        var queryString = 'SELECT * ' +
            'FROM Pallettown.Attack ' +
            'WHERE Attack.id IN (?';
          if(attackIds.length > 1) {
            for (var i = 1; i < attackIds.length; i++) {
              queryString += ",'" + attackIds[i] + "'";
            }
          }

          queryString+= ");";

        connection.query(queryString,[attackIds[0]],function (err, rows, fields) {
            if (err) {
                //throw err;
                res.json({
                    message: "ERROR"
                });
            }
            else {
                res.json(rows);
            }
        });

    });


    //get all attacks by certain types
    apiRoutes.get('/attack/type/:attackTypes',function (req,res) {

        var attackTypes = req.params.attackTypes;

        attackTypes = attackTypes.replace(" ", "");
        var types = attackTypes.split(",");
        var queryString = 'SELECT * ' +
            'FROM Pallettown.Attack ' +
            'WHERE type = ?';

        for (var i = 1; i < types.length; i++) {
          queryString += " OR Attack.type = '" + types[i] + "'";
        }
        queryString += ";";

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

};
