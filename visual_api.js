var keys = require('./keys');

function assertElementText(element, text){
	element.getText()
	.then(function(e_text){
		expect(e_text).toEqual(text);
	});
}

function login(){
	return new Promise(() => {
		element(by.id('username_field')).sendKeys(keys.accounts[0].username);
	    element(by.id('password_field')).sendKeys(keys.accounts[0].password);

	    element(by.id('login_button')).click();
	});

}

module.exports = {
	assertElementText: assertElementText,

	login: login
}