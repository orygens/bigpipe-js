$(".content").bigpipe({
    pagelets: [
        {
            id: "timeline",
            content: "/home#!pagelet=timeline", 
            css: ["/media/common.css", "/media/css/timeline.css"],
            js: ["/media/js/timeline.js"]
        },
        {
            id: "friends_box",
            content: "/home#!pagelet=friends_box", 
            css: ["/media/css/friends_box.css"],
            js: []
        }
    ]
});
