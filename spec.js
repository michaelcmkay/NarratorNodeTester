// spec.js
//test that the browser is properly opening


var keys = require('./keys');
var vapi = require('./visual_api'); 

describe('Should Open Page', function() {
    it('should get page title', function () {
        browser.ignoreSynchronization = true;

        browser.get('http://localhost:3000/');

        expect(browser.getTitle()).toEqual('The Narrator');
    });

    it('should log in', function () {
        vapi.login().then(() => {
            var globalPlayerULHeader = element(by.id('lobby_global_chat'));
            vapi.assertElementText(globalPlayerULHeader, 'Global Chat');
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
        console.log('starting');
        //browser.get('http://localhost:3000/');
        browser.ignoreSynchronization = true;

        //var EC = protractor.ExpectedConditions;
        //var joinButton = element(by.id('joinButton'));
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

        //browser.wait(EC.visibilityOf(joinButton), 3000);

        //joinButton.click();

        //var setup = element(by.id('new_game_header'));

        //setup.getText(function (text) {
        //    expect(text).toEqual("New Game");
        //});
    });
});
