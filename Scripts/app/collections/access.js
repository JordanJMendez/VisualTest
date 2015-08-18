


define([
    'jquery',
    'backbone',
    'config',
    'Scripts/app/models/access'
], function ($, Backbone, Config, AccessModel) {

    return Backbone.Collection.extend({
        model: AccessModel,

        url: function () {
            return Config.API + '/Access';
        }

    });
});
