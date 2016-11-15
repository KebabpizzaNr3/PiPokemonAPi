/**
 * Created by Tobias on 2016-04-16.
 */
module.exports = function (apiRoutes,connection) {

    //get the character for current player
    apiRoutes.get('/character',function (req,res) {

        var CharacterId = req.decoded.characterId;
        if(CharacterId)
        {
            var queryString = 'SELECT * ' +
                'FROM Pallettown.Character ' +
                'WHERE Character.id = ?;';

            connection.query(queryString,[CharacterId],function (err,rows,fields){
                res.json(rows[0]);
            });
        }
        else
        {
            res.json({
                message: "ERROR!!"
            });
        }
    });

    //get all character in one area
    apiRoutes.get('/character/area',function (req,res) {
        var AreaId = req.query.areaId;

        if(AreaId)
        {
            var queryString = 'SELECT * ' +
                'FROM Pallettown.Character ' +
                'WHERE Character.AreaId = ?;';

            connection.query(queryString,[AreaId],function (err,rows,fields){
                res.json(rows);
            });
        }
        else
        {
            res.json({
                message: "ERROR!!"
            });
        }
    });

    //get character items for current user
    apiRoutes.get('/character/items',function (req,res) {
        var characterId = req.decoded.characterId;

        if(characterId)
        {
        var queryString =  "SELECT c.*, i.name, i.description " +
                           "FROM Pallettown.CharactersItem as c " +
                           "INNER JOIN Pallettown.Item as i " +
                           "ON c.itemId = i.idItem " +
                           "WHERE c.characterId = ?;";



            connection.query(queryString,[characterId],function (err,rows,fields){
                if(err)
                {
                    throw err;
                }

                res.json(rows);
            });
        }
        else
        {
            res.json({
                message: "ERROR!!"
            });
        }
    });




    //get the monsters for the current character
    apiRoutes.get('/character/monsters',function (req,res) {
        var characterId = req.decoded.characterId;
        console.log(characterId);

        if(characterId)
        {

            var queryString =

            'SELECT c.*, m.name, m.type, ' +
              'a1.name as a1Name, ' +
              'a1.type as a1Type, ' +
              'a1.manaCost as a1ManaCost, ' +
              'a1.animation as a1Animation, ' +
              'a1.power as a1Power, ' +

              'a2.name as a2Name, ' +
              'a2.type as a2Type, ' +
              'a2.manaCost as a2ManaCost, ' +
              'a2.animation as a2Animation, ' +
              'a2.power as a2Power, ' +

              'a3.name as a3Name, ' +
              'a3.type as a3Type, ' +
              'a3.manaCost as a3ManaCost, ' +
              'a3.animation as a3Animation, ' +
              'a3.power as a3Power, ' +

              'a4.name as a4Name, ' +
              'a4.type as a4Type, ' +
              'a4.manaCost as a4ManaCost, ' +
              'a4.animation as a4Animation, ' +
              'a4.power as a4Power ' +

              'FROM Pallettown.CharactersMonster as c ' +
              'INNER JOIN Pallettown.Monster as m ' +
              'ON c.monsterId=m.id ' +
              'INNER JOIN Pallettown.Attack as a1 ' +
              'ON c.attackId1 = a1.id ' +
              'INNER Join Pallettown.Attack as a2 ' +
              'ON c.attackId2 = a2.id ' +
              'INNER Join Pallettown.Attack as a3 ' +
              'ON c.attackId3 = a3.id ' +
              'INNER Join Pallettown.Attack as a4 ' +
              'ON c.attackId4 = a4.id ' +
              'WHERE c.characterId = ?;';





            //  'SELECT Pallettown.CharactersMonster.*, Pallettown.Monster.name, Pallettown.Monster.type ' +
            //     'FROM Pallettown.CharactersMonster ' +
            //     'INNER JOIN Pallettown.Monster ' +
            //     'ON Pallettown.CharactersMonster.monsterId=Pallettown.Monster.id ' +
            //     'WHERE Pallettown.CharactersMonster.characterId = ?;';


            connection.query(queryString,[characterId],function (err,rows,fields){
                if(err)
                {
                    throw err;
                }

                res.json(rows);
            });
        }
        else
        {
            res.json({
                message: "ERROR!!"
            });
        }
    });

    //Update amounts of useritems
    apiRoutes.post('/character/itemAmounts',function (req,res) {
        var characterId = req.decoded.characterId;
        var items= [req.body.i1,req.body.i2,req.body.i3,req.body.i4];


        var succ = true;
        var mess = "It all went grrrreat";

        items.forEach(function(item,index){
          var queryString = 'UPDATE' +
           "`Pallettown`.`CharactersItem` SET `amount`=? WHERE `characterId`=? AND `itemId` = ?;";

           connection.query(queryString,[item,characterId,(index+1)],function (err,rows,fields){
             if(err)
             {
               console.log(err);
               succ = false,
               mess = "Error"

             }
             else {
               {
                 succ = false,
                 mess = "Error"
               }
             }
           });
        });

        res.json({
            sucess: succ,
            message: mess
        });


    });

    //Update amounts of useritems
    apiRoutes.post('/character/updateMonster',function (req,res) {
        var characterId = req.decoded.characterId;
        var attack1 = req.body.attack1;
        var attack2 = req.body.attack2;
        var attack3 = req.body.attack3;
        var attack4 = req.body.attack4;
        var level = req.body.level;
        var slot = req.body.slot;
        var hp = req.body.hp;
        var mana = req.body.mana;
        var attack = req.body.attack;
        var defense = req.body.defense;
        var maxMana = req.body.maxMana;
        var maxHp = req.body.maxHp;
        var speed = req.body.speed;
        var xp = req.body.xp;
        var id = req.body.id;
        var monsterId = req.body.monsterId;

        console.log(req.body);

        console.log("Inne");

        var succ = true;
        var mess = "Monster updated";

        var queryString = 'UPDATE' +
         "`Pallettown`.`CharactersMonster` SET `monsterId`=?, `attackId1`=?, `attackId2`=?, `attackId3`=?, `attackId4`=?, `level`=?, `slotNr`=?, `health`=?,`mana`=?, `speed`=?, `attack`=?, `defense`=?, `maxMana`=?, `maxHealth`=?,`exp`=? WHERE `id`=?;";

         connection.query(queryString,[monsterId,attack1, attack2, attack3, attack4, level, slot, hp, mana, speed, attack, defense, maxMana, maxHp, xp, id],function (err,rows,fields){
           if(err)
           {
             console.log(err);
             succ = false,
             mess = "Monster update failed"

           }
           else {
             {
               succ = false,
               mess = "Monster update failed"
             }
           }
         });

      res.json({
          sucess: succ,
          message: mess
      });


    });


    //set area and cordinates for current user
    apiRoutes.post('/character/setPosition',function (req,res) {
        var characterId = req.decoded.characterId;
        var newArea = req.body.area;
        var newX = req.body.x;
        var newY = req.body.y;

        var queryString = 'UPDATE' +
         "`Pallettown`.`Character` SET `x`=?, `y`=?, `areaId`= ? WHERE `id`=?;";

         connection.query(queryString,[newX,newY,newArea,characterId],function (err,rows,fields){
           if(err)
           {
             console.log(err);
             res.json({
                 sucess: false,
                 message: "Error"
             });
           }
           else {
             {
               res.json({
                 sucess: true,
                 message: "Cordinates updated"
               });
             }
           }
         });
    });


    //Add monster to character with POST
    apiRoutes.post('/CharactersMonster/addMonster', function (req,res) {
      console.log(req.body);
        var charId = req.decoded.characterId;
        var monsterId = req.body.id;
        var attackId1 = req.body.attack1;
        var attackId2 = req.body.attack2;
        var attackId3 = req.body.attack3;
        var attackId4 = req.body.attack4;
        var level = req.body.level;
        var slotNr = req.body.slot;
        var health = req.body.hp;
        var mana = req.body.mana;
        var speed = req.body.speed;
        var attack = req.body.damage;
        var defense = req.body.defense;
        var maxMana = req.body.maxMana;
        var maxHp = req.body.maxHp;


        var queryString = "INSERT INTO " +
            "`Pallettown`.`CharactersMonster` (`characterId`,`monsterId`,`attackId1`,`attackId2`,`attackId3`,`attackId4`, `level`, `slotNr`,`health`,`mana`,`speed`,`attack`,`defense`,`maxMana`,`maxHealth`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";

            connection.query(queryString,[charId,monsterId,attackId1,attackId2,attackId3,attackId4,level,slotNr,health,mana,speed,attack,defense,maxMana,maxHp], function(err,rows,fields){
              if(err)
              {
                console.log(monsterId);
                console.log(queryString);
                console.log(err);
                res.json({
                    sucess: false,
                    message: "Error"
                });
              }
              else {
                {
                  res.json({
                    sucess: true,
                    message: "Monster Added",
                    id: rows.insertId
                  });
                }
              }
            });
    });
};
