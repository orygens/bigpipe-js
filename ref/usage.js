var pagelets = [
    {
        key: 'else',
        container: $('div'),
        url: "/home#!pagelet=timeline", 
        css: ["/media/common.css", "/media/css/timeline.css"],
        js: ["a.js", "b.js", "c.js"],
        contentDelay: 30
    },
    {
        key: 'whatever',
        container: ".friends_box",
        content: "<div>Hello World</div>",  //Content to be placed directly in the element's innerHTML
        css: ["/media/css/friends_box.css"],
        js: ["a.js", "d.js", "e.js"],
        onContentLoaded: function() { //Markup and CSS loaded
            $.bigPipe.loadPagelet('friends_box');
        }
    },
    {
        key: 'friends_box',
        container: ".friends_box",
        url: "/home#!pagelet=timeline", 
        css: ["/media/css/friends_box.css"],
        js: ["a.js", "j.js"],
        deferred: true //Should not load until someone calls it
    }
];

$.bigPipe(pagelets, {
    onLoad: function() {
        // all content and scripts loaded
    }
});

// Order of loading Javascript files for the above scenario
// a - 3 + 3 = 6
// j - 1
// b - 2
// c - 1
// d - 2
// e - 1

// a, [b,d], [c,e,j]

