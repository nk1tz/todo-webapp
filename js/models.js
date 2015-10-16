var API_URL = "https://todo-backend-nk1tz.c9.io/api";
var Backbone = require('backbone');
var _ = require('underscore');


var todoModel = Backbone.Model.extend({
    defaults: {
        id: null,
        name: null,
        description: null,
        urgent: false,
        important: false,
        createdOn: new Date(),
        deadline: null,
    }
});

var todoCollection = Backbone.Collection.extend({
    url: API_URL + '/todos',
    model: todoModel,
    
});


module.exports = {
    
    todoModel: todoModel,
    todoCollection: todoCollection
    
};