

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'backbone.radio',
    'Scripts/app/views/broadcast',
    'Scripts/app/views/projects/projects',
    'Scripts/app/views/admin/admin'
], function ($, _, Backbone, Marionette, Radio, BroadCastView, ProjectsView, AdminView) {

    var contentView = Marionette.LayoutView.extend({
        el: '#main-content',
        template: false,
        navChannel: Radio.channel('navigation'),
        broadCastView: null,
        projectsView: null,
        adminView: null,
        regions: {
        },

        initialize: function() {
            this.listenTo(this.navChannel, 'show:broadcast', this.showBroadCast);
            this.listenTo(this.navChannel, 'show:projects', this.showProjects);
            this.listenTo(this.navChannel, 'show:admin', this.showAdmin);

            Radio.trigger('navigation', 'show:broadcast');
        },

        showBroadCast: function () {
            if (this.broadCastView==null) {
                this.broadCastView = new BroadCastView();
            }
            this.broadCastView.render();
        },

        showProjects: function () {
            if (this.projectsView==null) {
                this.projectsView = new ProjectsView();
            }
            this.projectsView.render();
        },

        showAdmin: function () {
            if (this.adminView == null) {
                this.adminView = new AdminView();
            }
            this.adminView.render();
            //this.adminView.selectDefaultUser();
        }
    });

    return contentView;
}); 