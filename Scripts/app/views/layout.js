

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'Scripts/app/providers',
    'Scripts/app/views/topbar',
    'Scripts/app/views/sidebar',
    'Scripts/app/views/content'
], function ($, _, Backbone, Marionette, ResProvider, TopBarView, SideBarView, ContentView) {

    return Marionette.LayoutView.extend({
        el: '#wrapper',
        template: false,
        regions: {
            topbar: '.navbar-top-herent',
            sidebar: '.sidebar-herent',
            content: '#body-wapper'
        },

        initialize: function () {
            var provider = new ResProvider();

            this.getRegion('topbar').attachView(new TopBarView());
            this.getRegion('sidebar').attachView(new SideBarView());
            this.getRegion('content').attachView(new ContentView());
        }

    });

});