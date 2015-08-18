

define([
    'jquery',
    'backbone',
    'config',
    'Scripts/app/models/billunit'
], function ($, Backbone, Config, BillUnitModel) {

    return Backbone.Collection.extend({
        model: BillUnitModel,

        url: function () {
            return Config.API + '/BillUnits';
        }
    });
});
