


define([
    'jquery',
    'underscore',    
    'backbone',
    'marionette',
    'backbone.epoxy',
    'backbone.radio',
    'moment',
    'Scripts/app/models/resource',
    'Scripts/app/collections/teams',
    'Scripts/app/views/base-layout-view',
    'Scripts/app/views/admin/users-detail-info',
    'Scripts/app/views/admin/users-detail-roles',
    'Scripts/app/views/admin/users-detail-access',
    'Scripts/app/views/admin/users-detail-teams',
    'Scripts/app/views/admin/wait-view',
    'text!../../templates/admin/user-details.html'
], function ($, _, Backbone, Marionette, Epoxy, Radio, Moment, 
    ResourceModel, TeamsCollection, BaseLayoutView,
    UserInfoView, UserRolesView, UserAccessView, UserTeamsView, WaitView,
    UserDetailsTpl) {

    var UserViewModel = Epoxy.Model.extend({
        defaults: {
            modelDirty: false,
            resDirty: false
        },
        computeds: {
            saveEnabled: function () {
                return this.get("resDirty") || this.get("modelDirty");
            }
        }
    });

    var details = Marionette.LayoutView.extend({
        id: "user-details-content",
        template: _.template(UserDetailsTpl),
        tagName: "div",
        className: 'box-large',

        regions: {
            info:   '#info-tab',
            roles:  '#roles-tab',
            teams:  '#teams-tab',
            access: '#access-tab'
            //modal: {
            //    selector: "#modal",
            //    regionClass: ModalRegion
            //}
        },

        events: {
            'click #save-user': 'onSaveUser',
            'click .tab-height': 'onChangeTab'
        },

        initialize: function (options) {
            var me = this;

            //this.addRegion('modal', new ModalRegion());

            this.model.on('change', this.enableSave, this.model);

            this.viewModel = new UserViewModel(this.model.attributes);

            if (this.model.isNew()) {
                this.initializeRolesView(new ResourceModel());
            } else {
                // Retrieve Resource item
                this.resource = new ResourceModel({ PERSON_ID: this.model.get('PERSON_ID') });
                this.resource.fetch({
                    success: function () {
                        me.initializeRolesView(me.resource);
                    },
                    error: function () {
                        //alert("Error");
                    }
                });
            }

            // Retrieve Teams
            var collection = new TeamsCollection();
            collection.fetch({
                success: function () {
                    var viewTeams = new UserTeamsView({
                        model: collection
                    });
                    me.getRegion('teams').attachView(viewTeams);
                    viewTeams.render();
                },
                error: function () {
                    // TODO Generic Handle Errors
                    //alert("Error");
                }
            });
        },

        initializeRolesView: function (resource) {
            this.resource = resource;
            var viewRoles = new UserRolesView({
                model: resource
            });
            this.getRegion('roles').attachView(viewRoles);
            viewRoles.render();
            // Listen for modifications
            this.resource.on('change', this.enableSave, resource);
            //if (!this.model.hasChangedSinceLastSync && !resource.hasChangedSinceLastSync) {
                $('#save-user').hide();
            //}

        },

        resizeContent: function () {
            var heightTab = $('#box-admin-res-content').height() - 42 - 15 -
                            $('.box-side-content .nav-tabs').height();
            $(".tab-content-admin").css({ "height": heightTab });
        },

        enableSave: function(model) {
            $('#save-user').show();
        },

        showWait: function () {
            var opts = {
                lines: 13 // The number of lines to draw
                , length: 28 // The length of each line
                , width: 14 // The line thickness
                , radius: 42 // The radius of the inner circle
                , scale: 1.25 // Scales overall size of the spinner
                , corners: 1 // Corner roundness (0..1)
                , color: '#000' // #rgb or #rrggbb or array of colors
                , opacity: 0.15 // Opacity of the lines
                , rotate: 0 // The rotation offset
                , direction: 1 // 1: clockwise, -1: counterclockwise
                , speed: 1 // Rounds per second
                , trail: 78 // Afterglow percentage
                , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
                , zIndex: 2e9 // The z-index (defaults to 2000000000)
                , className: 'spinner' // The CSS class to assign to the spinner
                , top: '50%' // Top position relative to parent
                , left: '50%' // Left position relative to parent
                , shadow: false // Whether to render a shadow
                , hwaccel: false // Whether to use hardware acceleration
                , position: 'absolute' // Element positioning
            }
            this.spinner = new Spinner(opts).spin($('#saving').$el);
            //$("#loading").spin({/* YOUR SPINNER OPTIONS */ }).show()();
        },
        
        hideWait: function () {
            //this.spinner.hide();
            //$("#loading").spin().hide();
            //this.getRegion('modal').hideModal();
        },

        saveSuccedded: function () {
            var closeable = $('.alert-autocloseable-success');
            closeable.show();
            closeable.delay(2000).fadeOut("slow", function () { });
        },

        onSaveUser: function () {
            var me = this;

            //this.showWait();
            //var waitView = new WaitView();
            //this.getRegion('modal').showModal(waitView);

            // TODO: Changing Hire and Term dates does not mark model as changed
            //if (this.model.hasChanged()) {
            $('#save-user').hide();
            this.model.save({ PERSON_ID: this.model.get('PERSON_ID') },
                    { success: function () {
                        me.hideWait();
                        me.saveSuccedded();
                    }, error: function () {
                        me.hideWait();
                        $('#save-user').show();
                    }
                });
            //}
            if (this.resource.hasChanged()) {
                this.resource.save({}, {
                    success: function () {
                        me.hideWait();
                        me.saveSuccedded();
                    },
                    error: function () {
                        me.hideWait();
                        $('#save-user').show();
                    }
                });
            }
        },

        onChangeTab: function (event) {
            Radio.trigger('navigation', 'select:user-tab', event.target.hash);
        },

        onRender: function () {
            var region = this.getRegion('info');
            var viewInfo = new UserInfoView({
                model: this.model
            });
            region.attachView(viewInfo);
            viewInfo.render();
            var viewAccess = new UserAccessView({
                model: this.model
            });
            this.getRegion('access').attachView(viewAccess);
            viewAccess.render();

            this.setName();

            // Hide button until model is modified 
            //if (!this.model.hasChangedSinceLastSync)
                $('#save-user').hide();

            this.resizeContent();
        },

        setName: function () {
            if (this.model != null) {
                var name = this.model.get('FULLNAME');
                $('#resource-name').html(name);
                $('.resourcesTop .media-body').html(name);
            }
        },

        close: function () {
            this.model.off('change', this.enableSave, this);

            this.stopListening();
        }

    });

    return details;

});
