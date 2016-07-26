var router = require('express').Router();
var Grocery = require('../models/grocery');

//get route to retrieve all of the items from the database
router.get('/getGroceries', function(request, response){
  Grocery.find({}, function(err, groceries){
    if(err){
      console.log(err);
      response.sendStatus(500);
    }
    else{
      response.send(groceries);
    }
  });
});

//route to add an item to the database
router.post('/addGroceryItem', function(request, response){
  console.log('adding item');
  var data = request.body;

  var addedGroceryItem = new Grocery ({
    name: data.name,
    quantity: data.quantity,
    edit: true
  });

  addedGroceryItem.save(function(err){
    if(err){
      console.log(err);
    }
  });

//first grocery item to initilialize the database
  // Grocery.create({
  //   name: 'Banana',
  //   quantity: 2
  // }, function(err){
  //   if(err){
  //     console.log(err);
  //   }
  //   else{
  //     console.log('great success');
  //   }
  // });
  response.sendStatus(200);
});

//route to remove an item based on the id.
router.delete('/removeItem/:id', function(request, response){
  var id = request.params.id;
  console.log(id);
  Grocery.findByIdAndRemove(id, function(err){
    if(err){
      console.log(err);
      response.sendStatus(500);
    }
    else{
      console.log('Item Deleted');
      response.sendStatus(200);
    }
  });
});

//route to change an item based on the id, changing the only options of name or
//quantity, which are being set from a object
router.put('/updateItem/:id/:name/:quantity', function(request, response){
  var id = request.params.id;
  var name = request.params.name;
  var quantity = request.params.quantity;
  // var grocer = {name: request.params.name, quantity: request.params.quantity};
  // var grocery = {_id: id, name: name, quantity: quantity, edit: true};
  console.log(id, name, quantity);

//finds the item in the db based on item and uses the params to set the new values
  Grocery.findByIdAndUpdate(id, {$set:{name: request.params.name, quantity: request.params.quantity}}, function(err){
    if(err){
      console.log(err);
      response.sendStatus(500);
    }
    else{
      console.log('Updated');
      response.sendStatus(200);
    }
  });
});

module.exports = router;
