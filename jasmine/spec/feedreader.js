/*
 * File: Spec for testing the feed reader.;
 * Description: 4 suites of Jasmine 2.2 tests to run against the feed reader.
 * Author: Steven Cassady;
 * Version: 1.0.0;
 * Date: Nov. 15, 2016;
 */


/* 
* We're placing all of our tests within the $() function,
* since some of these tests may require DOM elements. We want
* to ensure they don't run until the DOM is ready.
*/
$(function() {

    /*
    * @description This spec runs multiple tests on the Udacity feedreader.
    */
    describe('RSS Feeds', function() {

        /*
        * @description Tests to make sure that the
        * allFeeds variable has been defined and that it is not
        * empty.
        */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /*
        * @description Loops through each feed
        * in the allFeeds object and ensures it has a URL defined
        * and that the URL is not empty.
        */
        it('all have nonempty names', function() {
            for(var i = 0; i< allFeeds.length; i++) {
                expect(i).toBeGreaterThan(-1);
                expect(i).toBeLessThan(allFeeds.length);

                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe("");
            }
        });

        /*
        * @description Loops through each feed
        * in the allFeeds object and ensures it has a name defined
        * and that the name is not empty.
        */
        it('all have nonempty urls', function() {
            for(var i = 0; i< allFeeds.length; i++) {
                expect(i).toBeGreaterThan(-1);
                expect(i).toBeLessThan(allFeeds.length);

                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe("");
            }
        });
    });

    /*
    * @description This spec runs multiple tests on the hamburger menu.
    */
    describe('The menu', function() {

        /*
        * @description ensures the menu element is
        * hidden by default.
        */
        it('hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /*
        * @description ensures the menu toggles
        * visibility when the menu icon is clicked.
        */
        it('toggles visibility on icon click', function() {
            $('.menu-icon-link').trigger("click");
            expect($('body').hasClass('menu-hidden')).toBe(false);

            $('.menu-icon-link').trigger("click");
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });


    /*
    * @description Ensures when the loadFeed
    * function is called and completes its work, there is at least
    * a single .entry element within the .feed container.
    */
    describe('Inital Entries', function() {

        /*
        * @description Loads first feed if possible.
        */
        beforeEach(function(done){
            try{
                loadFeed(0, function() {
                    done();
                });
            } catch(e) {
                console.log(e.name + ' ' + e.message);
            }
        });

        /*
        * @description Ensures loaded feed is defined and nonempty.
        */
        it('at least one exists after loadFeed', function(done) {
            expect($('.feed')).toBeDefined();
            expect($('.feed').find('.entry').length).toBeGreaterThan(0);
            done();
        });
    });


    /*
    * @description Ensures when a new feed is loaded
    * by the loadFeed function that the content actually changes.
    */
    describe('New Feed Selection', function() {

        /*
        * @description Loads first feed.
        */
        beforeEach(function(done){
            loadFeed(0, function() {
                done();
            });
        });

        /*
        * @description Ensures loaded feed is defined, then proceeds to load
        * a new feed and ensure it's defined and different than the first.
        */
        it('new feed selected', function(done) {
            var firstFeed = $('.feed');
            expect(firstFeed).toBeDefined();

            loadFeed(1, function() {
                done();
            });

            expect($('.feed')).toBeDefined();
            expect($('.feed')).not.toBe(firstFeed);
        });
    });
}());
