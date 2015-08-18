

define([
    'jquery',
    'marionette',
    'backbone.radio',
    'Scripts/app/collections/billunits',
    'Scripts/app/collections/billcycles',
    'Scripts/app/collections/access',
    'Scripts/app/collections/roles'
], function ($, Marionette, Radio, BillUnitsCollection, BillCyclesCollection, AccessCollection, RolesCollection) {

    var provider = Marionette.Object.extend({
        resChannel: Radio.channel('resources'),

        initialize: function (options) {

            // Retrieve common data used by multiple views
            var billUnitsColl = new BillUnitsCollection();
            billUnitsColl.fetch();
            this.resChannel.reply('billunits', function () {
                return billUnitsColl;
            });
            var billCyclesColl = new BillCyclesCollection();
            billCyclesColl.fetch();
            this.resChannel.reply('billcycles', function () {
                return billCyclesColl;
            });
            var accessColl = new AccessCollection();
            accessColl.fetch();
            this.resChannel.reply('useraccess', function () {
                return accessColl;
            });
            var rolesColl = new RolesCollection();
            rolesColl.fetch();
            this.resChannel.reply('roles', function () {
                return rolesColl;
            });
        }
    });
    return provider;

});