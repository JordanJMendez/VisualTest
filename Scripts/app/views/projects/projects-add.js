

define([
    'underscore',
    'bootstrap.datepicker',
    'marionette',
    'text!../../templates/projects/projects-add.html'
], function (_, DatePicker, Marionette, PrjAddTpl) {

    var view = Marionette.LayoutView.extend({
        el: '#page-wrapper',
        template: _.template(PrjAddTpl),
        regions: {
        },

        events: {
            'click .cstmDropdown': 'onOpenDropDown',
            'click .custom-dp ul li a': 'onCloseDropDown',
            'click .filterBtn': 'onFilterButton'
        },

        resizeContent: function () {
            var height = ($(window).height() - 80);
            $("#page-wrapper").css({ "height": height, "min-height": height });
            $(".main-content").css({ "height": height, "min-height": height });
            var heightTaskList = $(".main-content").height() - $("#box-add-project").height();
            $("#box-task-list").css({ "height": heightTaskList, "min-height": heightTaskList });
            $("#task-list-table").css({ "height": heightTaskList-42, "min-height": heightTaskList-42 });
            $(".box-container-large").css({ "height": height - 42 });
            //var heightPrjCount = $(".project-count-outer").height() - $(".project-count-head").height() - $(".project-count-bot").height() - 42;
            var heightPrjCount = $(".project-count-outer").height() - 77 - 32 - 42 - 48;
            $(".project-count").css({ "height": heightPrjCount / 2, "min-height": heightPrjCount / 2 });
        },

        onRender: function() {
            // Datepicker //
            $('#startDate').datepicker({
                format: 'mm/dd/yyyy'
            }).on('changeDate', function (e) {
                // Revalidate the date field
                $('#eventForm').formValidation('revalidateField', 'date');
            });

            $('#endDate').datepicker({
                format: 'mm/dd/yyyy'
            }).on('changeDate', function (e) {
                // Revalidate the date field
                $('#eventForm').formValidation('revalidateField', 'date');
            });
            this.resizeContent();
        },

        enableDropDownEvents: function () {
            $('.cstmDropdown').click(this.openDropDown);
            $('.custom-dp ul li a').click(this.closeDropDown);
            $('.filterBtn').click(function () {
                $('body').toggleClass('filter-dropdown-open')
                $(this).toggleClass('cross-icon')
            });
        },

        onOpenDropDown: function (event) {
            // TODO: Enable this and remove from custom.js
            $(event.target).parent().addClass('open-select');
        },

        onCloseDropDown: function (event) {
            // TODO: Enable this and remove from custom.js
            $('.cate-sec').removeClass('open-select');
        },

        onFilterButton: function () {
            $('body').toggleClass('filter-dropdown-open')
            $(this).toggleClass('cross-icon')
        }
    });

    return view;
});