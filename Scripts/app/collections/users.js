

define([
    'jquery',
    'backbone',
    'config',
    'Scripts/app/models/user'
], function ($, Backbone, Config, UserModel) {

    return Backbone.Collection.extend({
        model: UserModel,

        url: function(){
            return Config.API + '/People';
        }
    });
});
