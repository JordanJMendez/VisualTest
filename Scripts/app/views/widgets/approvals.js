


define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'backbone.radio',
    'Scripts/app/collections/widgets/approvals',
    'Scripts/app/views/widgets/approvals',
    "text!../../templates/widgets/approvals.html",
    "text!../../templates/widgets/approvals-project.html"
], function ($, _, Backbone, Marionette, Radio, ApprovalsCollection, WidgetApprovalsView, ApprovalsTpl, ApprovalsPrjTpl) {

    var appItemView = Marionette.ItemView.extend({
        template: _.template(ApprovalsPrjTpl),
        className: 'box-item',
        navChannel: Radio.channel('navigation'),
        tagName: 'li',

        events: {
        },

        serializeData: function () {
            // TODO: Check status icon for this widget
            var imageStatus = "check";
            var status = this.model.get("STATUS_RAG");
            if (status != "C" && status != "G") {
                imageStatus = "close";
            }
            var image = "/Content/images/image-" + imageStatus + ".png";

            return {
                "DESCRIPTION": this.model.get("P_NAME"),
                "NAME": this.model.get("T_NAME"),
                "IMAGE_STATUS": image
            }
        },

        initialize: function () {
            this.model.on('change', this.render, this);
        }

    });

    var appListView = Marionette.CollectionView.extend({
        template: _.template(ApprovalsTpl),
        childView: appItemView,
        initialize: function () {
            this.collection.on('update', this.render, this);
        }
    });

    var view = Marionette.LayoutView.extend({
        el: '#box-approvals',
        template: false,
        navChannel: Radio.channel('navigation'),

        events: {
            "click .box-btn-resize": 'onResizeWidget',
            "click .box-btn-close": 'onCloseWidget',
            "click .box-btn-min": 'onMinimizeWidget'
    },

        regions: {
            approved: "#projects-approved-container",
            pending: "#projects-awaiting-container"
        },

        initialize: function () {
            this.showCollectionInRegion("approved", "56", "APPROVED", "#projects-approved-container");
            this.showCollectionInRegion("pending", "56", "PENDING", "#projects-awaiting-container");
        },

        onResizeWidget: function (event) {
            var widget = "#" + $(event.currentTarget).data("widget");
            Radio.trigger("widgets", 'resize:widget', widget);
        },

        onCloseWidget: function (event) {
            var widget = "#" + $(event.currentTarget).data("widget");
            Radio.trigger("widgets", 'close:widget', widget);
        },

        onMinimizeWidget: function (event) {
            var widget = "#" + $(event.currentTarget).data("widget");
            Radio.trigger("widgets", 'minimize:widget', widget);
        },

        showCollectionInRegion: function (region, person, type, selector) {
            var me = this;

            var collection = new ApprovalsCollection({
                "id": person, 
                "type": type
                });
            collection.fetch({
                success: function () {
                    var approvalsView = new appListView({
                        collection: collection,
                        el: selector,
                    });
                    me.getRegion(region).attachView(approvalsView);
                    approvalsView.render();
                },
                error: function () {
                    // TODO Generic Handle Errors
                    //alert("Error");
                }
            });
        }

    });


    return view;
});