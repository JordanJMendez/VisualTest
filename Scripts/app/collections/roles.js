

define([
    'jquery',
    'backbone',
    'config',
    'Scripts/app/models/role'
], function ($, Backbone, Config, RoleModel) {

    return Backbone.Collection.extend({
        model: RoleModel,

        url: function () {
            return Config.API + '/Roles';
        }

    });
});
