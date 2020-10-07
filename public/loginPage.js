"use strict";




const UserForm1 = new UserForm;
UserForm1.loginFormCallback = (data) => {
    ApiConnector.login(data, (response) => {

        if (response.success) {
            location.reload()
        } else { UserForm1.setLoginErrorMessage(response.error) }
    }
    )
}

UserForm1.registerFormCallback = (data) => {
    ApiConnector.register(data, (response) => {

        if (response.success) {
            location.reload()
        } else { UserForm1.setRegisterErrorMessage(response.error) }
    }
    )
}












