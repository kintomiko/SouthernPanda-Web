/**
 * Created by kinlin on 8/27/16.
 */

app.factory('LoginService', function($http, SERVER_URL, LOGIN_API, $base64){

    var service = {};

    service.login = function(email, password){
        var authData={
            success: false,
            cred: {
                email:'',
                password: ''
            },
            user:null,
            message: ''
        };
        var loginUrl = SERVER_URL + LOGIN_API + email;
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $base64.encode(email + ':' + password);
        return $http({
            method:'GET',
            url: loginUrl
        }).then(function(resp){
            var users = resp.data._embedded.users;
            if (!_.isEmpty(users)){
                authData.success = true;
                authData.cred.email = email;
                authData.cred.password = password;
                authData.message = 'Login Successful!';
                authData.user = users[0];
                return authData;
            }else{
                authData.success = false;
                authData.message = 'No Such User!';
                return authData;
            }
        }, function(err){
            this.logout()
            authData.success = false;
            authData.message = 'Incorrect Credential!';
            return authData;
        })
    }

    service.logout = function(){
        $http.defaults.headers.common['Authorization'] = ''
    }

    return service;
})