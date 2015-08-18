
// Require.js allows us to configure shortcut alias
require.config({

    paths: {
        'jquery': '/Scripts/jquery-1.10.2.min',
        'jquery.easypiechart': '/Scripts/jquery.easypiechart',
        'jquery.gridster': '/Scripts/jquery.gridster.min',
        'bootstrap': '/Scripts/bootstrap',
        'bootstrap.datepicker': '/Scripts/bootstrap-datepicker.min',
        'underscore': '/Scripts/underscore',
        'backbone': '/Scripts/backbone',
        'marionette': '/Scripts/backbone.marionette',
        'backbone.radio': '/Scripts/backbone.radio.min',
        'backbone.epoxy': '/Scripts/backbone.epoxy',
        'radioshim': '/Scripts/backbone.radio.shim',
        'text': '/Scripts/text',
        'moment': '/Scripts/momentjs/2.9.0/moment',
        'app': '/Scripts/app/app',
        'config': '/Scripts/config'
    }

});

require([
    // Load our app module and pass it to our definition function
    'app'
], function(App){
    // The "app" dependency is passed in as "App"
    // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
    App.start();
});