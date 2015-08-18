



define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'backbone.radio'
], function ($, _, Backbone, Marionette, Radio) {

    var sideBarView = Marionette.LayoutView.extend({
        el: ".sidebar-herent",
        template: false,
        widgetChannel: Radio.channel('widgets'),
        events: {
            'click .widget-menu-item': 'onOpenWidget',
            'click #financial-view': 'onBoxDiscussionClicked'
        },

        initialize: function () {
            this.listenTo(this.widgetChannel, 'close:widget', this.onCloseWidget);
        },

        onCloseWidget: function (widget) {
            $(widget + "-menu").removeClass("box-opened");
        },

        onOpenWidget: function (event) {
            var widget = "#" + $(event.currentTarget).data("widget");

            if ($(widget).is(":visible"))
                return;
            Radio.trigger("widgets", "open:widget", widget);

            $(widget).attr("visibility", "visible");
            $(widget + "-menu").addClass("box-opened");
        },

        onBoxDiscussionClicked: function (event) {
            Radio.trigger("navigation", "select:newuser");
        }

    });

    return sideBarView;
});

