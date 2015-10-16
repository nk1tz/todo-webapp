var API_URL = "https://todo-backend-nk1tz.c9.io/api";
var Backbone = require('backbone');
// var _ = require('underscore');


var TodoModel = Backbone.Model.extend({
    // defaults: {
    //     id: null,
    //     name: null,
    //     description: null,
    //     urgent: false,
    //     important: false,
    //     createdOn: new Date(),
    //     deadline: null,
    // }
    urlRoot: API_URL + '/Todos',
});

var TodoCollection = Backbone.Collection.extend({
    url: API_URL + '/Todos',
    model: TodoModel,
});


module.exports = {
    TodoModel: TodoModel,
    TodoCollection: TodoCollection
};