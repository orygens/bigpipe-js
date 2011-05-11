/*
*
* Bigpipe JS
* https://github.com/adonescunha/bigpipe
*
* Licensed under the MIT license:
* http://www.opensource.org/licenses/mit-license
* Copyright (c) 2011 Adones Cunha adones@atepassar.com
*
*/

var PageletResource = function(name, pagelet) {
  var that = {};
  that.name = name;
  that.pagelet = pagelet;
  that.phase = 0;

  return that;
};

var CSSResource = function(name, pagelet) {
  var that = PageletResource(name, pagelet);

  that.load = function() {
    if (this.phase != 0) {
      return;
    }

    BigPipe.debug('Pagelet ' + this.pagelet.id +
        ' CSS resource started to load: ' + this.name);

    var $link = $(document.createElement('link'));
    $link.attr('rel', 'stylesheet')
      .attr('type', 'text/css')
      .attr('href', this.name);
    $('head').append($link);
    this.phase = 1;
    that.pagelet.onCSSLoad(this);
  };

  return that;
};

var JSResource = function(name, pagelet) {
  var that = PageletResource(name, pagelet);

  that.load = function() {
    if (this.phase != 0) {
      return;
    }

    BigPipe.debug('Pagelet ' + this.pagelet.id +
        ' JS resource started to load: ' + this.name);

    var $script = $(document.createElement('script'));
    $script.attr('type', 'text/javascript').attr('src', this.name);
    $('head').append($script);
    that.pagelet.onJSLoad(this);
  };

  return that;
};

var Pagelet = function(id, cssResources, jsResources, html) {
  var that = {};

  that.id = id;
  that.cssResources = cssResources.map(function(e) {
    return CSSResource(e, that);
  });
  that.jsResources = jsResources.map(function(e) {
    return JSResource(e, that);
  });
  that.html = html;

  that.start = function() {
    for each (var css in this.cssResources) {
      this.phase = 1;
      css.load();
    }

    if (this.phase == 0) {
      this.injectHTML();
    }
  };

  that.injectHTML = function() {
    this.phase = 2;
    $('#' + this.id).html(this.html);
    this.phase = 3;
    BigPipe.pageletHTMLInjected(this);
  };

  that.onCSSLoad = function(css) {
    if (css.phase == 2) {
      return;
    }

    BigPipe.debug('Pagelet ' + this.id + ' CSS resource is loaded: ' + css.name);

    css.phase = 2;

    var allLoaded = this.cssResources.reduce(function(a, b) {
      return a && b.phase == 2;
    }, true);

    if (!allLoaded) {
      return;
    }

    BigPipe.debug('Pagelet ' + this.id + ': All CSS resources are loaded');
    this.injectHTML();
  };

  that.onJSLoad = function(js) {
    if (js != undefined) {
      BigPipe.debug('Pagelet ' + this.id + ' JS resource is loaded: ' + js.name);
    }

    if (this.phase > 3) {
      return;
    }

    js.phase = 2;

    var allLoaded = this.jsResources.reduce(function(a, b) {
      return a && b.phase == 2;
    }, true);

    if (!allLoaded) {
      return;
    }

    if (this.jsResources > 0) {
      BigPipe.debug('Pagelet ' + this.id + ': All JS resources are loaded');
    }

    this.phase = 4;
  };

  return that;
};

var BigPipe = {
  pagelets: [],
  phase: 0,

  debug: function(msg) {
    if (typeof console != undefined && typeof console.log != undefined) {
      console.log(msg);
    }
  },

  onPageletArrive: function(json) {
    this.debug('Pagelet arrived: ' + json);

    if (json.isLast != undefined && json.isLast) {
      this.phase = 1;
    }

    var pagelet = Pagelet(json.id, json.css, json.js, json.content);
    this.pagelets.push(pagelet);
    pagelet.start();
  },

  pageletHTMLInjected: function(pagelet) {
    this.debug('Pagelet HTML injected: ' + pagelet.id);

    var allLoaded = this.pagelets.reduce(function(a, b) {
      return a && b.phase >= 3;
    }, true);

    if (!allLoaded) {
      return;
    }

    if (this.phase == 1) {
      this.loadJSResources();
    }
  },

  loadJSResources: function() {
    this.debug('Starting to load JS resources...');

    this.phase = 2;
    var something_loaded = false;

    for each (var pagelet in this.pagelets) {
      for each (var js in pagelet.jsResources) {
        something_loaded = true;
        js.load();
      }

      if (pagelet.jsResources.length == 0) {
        pagelet.onJSLoad();
      }
    }

    if (!something_loaded) {
      this.debug('No JS resources to load.');
    }
  },
};

