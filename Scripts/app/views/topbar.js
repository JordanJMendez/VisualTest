

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'backbone.radio'
], function ($, _, Backbone, Marionette, Radio) {

    var topBarView = Marionette.LayoutView.extend({
        el: "#navbar-top-herent",
        template: false,
        navChannel: Radio.channel('navigation'),

        events: {
            //'click #broadcast-view-link': 'onAdminViewTap',
        },

        initialize: function () {
            // TODO: For some reason click # ...-view-link' does not work
            $('#broadcast-view-link').click(this.onBroadcastViewTap);
            $('#project-view-link').click(this.onProjectViewTap);
            $('#admin-view-link').click(this.onAdminViewTap);
        },

        onBroadcastViewTap: function (event) {
            Radio.trigger('navigation', 'show:broadcast');
        },

        onProjectViewTap: function (event) {
            Radio.trigger('navigation', 'show:projects');
        },

        onAdminViewTap: function (event) {
            Radio.trigger('navigation', 'show:admin');
        }

    });

    return topBarView;
});
