/**
 * Created by Tobias on 2016-04-19.
 */
module.exports = function (apiRoutes,connection) {

    //get all the items
    apiRoutes.get('/item',function (req,res) {
        var queryString = 'SELECT * ' +
            'FROM pokemon.Item;';

        connection.query(queryString, function (err, rows, fields) {
            if (err)
                throw err;

            res.json(rows);
        });
    });

    //get item(s) by name
    apiRoutes.get('/item/name/:itemName',function (req,res) {
        var queryString = 'SELECT * ' +
            'FROM pokemon.Item ' +
            'WHERE Item.name = ?;';

        connection.query(queryString,[req.params.itemName], function (err, rows, fields) {
            if (err)
                throw err;

            res.json(rows);
        });


    });

    //get item by id
    apiRoutes.get('/item/:id',function (req,res) {
        var queryString = 'SELECT * ' +
            'FROM pokemon.Item ' +
            'WHERE Item.idItem = ?;';

        connection.query(queryString,[req.params.id], function (err, rows, fields) {
            if (err)
                throw err;

            res.json(rows);
        });
    });

};
