angular.module('groceryApp', []);

angular.module('groceryApp').controller('MainController', function($http){
  var vm = this;
  // vm.groceries.edit = true;
  // vm.groceries.edit = true;

//used to get the grocery list
  vm.getGroceryList = function(){
    $http.get('/grocery/getGroceries').then(function(response){
      vm.groceries = response.data;
      vm.groceries.edit = true;
    }, function(response){
      console.log('Your grocery list is full of junk (food and coding),', response);
    });
  };

//used to add an item and using the text input to add the item
  vm.addGroceryItem = function(){
    console.log('clicked');
    var groceryData = {};

    groceryData.name = vm.name;
    groceryData.quantity = vm.quantity;
    // groceryData.edit = true;
    console.log(groceryData);

    $http.post('/grocery/addGroceryItem', groceryData).then(function(response){
      console.log(response);
      vm.getGroceryList();
    }, function(response){
      console.log('You have to add more than just candy to your list,', response);
    });
  };

//uses the item id which is being sent from the dom to remove an item
  vm.removeItem = function(itemId){
    console.log(itemId);
    $http.delete('/grocery/removeItem/' + itemId).then(function(response){
      console.log(response);
      vm.getGroceryList();
    }, function(response){
      console.log('Don\'t delete your vegetables!!', response);
    });
  };

//uses an id to and the text input fields of name and quantity to update an item
  vm.updateItem = function(index, itemId, name, quantity){
    console.log(itemId, name, quantity);
    $http.put('/grocery/updateItem/' + itemId + '/' + name + '/' + quantity).then(function(response){
      console.log(response);
      vm.getGroceryList();
    }, function(response){
      console.log('Why only more sweets? Try again.', response);
    });
  };

//changes the show/hide in order to be able to update that specific item
  vm.editItem = function(index){
    // console.log(index);
    vm.groceries[index].edit = !vm.groceries[index].edit;
    // console.log(vm.groceries[index].edit);
  };


  vm.getGroceryList();


});
