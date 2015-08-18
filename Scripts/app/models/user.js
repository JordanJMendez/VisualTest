


define([
    'jquery',
    'backbone',
    'backbone.epoxy',
    'moment',
    'config'
], function ($, Backbone, Epoxy, Moment, Config) {

    return Epoxy.Model.extend({

        hasChangedSinceLastSync: false,

        idAttribute: 'PERSON_ID',

        urlRoot: function () {
            return Config.API + '/People';
        },

        initialize: function () {
            // If you extend this model, make sure to call this initialize method
            // or add the following line to the extended model as well
            this.listenTo(this, 'change', this.modelChanged);
        },

        modelChanged: function () {
            this.hasChangedSinceLastSync = true;
        },

        defaults: {
            "BEEPER_NUM": null,
            "BEEPER_EXT": null,
            "CELLPHONE_NUM": null,
            "CELLPHONE_EXT": null,
            "EMAIL": null,
            "FAX_NUM": null,
            "FAX_EXT": null,
            "FNAME": "",
            "HIRE_DATE": "1901-01-01T00:00:00",
            "LNAME": "",
            "MI": "",
            "PHONE_NUM": "",
            "PHONE_EXT": null,
            "TERM_DATE": "1901-01-01T00:00:00",
            "USERNAME": "",
            "ACTIVE": true,
            "IS_USER": false,
//            "LOCATION_ID": null,
//           "LOCATION": null,
            "TITLE": ""
        },

        sync: function(method, model, options) {
            options = options || {};
            var success = options.success;
            options.success = function(resp) {
                success && success(resp);
                model.hasChangedSinceLastSync = false;
            };
            return Backbone.sync(method, model, options);
        },

        computeds: {
            hireDate: {
                get: function () {
                    return moment(this.get('HIRE_DATE')).format('MM/DD/YYYY');
                },
                set: function (value) {
                    this.set('HIRE_DATE', moment(value, "MM/DD/YYYY").format());
                }
            },
            termDate: {
                get: function () {
                    return moment(this.get('TERM_DATE')).format('MM/DD/YYYY');
                },
                set: function (value) {
                    this.set('TERM_DATE', moment(value, "MM/DD/YYYY").format());
                }
            }
        }

    });
});
