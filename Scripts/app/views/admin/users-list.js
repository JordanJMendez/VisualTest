
define([
    'jquery',
    'underscore',
    'backbone',
    'backbone.radio',
    'marionette',
    'Scripts/app/collections/users',
    "text!../../templates/admin/users.html"
], function ($, _, Backbone, Radio, Marionette, UsersCollection, UsersTpl) {

    var userItemView = Marionette.ItemView.extend({
        template: _.template(UsersTpl),
        className: 'grid-user-item',
        tagName: 'tr',
        navChannel: Radio.channel('navigation'),

        events: {
            'click .grid-column': 'onSelectUserTap'
        },

        initialize: function () {
            this.model.on('change', this.render, this);
            if (this.selected) {
                this.className += " grid-item-selected";
                this.selectUser();
            }
        },

        onSelectUserTap: function (event) {
            $('.grid-item-selected').removeClass('grid-item-selected');
            $(event.currentTarget).parent().addClass('grid-item-selected');
            Radio.trigger('navigation', 'select:user', this.model);
        }
    });

    var userListView = Marionette.CollectionView.extend({
        childView: userItemView,
        el: "#container-users-tbody",
        childClass: "grid-user-item",
        initialize: function () {
            //this.collection.on('update', this.render, this);
            //if (this.collection.length > 0) {
            //    Radio.trigger('navigation', 'select:user', this.collection.at(0));
           // }
        },
        childViewOptions: function (model, index) {
            return {
                className: index == 0 ? ' grid-user-item grid-item-selected' : 'grid-user-item'
            }
        }
    });

    return userListView;
});