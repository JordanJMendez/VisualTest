

define([
    'jquery',
    'jquery.gridster',
    'underscore',
    'backbone',
    'marionette',
    'backbone.radio',
    'Scripts/app/views/widgets/approvals'
], function ($, Gridster, _, Backbone, Marionette, Radio, WidgetApprovalsView) {

    var view = Marionette.LayoutView.extend({
        el: '#page-wrapper',
        template: false,
        widgetChannel: Radio.channel('widgets'),
        gridster: null,

        events: {
            "click .navbar-top-links li .main-link": "onMenuLinkSelected"
        },

        regions: {
            "widgets": "#box-group-multiple",
            "widget-max": "#box-group-single"
        },

        initialize: function () {
            //var width = ($(window).width() - 115) / 3;
            //var height = ($(window).height() - 85) / 2;

            //this.gridster = $(".gridster").gridster({
            //    widget_margins: [2, 2],
            //    widget_base_dimensions: [width, height],
            //    widget_selector: ".box",
            //    max_cols: 3,
            //    min_cols: 3
            //}).data('gridster');

            //// Update Height of box-content
            //$(".box-container").css({ "height": height - 40 });
            //$(".box-container-large").css({ "height": (2 * height) - 40 });
            //$("#page-wrapper").css({ "min-height": height, "max-height": height });

            //var widgets = [
            //          [$('#box-todo').prop('outerHTML'), 1, 1, 1, 1],
            //          [$('#box-issues').prop('outerHTML'), 1, 1, 2, 1],
            //          [$('#box-approvals').prop('outerHTML'), 1, 1, 2, 2],
            //          [$('#box-overdue').prop('outerHTML'), 1, 1, 1, 2],
            //          [$('#box-activity').prop('outerHTML'), 1, 2, 3, 1]
            //];

            //if (gridster != null) {
            //    $.each(widgets, function (i, widget) {
            //        gridster.add_widget.apply(gridster, widget)
            //    });
            //}

            var approvalsView = new WidgetApprovalsView();
            approvalsView.render();

            this.listenTo(this.widgetChannel, 'resize:widget', this.onResizeWidget);
            this.listenTo(this.widgetChannel, 'close:widget', this.onCloseWidget);
            this.listenTo(this.widgetChannel, 'minimize:widget', this.onMinimizeWidget);
            this.listenTo(this.widgetChannel, 'open:widget', this.onOpenWidget);

            $('.main-link').click(this.onMenuLinkSelected);
            this.resizeContent();
        },

        resizeContent: function () {
            var height = ($(window).height() - 80);
            $("#page-wrapper").css({ "height": height, "min-height": height });
            $("#box-group-single").css({ "height": height, "min-height": height });
        },

        onResizeWidget: function (widget) {
            $(widget).attr("visibility", "visible");
            if ($(widget).hasClass("box-maximized")) {
                $('#box-group-multiple').prepend($(widget));
            } else {
                $('#box-group-single').append($(widget));
                $(widget).height($);
            }
            $(widget).toggleClass("box-maximized");
            $('#box-group-single').toggle();
            $('#box-group-multiple').toggle();
        },

        onCloseWidget: function (widget) {
            gridster.remove_widget($(widget));
        },

        onOpenWidget: function (widget) {
            gridster.add_widget($(widget).prop('outerHTML'),
                                $(widget).data('sizex'),
                                $(widget).data('sizey'),
                                $(widget).data('col'),
                                $(widget).data('row'));
        },

        onMinimizeWidget: function (widget) {
        },

        onMenuLinkSelected: function (event) {
            $('.navbar-top-links li .main-link-selected').removeClass('main-link-selected');
            $(event.target).addClass('main-link-selected');
        }
    });
    return view;
}); 