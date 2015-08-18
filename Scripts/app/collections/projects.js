

define([
    'jquery',
    'backbone',
    'config',
    'Scripts/app/models/project'
], function ($, Backbone, Config, ProjectModel) {

    return Backbone.Collection.extend({
        model: ProjectModel,

        url: function(){
            return Config.API + '/Projects';
        }
    });
});
