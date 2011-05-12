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

describe("The Bigpipe", function() {

    describe("when use it without parameters", function() {

        beforeEach(function() {
            this.container = $("<div></div>");
            $(this.container).bigpipe();
        });

        it("should be able to call without parameters", function() {
            expect(this.container.data("bigpipe")).toBeTruthy();
        });

        describe("the bigpipe object", function() {

            beforeEach(function() {
                this.bigpipe = this.container.data("bigpipe");
            });

            it("should have a phase attribute to mark all stages of a Bigpipe engine", function() {
                expect(this.bigpipe._phase).toBeDefined();
            });

            describe("the phase atribute", function() {

                it("should be initialized with 0", function() {
                    expect(this.bigpipe._phase).toEqual(0);
                });

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

});

