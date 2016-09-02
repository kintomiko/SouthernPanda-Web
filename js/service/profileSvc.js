/**
 * Created by kinlin on 8/27/16.
 */

app.service("ProfileService", function(){
    this.userInfo = !_.isUndefined(window.localStorage.userInfo) && !_.isEmpty(window.localStorage.userInfo) ? JSON.parse(window.localStorage.userInfo) : '';
    this.userCred = !_.isUndefined(window.localStorage.userCred) && !_.isEmpty(window.localStorage.userCred) ? JSON.parse(window.localStorage.userCred) : '';

    this.setUserInfo = function(user){
        this.userInfo = user;
        window.localStorage.userInfo = JSON.stringify(user);
    }

    this.setUserCred = function(cred){
        this.userCred = cred;
        window.localStorage.userCred = JSON.stringify(cred);
    }
})