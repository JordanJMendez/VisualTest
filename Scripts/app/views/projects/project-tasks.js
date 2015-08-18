

define([
    'underscore',
    'marionette',
    'text!../../templates/projects/project-tasks.html'
], function (_, Marionette, PrjTasksTpl) {

    var view = Marionette.LayoutView.extend({
        el: '#page-wrapper',
        template: _.template(PrjTasksTpl),
        regions: {
        },

        events: {
        },

        resizeContent: function () {
            var height = ($(window).height() - 80);
            $("#page-wrapper").css({ "height": height, "min-height": height });
            $(".main-content").css({ "height": height, "min-height": height });
            $(".box-container-large").css({ "height": height - 62 });
            $(".task-view-right").css({ "height": height - 62 });
            $('.task-view-right-section-content').css({ "height": $('.task-view-right-section').height() - $('.task-view-right-header').height() });
        },

        onRender: function() {
            this.resizeContent();
        }
    });

    return view;
});
