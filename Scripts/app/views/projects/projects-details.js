



define([
    'jquery',
    'jquery.easypiechart',
    'backbone',
    'backbone.radio'
], function ($, EasyPieChart, Backbone, Radio) {

    var view = Marionette.LayoutView.extend({
        el: "#box-project-res",
        template: false,

        initialize: function () {

            // Status charts
            $('#schedulestatus-chart').easyPieChart({
                easing: 'easeOutBounce',
                lineCap: 'butt',
                scaleColor: false,
                lineWidth: 6,
                rotate: 180,
                onStep: function (from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent) + "%");
                }
            });
            var chart1 = window.chart = $('#schedulestatus-chart').data('easyPieChart');
            $('#schedulestatus-chart').on('click', function () {
                chart1.update(Math.random() * 200 - 100);
            });

            $('#scopestatus-chart').easyPieChart({
                easing: 'easeOutBounce',
                lineCap: 'butt',
                barColor: '#F96E09',
                scaleColor: false,
                lineWidth: 6,
                rotate: 180,
                onStep: function (from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                }
            });
            var chart2 = window.chart = $('#scopestatus-chart').data('easyPieChart');
            $('#scopestatus-chart').on('click', function () {
                chart2.update(Math.random() * 50 - 10);
            });

            $('#teamstatus-chart').easyPieChart({
                easing: 'easeOutBounce',
                lineCap: 'butt',
                barColor: '#14EB26',
                scaleColor: false,
                lineWidth: 6,
                rotate: 180,
                onStep: function (from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                }
            });
            var chart3 = window.chart = $('#teamstatus-chart').data('easyPieChart');
            $('#teamstatus-chart').on('click', function () {
                chart3.update(Math.random() * 80 - 10);
            });


            $('#budgetstatus-chart').easyPieChart({
                easing: 'easeOutBounce',
                lineCap: 'butt',
                barColor: '#14EB26',
                scaleColor: false,
                lineWidth: 6,
                rotate: 180,
                onStep: function (from, to, percent) {
                    $(this.el).find('.percent').text("$" + Math.round(percent) * 1000);
                }
            });
            var chart4 = window.chart = $('#budgetstatus-chart').data('easyPieChart');
            $('#budgetstatus-chart').on('click', function () {
                chart4.update(Math.random() * 100);
            });

        }

    });

    return view;
});