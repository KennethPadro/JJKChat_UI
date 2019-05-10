angular.module('AppChat').controller('RegisterController', ['$http', '$log', '$scope', '$location', '$window',
    function ($http, $log, $scope, $location) {
        var registerCtrl = this;

        this.register = function () {
            var postObject = new Object();
            postObject.username = registerCtrl.username;
            postObject.password = registerCtrl.password;
            postObject.first_name = registerCtrl.firstName;
            postObject.last_name = registerCtrl.lastName;
            postObject.phone = registerCtrl.phone;
            postObject.email = registerCtrl.email;
            console.log(postObject);
            $http({

                url: "http://127.0.0.1:5000/JJKChat/register",
                dataType: 'json',
                method: 'POST',
                data: postObject,
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(
                function (response) {
                    console.log("response: " + JSON.stringify(response));
                    M.toast({html: 'Account created, please log in! ', classes: 'rounded green pulse z-depth-3 '});
                    $location.url("/login")


                },
                function (response) {
                    var status = response.status;
                    if (status === 0) {
                        alert("No internet connection");
                    }
                    else if (status === 401) {
                        alert("Your session expired. Login again");
                    }
                    else if (status === 403) {
                        alert("Not authorized");
                    }
                    else if (status === 404) {
                        alert("Not found");
                    }
                    else {
                        alert("Internal error.");
                    }
                });
        };

    }]);