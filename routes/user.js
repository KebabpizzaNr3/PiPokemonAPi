module.exports = function (apiRoutes,connection) {

    apiRoutes.get('/user',function (req,res) {
        var userId = req.decoded.id;

        if(userId)
        {
            res.json(req.decoded);
        }
        else
        {
            res.json({
                message: "no user with that id"
            });
        }
    });

};
