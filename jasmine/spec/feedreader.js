/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have valid URLs', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
         });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have valid names', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
         });
    });


    /* A test suite for the menu */
    describe('The Menu', function() {
        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('changes visibility when clicked', function(){

            // query the DOM for the menu icon and body
            var menuIcon = $('.menu-icon-link');
            var body = $('body');

            // trigger click to make menu visible
            menuIcon.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(false);

            // trigger click to make menu invisible
            menuIcon.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });

    /* A test suite for initial entries */
    describe('Initial Entries', function() {

        // account for asynchronous functionality
        beforeEach(function(done){
            loadFeed(0, done);
        });

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('have at least a single entry', function(done){
            expect($('.feed').find('.entry').length).toBeGreaterThan(0);
            done();
        });
    });

    /* A test suite for new feed selection */
    describe('New Feed Selection', function() {

        // decalre variables for comparison
        var feed1Text;
        var feed2Text;

        // account for asynchronous functionality
        beforeEach(function(done){

            // load first feed
            loadFeed(0, function(){

                // obain text for comparison
                feed1Text = $('.feed').find('.entry').text();

                // load second feed (assumes there is more than one feed)
                loadFeed(1, function(){

                    // obain text for comparison
                    feed2Text = $('.feed').find('.entry').text();
                    done();
                });
            });
        });

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('changes content', function(){
            expect(feed1Text).not.toBe(feed2Text);
        });
    });
}());
