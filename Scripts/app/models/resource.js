

define([
    'jquery',
    'backbone',
    'config'
], function ($, Backbone, Config) {

    return Backbone.Model.extend({

        hasChangedSinceLastSync: false,

        idAttribute: 'PERSON_ID',

        urlRoot: function(){
            return Config.API + '/Resources';
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
            "ACTIVE_IND": true,
            "AGENCY_FEE":0,
            "AUTO_ALLOWANCE":false,
            "AUTO_ALLOWANCE_DAILY":0,
            "BILL_UNIT":1,
            "BILLING_CYCLE":2,
            "BILLING_CYCLE_OTHER":"",
            "COMMENTS":"",
            "COST_UNIT": 3,
            "BILL_RATE": 0,
            "COST_RATE": 0,
            "DAILY_BILLING_RATE": 0,
            "DAILY_FRINGES":0,
            "DAILY_HOURS":0,
            "DAILY_MEALS":0,
            "DAILY_OTHER":0,
            "DAILY_OTHER_EXPLAIN":"",
            "DAILY_WAGE":0,
            "DISCOUNT":0,
            "EMPLOYEE_DOWNTIME_FACTOR":0,
            "FLEX_EXPLAIN":"",
            "FREE_TIME_HOURS":0,
            "GROSS_MARGIN_DAILY":0,
            "GROSS_MARGIN_PERCENT":0,
            "HOUSING":false,
            "HOUSING_DAILY":0,
            "IMMIGRATION_FEE":0,
            "INCLUDE_TIME_SHEETS":false,
            "LESS_DISCOUNT":0,
            "LESS_DISCOUNT_AMT":0,
            "PERCENT_ALLOC":0,
            "PRIMARY_COST_CENTER":"",
            "PRIMARY_SKILL":1,
            "PRIMARY_SUB_TEAM":"",
            "RECRUITER_COMMISION":0,
            "REF_BONUS_AMOUNT":0,
            "REFERAL_BONUS_WHO":"",
            "RELOCATION_AMOUNT":0,
            "RESOURCE_OVERTIME_RATE":0,
            "AGENCY_FEE_B":false,
            "DISCOUNT_B":false,
            "FLEX_HOURS_B":false,
            "IMMIGRATION_FEE_B":false,
            "INCOMPLETE_INVOICE_B":false,
            "OVERTIME_BILLABLE_B":false,
            "REF_BONUS_B":false,
            "RESOURCE_AGENCY_B":false,
            "SEPARATE_INVOICE_B":false
        },

        sync: function (method, model, options) {
            options = options || {};
            var success = options.success;
            options.success = function (resp) {
                success && success(resp);
                model.hasChangedSinceLastSync = false;
            };
            return Backbone.sync(method, model, options);
        }
    });
});