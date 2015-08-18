

define([
    'jquery',
    'backbone',
    'config',
    'Scripts/app/models/billcycle'
], function ($, Backbone, Config, BillCycleModel) {

    return Backbone.Collection.extend({
        model: BillCycleModel,

        url: function () {
            return Config.API + '/BillCycles';
        }
    });
});
