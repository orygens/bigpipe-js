/*
*
* Bigpipe JS
* https://github.com/orygens/bigpipe-js
*
* Licensed under the MIT license:
* http://www.opensource.org/licenses/mit-license
* Copyright (c) 2011 Orygens contato@orygens.com
*
*/

(function($) {

    var pagelets = [],
        callbacks = {};

    var jQueryBigPipe = function(pagelets, callbacks) {

    };

    jQueryBigPipe.loadPagelet = function(key) {
        $.error("Not yet implemented!");
    };

    $.extend({
        bigPipe: jQueryBigPipe
    });

    $.widget("bigpipe.BigPipe", {

        options: {
            pagelets: []
        },

        _create: function() {

            this.pageletCount = this.options.pagelets.length;

            $.each(this.options.pagelets, $.proxy(function() {
                this.element.Pagelet({
                    id: this.id,
                    content: this.content,
                    css: this.css,
                    js: this.js
                });
            }, this));

            this._bindEvents();

            this.element.trigger("loadCSS");
        },

        _bindEvents: function() {
            this.element.bind("cssLoaded.BigPipe", this._afterAll(this._cssLoaded));
            this.element.bind("contentLoaded.BigPipe", this._afterAll(this._contentLoaded));
            this.element.bind("jsLoaded.BigPipe", this._afterAll(this._jsLoaded));
        },

        _afterAll: function(handler) {
            var counter = this.pageletCount;
            return $.proxy(function(ev) {
                counter -= 1;
                if (counter <= 0) {
                    handler.call(this);
                }
            }, this);
        },

        _cssLoaded: function() {
            this.element.trigger("loadContent");
        },

        _contentLoaded: function() {
            this.element.trigger("loadJS");
        },

        _jsLoaded: function() {
            this.element.trigger("onLoad");
            this.element.unbind(".BigPipe");
        }

    });

})(jQuery);
