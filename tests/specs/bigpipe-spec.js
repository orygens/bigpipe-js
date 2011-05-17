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

describe("The BigPipe", function() {

    describe("when use it without parameters", function() {

        beforeEach(function() {
            this.container = $("<div></div>");
            $(this.container).BigPipe();
        });

        it("should be able to call without parameters", function() {
            expect(this.container.data("BigPipe")).toBeTruthy();
        });

        describe("the bigpipe object", function() {

            beforeEach(function() {
                this.bigpipe = this.container.data("BigPipe");
            });

            it("should have a pagelets option to store all pagelets that should be executed", function() {
                expect(this.bigpipe.options.pagelets).toBeDefined();
            });

            describe("the pagelets option", function() {

                it("should be initialized with a empty array", function() {
                   expect(this.bigpipe.options.pagelets).toEqual([]);
                });

            });

        });

    });

    describe("when use with an unique pagelet with content", function() {

        beforeEach(function() {
            var html = [
                "<div>",
                    "<div class='mypagelet'></div>",
                "</div>"
            ];

            var pagelet = {
                id: "mypagelet",
                content: "<strong>hello world!</strong>",
                css: [],
                js: []
            };

            this.container = $(html.join(""));

            this.cssCallback = jasmine.createSpy();
            this.container.bind("loadCSS", this.cssCallback);

            $(this.container).BigPipe({pagelets:[pagelet]});
        });

        it("should trigger the loadCSS event", function() {
            expect(this.cssCallback).toHaveBeenCalled();
        });

        describe("when load all css files", function() {

            beforeEach(function() {
                this.contentCallback = jasmine.createSpy();
                this.container.bind("loadContent", this.contentCallback);

                this.container.trigger("cssLoaded");
            });

            it("should call loadContent event", function() {
                expect(this.contentCallback).toHaveBeenCalled();
            });

            describe("when load all content", function() {

                beforeEach(function() {
                    this.jsCallback = jasmine.createSpy();
                    this.container.bind("loadJS", this.jsCallback);

                    this.container.trigger("contentLoaded");
                });

                it("should call loadJS event", function() {
                    expect(this.jsCallback).toHaveBeenCalled();
                });

                describe("when load all js", function() {

                    beforeEach(function() {
                        this.onloadCallback = jasmine.createSpy();
                        this.container.bind("onLoad", this.onloadCallback);

                        this.container.trigger("jsLoaded");
                    });

                    it("should call onload event", function() {
                        expect(this.onloadCallback).toHaveBeenCalled();
                    });

                });

            });

        });

    });

    describe("when use two pagelets", function() {

        beforeEach(function() {
            var html = [
                "<div>",
                "</div>"
            ];

            var pagelet = {
                id: "mypagelet",
                content: "<strong>hello world!</strong>",
                css: [],
                js: []
            };

            this.container = $(html.join(""));

            this.cssCallback = jasmine.createSpy();
            this.container.bind("loadCSS", this.cssCallback);

            $(this.container).BigPipe({pagelets:[pagelet, pagelet]});
        });

        describe("when load one css file", function() {

            beforeEach(function() {
                this.contentCallback = jasmine.createSpy();
                this.container.bind("loadContent", this.contentCallback);

                this.container.trigger("cssLoaded");
            });

            it("should not call loadContent event before all css files is loaded", function() {
                expect(this.contentCallback).not.toHaveBeenCalled();
            });

            describe("when load all CSS", function() {

                beforeEach(function() {
                    this.container.trigger("cssLoaded");
                });

                it("should call loadContent event", function() {
                    expect(this.contentCallback).toHaveBeenCalled();
                });

            });

        });

    });

});

