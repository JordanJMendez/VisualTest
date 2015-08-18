

define([
    'jquery',
    'backbone',
    'config',
    'Scripts/app/models/project'
], function ($, Backbone, Config, Model) {

    return Backbone.Collection.extend({
        model: Model,

        url: function(){
            return Config.API + '/Persons/' + this.models[0].get("id") + "?approvals=" + this.models[0].get("type");
        }
    });
});
