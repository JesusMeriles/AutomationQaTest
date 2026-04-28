const loginUI = { 
    userInput: '~test-Username',      
    passInput: '~test-Password',
    loginBtn: '~test-LOGIN',         
    errorMessage: '//android.view.ViewGroup[@content-desc="test-Error message"]/android.widget.TextView',
    //errorText : '//android.widget.TextView[@content-desc="test-Error message"]'
    errorWidget: '~test-Error message',
    //error icon inside Username field: '//android.widget.EditText[@content-desc="test-Username"]/following-sibling::android.view.ViewGroup/android.widget.ImageView'
    errorIcon: '(//android.widget.TextView[@text=""])[1]'
};

module.exports = { loginUI };