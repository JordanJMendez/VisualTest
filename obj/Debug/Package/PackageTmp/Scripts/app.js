

define([
    'jquery',
    'underscore',
    'backbone',
    //'marionette',
    'router'
], function ($, _, Backbone, /* Marionette, */ Router) {

    var initialize = function(){
        // Pass in our Router module and call it's initialize function
        Router.initialize();

    };

    return {
        initialize: initialize
    };
});
