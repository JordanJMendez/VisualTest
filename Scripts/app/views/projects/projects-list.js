


define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'backbone.radio',
    'moment',
    'Scripts/app/collections/projects',
    'text!../../templates/projects/projects-item.html',
    'Scripts/app/views/projects/project-tasks'
], function ($, _, Backbone, Marionette, Radio, Moment, ProjectsCollection, PrjItemTpl, ProjectTasksView) {

    var ProjectItemView = Marionette.ItemView.extend({
        template: _.template(PrjItemTpl),
        navChannel: Radio.channel('navigation'),
        className: 'grid-project-item',
        tagName: 'tr',
        events: {
            'click .grid-column': 'onSelectProjectTap'
        },

        initialize: function () {
            this.model.on('change', this.render, this);

            var startDate = this.model.get("STARTDATE");
            var finishDate = this.model.get("FINISHDATE");
            this.model.attributes['START_DATE_FORMAT'] = moment(startDate).format('MM/DD/YYYY');
            this.model.attributes['FINISH_DATE_FORMAT'] = moment(finishDate).format('MM/DD/YYYY');
            var status = "NS";
            if (this.model.get("STATUS_RAG") != null) {
                status = this.model.get("STATUS_RAG");
            }
            this.model.set('IMAGE_STATUS', "/Content/images/grid-status-prj-" + status + ".png");
        },

        onSelectProjectTap: function (event) {
            Radio.trigger('navigation', 'select:project', this.model);
            var view = new ProjectTasksView();
            view.render();
        }
    });

    var ProjectListView = Marionette.CollectionView.extend({
        childView: ProjectItemView,
        el: "#container-projects-tr",
        childClass: "grid-project-item",
        initialize: function () {
            this.collection.on('update', this.render, this);
        }
    });

    return ProjectListView;
});