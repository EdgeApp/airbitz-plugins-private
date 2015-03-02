var app = angular.module('todoicus');


var DataFactory = function() {
  // simple service to share between two controllers
  console.log('DataFactory Loaded');
  var factory = {};
  var storage_array = [];
  var idCounter = 0;

  factory.addData = function(data) {
    data.id = idCounter;
    data.created = new Date();
    
    storage_array.push(data)
    console.log('addData:');console.log(data);
    idCounter++;
  };

  factory.getStorageArray = function() {
    console.log('getStorageArray:');console.log(storage_array);
    return storage_array;
  };
  

  factory.removeData = function(id) {
    var index, text;
    for(var i=0; i<storage_array.length; i++) {
      if(id === storage_array[i].id){
        index = i;
        text = storage_array[i].text
      }
    }
    console.log('INDEX OF: ' + text + ' [' + index + ']');
    storage_array.splice(index, 1);
  };
  
  factory.clearData = function() {
    storage_array.splice(0, storage_array.length);
    console.log('clearData:');console.log(storage_array);
  };


  return factory;
}

// create factory
app.factory('DataFactory', DataFactory);