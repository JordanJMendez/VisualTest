

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'radioshim',
    'backbone.radio',
    'Scripts/app/views/layout'
], function ($, _, Backbone, Marionette, Shim, Radio, RootLayoutView) {

    var AppRouter = Marionette.AppRouter.extend({

        routes: {
            // Default
            '*actions': 'defaultAction'
        },

        defaultAction: function () {
            rootView = new RootLayoutView();
            rootView.render();
        }

    });

    var app = Marionette.Application.extend({

        initialize: function (options) {
            var router = new AppRouter();
        },

        onStart: function () {
            if (Backbone.history) {
                Backbone.history.start({ pushState: true });
            }
        }
    });

    return new app();

});