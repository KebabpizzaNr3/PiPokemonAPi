module.exports = function (apiRoutes,connection) {

    //get all the areas
    apiRoutes.get('/area',function (req,res) {

        var queryString = 'SELECT * ' +
            'FROM pokemon.Area;';

        connection.query(queryString, function (err, rows, fields) {
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

    //get monsters in an area with tha area id
    apiRoutes.get('/area/monsters',function (req,res) {

        var areaId = req.query.areaId;

        if(!areaId)
        {
            res.json({
                message: "You need to provide the id for the area"
            });
            return;
        }


        var queryString = 'SELECT * ' +
            'FROM pokemon.LevelHasMonster ' +
            'WHERE areaId=?;';

        connection.query(queryString,[areaId], function (err, rows, fields) {
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

    //get items in an area with tha area id
    apiRoutes.get('/area/items/:id',function (req,res) {

        var areaId = req.params.id;

        if(!areaId)
        {
            res.json({
                message: "You need to provide the id for the area"
            });
            return;
        }


        var queryString = 'SELECT * ' +
            'FROM pokemon.MapItems ' +
            'WHERE areaId=?;';

        connection.query(queryString,[areaId], function (err, rows, fields) {
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

    //get area(s) by the name
    apiRoutes.get('/area/name/:name',function (req,res) {

        var areaName = req.params.name;
        if(areaName)
        {
            var queryString = 'SELECT * ' +
                'FROM pokemon.Area ' +
                'WHERE name=?;';

            connection.query(queryString,[areaName], function (err, rows, fields) {
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
        }
        else {
            res.json({
                message: "ERROR"
            });
        }

    });

    //get area(s) by the id
    apiRoutes.get('/area/id/:id',function (req,res) {

        var areaId = req.params.id;
        if(areaId)
        {
            var queryString = 'SELECT * ' +
                'FROM pokemon.Area ' +
                'WHERE id=?;';

            connection.query(queryString,[areaId], function (err, rows, fields) {
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
        }
        else {
            res.json({
                message: "ERROR"
            });
        }

    });
};
