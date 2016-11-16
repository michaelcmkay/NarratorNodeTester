// spec.js
//test that the browser is properly opening


var keys  = require('./keys');

var origFn = browser.driver.controlFlow().execute;
browser.driver.controlFlow().execute = function() {
  var args = arguments;

  // queue 100ms wait
  origFn.call(browser.driver.controlFlow(), function() {
    return protractor.promise.delayed(500);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};

describe('Should Open Page', function() {
    it('should get page title', function () {
        browser.ignoreSynchronization = true;

        browser.get('http://localhost:3000/');

        expect(browser.getTitle()).toEqual('The Narrator');
    });

    it('should log in', function () {
        var join = element(by.id('lobby_global_chat'));
        //browser.ignoreSynchronization = true;

        //browser.get('http://localhost:3000/');

        element(by.id('username_field')).sendKeys(keys.accounts[0].username);
        element(by.id('password_field')).sendKeys(keys.accounts[0].password);

        element(by.id('login_button')).click();

        join.getText(function (text) {
            expect(text).toEqual("Global Chat");
            browser.get('http://localhost:3000/');
        });

    });


    /* Having issues with this one, but now with how it is, it might be the previous function is failing unintantionally
       It is now timing out waiting for the element to be visible, but it is not hitting that, and it does not appear
       to be clicking the button to sign in correctly, since the screen is not advancing.

       Furthermore, I just tried logging in manually and I think this could be an issue. Nothing showed up after I
       logged in except a blank screen, which updated upon refreshing the page. It ALSO took me to the lobby page, where
       I logged out from INSTEAD of back to the main screen.
     */

    it('should go to setup', function () {
        //browser.get('http://localhost:3000/');
        browser.ignoreSynchronization = true;

        var EC = protractor.ExpectedConditions;
        var joinButton = element(by.id('joinButton'));
        //console.log(joinButton);
        //var isVisible = EC.elementToBeVisible(joinButton);


        //This is an attempt I found to try and force browser.wait to execute in a specific order.
        /*beforeEach(function() {
            console.log('MADE IT IN BEFORE EACH')
            browser.wait(function() {
                console.log('1 - BeforeEach WAIT');
                return true;
            }).then(function () {
                console.log('2 - BeforeEach after wait');
            });
        });*/

        //browser.wait(isClickable, 3000);

        //The closest I have been able to find to a true solution. This times out but does properly click on the
        //button element.

        browser.wait(EC.visibilityOf(joinButton), 3000);

        joinButton.click();

        //var setup = element(by.id('new_game_header'));

        //setup.getText(function (text) {
        //    expect(text).toEqual("New Game");
        //});
    });
});
