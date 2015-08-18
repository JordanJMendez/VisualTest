

define([
    'underscore',
    'backbone.radio',
    'marionette',
    'bootstrap',
    'Scripts/app/models/user',
    'Scripts/app/views/admin/users-list',
    'Scripts/app/views/admin/users-detail',
    'Scripts/app/collections/users',
    'text!../../templates/admin/admin.html'
], function (_, Radio, Marionette, BootStrap, UserModel, UserListView, UserDetailView, UsersCollection, AdminTpl) {

    var adminView = Marionette.LayoutView.extend({
        el: '#page-wrapper',
        template: _.template(AdminTpl),
        navChannel: Radio.channel('navigation'),
        currentTab: '#info-tab',

        regions: {
            userlist: '#box-admin',
            userdetails: '#box-admin-res'
        },

        events: {
            'click #user-filter-list': 'onFilterSelected',
            'keyup #user-filter-text': 'onFilterUsers'
        },

        resizeContent: function() {
            var height = ($(window).height() - 80);
            $("#page-wrapper").css({ "height": height, "min-height": height });
            $(".main-content").css({ "height": height, "min-height": height });
            $(".box-container-large").css({ "height": height - 42 });
        },

        initialize: function () {
            this.listenTo(this.navChannel, 'select:user-tab', this.adminTabSelected);
            this.listenTo(this.navChannel, 'select:user', this.showUserDetails);
            this.listenTo(this.navChannel, 'select:newuser', this.onNewUser);

            this.collection = new UsersCollection();

            // Retrieve Users collection
            this.retrieveFullCollection();
        },

        retrieveFullCollection: function() {
            var me = this;

            this.fullcollection = new UsersCollection();
            this.fullcollection.fetch({
                success: function () {
                    me.onFilterUsers();
                    //me.selectDefaultUser();
                },
                error: function () {
                    // TODO Generic Handle Errors
                    //alert("Error");
                }
            });
            //this.collection.on('reset', this.render);
        },

        showUserDetails: function (model) {
            var view = new UserDetailView({ model: model });
            this.getRegion('userdetails').show(view, {preventDestroy: true});
            view.render();
            // Switch to last selected tab
            $('.nav-tabs a[href="' + this.currentTab + '"]').tab('show');
        },

        onNewUser: function () {
            this.showUserDetails(new UserModel());
        },

        selectDefaultUser: function() {
            if (this.collection.length > 0) {
                this.showUserDetails(this.collection.at(0));
            }
        },

        onRender: function () {
            var region = this.getRegion('userlist');
            var listView = new UserListView({
                collection: this.collection
            });
            region.attachView(listView);
            listView.render();

            this.selectDefaultUser();

            this.resizeContent();
        },

        adminTabSelected: function (tabId) {
            this.currentTab = tabId;
        },

        onFilterSelected: function (event) {
            //$('#user-filter-text').val("");
            $('.search-bar').toggleClass('search-bar-open');
        },

        onFilterUsers: function () {
            var filterText = $('#user-filter-text').val();
            if (filterText.length > 0) {
                filteredCollection = this.fullcollection.filter(function (model) {
                    return (model.get('FULLNAME').indexOf(filterText) > -1) ||
                           (model.get('USERNAME').indexOf(filterText) > -1);
                });
            } else {
                filteredCollection = this.fullcollection.models;
            }
            this.collection.reset(filteredCollection);
            this.selectDefaultUser();
        }

    });

    return adminView;
});