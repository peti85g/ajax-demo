var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static(__dirname));
app.use(bodyParser.json());

var PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
    console.log('Server listening on port number: ' + PORT);
});

var stuff = [
    {
        id:1,
        name:'micro'
    },
    {
        id:2,
        name:'broom'
    }
];

 var currentId = 2;

 app.get('/stuff', function(req, res){
     res.send({stuff: stuff});
 });

 app.post('/stuff', function(req, res){
    var stuffName = req.body.name;
    currentId++;
    stuff.push({
        id: currentId,
        name: stuffName
    });
    res.send('You created stuff');
 });

 app.put('/stuff:id', function(req,res){
    var id = req.params.id;
    var found = false;
    var updatedName = req.body.updatedName;

    stuff.forEach(function(stuff, index){
        if(!found && stuff.id === Number(id)){
            stuff.name = updatedName;
        }
    });

 });

 app.delete('/stuff:id', function(req, res) {
    var id = req.params.id;

    var found = false;

    stuff.forEach(function(stuff, index) {
        if (!found && stuff.id === Number(id)) {
            stuff.splice(index, 1);
        }
    });

    res.send('Successfully deleted stuff!');
});