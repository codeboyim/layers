(function(root, factory) {
        if (typeof define === 'function' && define.amd) {
            // AMD. Register as an anonymous module.
            define(['backbone', 'underscore', 'jquery'], factory);
        } else {
            // Browser globals
            root.Layers = factory(root.Backbone, root._, root.jQuery);
        }
    }(this, function(Backbone, _, $) {
