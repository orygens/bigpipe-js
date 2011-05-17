var pagelets = [
    {
        container: $('div'),
        url: "/home#!pagelet=timeline", 
        css: ["/media/common.css", "/media/css/timeline.css"],
        js: ["a.js", "b.js", "c.js"]
    },
    {
        container: "friends_box",
        content: "/home#!pagelet=friends_box", 
        css: ["/media/css/friends_box.css"],
        js: ["a.js", "d.js", "e.js"]
    },
    {
        container: "friends_box",
        content: "/home#!pagelet=friends_box", 
        css: ["/media/css/friends_box.css"],
        js: ["a.js", "j.js"]
    }

];

$(".content").bigpipe(pagelets);

a - 3 + 3 = 6
j - 1
b - 2
c - 1
d - 2
e - 1

a, [b,d], [c,e,j]
