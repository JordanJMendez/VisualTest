

define([
    'underscore',
    'marionette',
    'text!../../templates/projects/projects.html',
    'Scripts/app/views/projects/projects-list',
    'Scripts/app/views/projects/projects-details',
    'Scripts/app/views/projects/projects-add',
    'Scripts/app/collections/projects',
], function (_, Marionette, PrjTpl, ProjectListView, ProjectDetailView, ProjecAddView, ProjectCollection) {

    var view = Marionette.LayoutView.extend({
        el: '#page-wrapper',
        template: _.template(PrjTpl),
        regions: {
            prjlist: '#box-project',
            prjdetails: '#body-project-res'
        },

        events: {
            "click #add-project-link" : "onAddProjectTap"  
        },

        resizeContent: function () {
            var height = ($(window).height() - 80);
            $("#page-wrapper").css({ "height": height, "min-height": height });
            $(".main-content").css({ "height": height, "min-height": height });
            $(".box-container-large").css({ "height": height - 42 });
        },

        initialize: function () {
            var me = this;
            // Retrieve Users collection
            this.collection = new ProjectCollection();
            this.collection.fetch({
                error: function () {
                    // TODO Generic Handle Errors
                    //alert("Error");
                }
            });

        },

        onRender: function () {
            var listView = new ProjectListView({
                collection: this.collection
            });

            this.getRegion('prjlist').attachView(listView);
            listView.render();
            var detailView = new ProjectDetailView();
            this.getRegion('prjdetails').attachView(detailView);
            detailView.render();

            this.resizeContent();
        },

        onAddProjectTap: function () {
            var view = new ProjecAddView();
            view.render();
        }
    });

    return view;
});
