/*
*
* Bigpipe JS
* https://github.com/adonescunha/bigpipe
*
* Licensed under the MIT license:
* http://www.opensource.org/licenses/mit-license
* Copyright (c) 2011 Orygens contato@orygens.com
*
*/

(function($) {

    $.widget("bigpipe.Pagelet", {

        options: {
            id: "",
            content: null,
            url: null,
            css: [],
            js: []
        },

        _create: function() {
            this.element.bind("loadCSS.BigPipe", $.proxy(this._loadCSS, this));
            this.element.bind("loadContent.BigPipe", $.proxy(this._loadContent, this));
            this.element.bind("loadJS.BigPipe", $.proxy(this._loadJS, this));
        },

        _loadCSS: function() {
            $.each(this.options.css, $.proxy(function(cssFile) {
                this.element.trigger("loadCSSResource", cssFile);
            }, this));

            this.element.trigger("cssLoaded");
        },

        _loadContent: function() {
            var loadContent = function(content) {
                this.element.find("#" + this.options.id).html(content);
                this.element.trigger("contentLoaded");
            }

            if (this.options.content) {
                loadContent(this.options.content);
            } else if (this.options.url) {
                $.ajax({
                    url: this.options.url,
                    success: $.proxy(loadContent, this)
                });
            }
        },

        _loadJS: function() {
            $.each(this.options.js, $.proxy(function(jsFile) {
                this.element.trigger("loadJSResource", jsFile);
            }, this));

            this.element.trigger("jsLoaded");
        }

    });

})(jQuery);
