angular.module('AppChat').controller('LoginController', ['$http', '$log', '$scope', '$location', '$window', '$localStorage',
    function ($http, $log, $scope, $location, $window, $localStorage) {
        var loginCtrl = this;


        this.checkLogin = function () {
            $localStorage.pID = 3///THIS IS FOR AUTOMATIC LOGIN MUST REMOVE
            console.log('Checking PID');
            if ($localStorage.pID !== undefined) {
                console.log('pID Defined');
                $location.url('/allGroups');
            }
        }
        this.login = function () {
            var post = new Object();
            post.username = loginCtrl.username;
            post.password = loginCtrl.password;

            $http({
                url: 'http://127.0.0.1:5000/JJKChat/ChatApp/login',
                dataType: 'json',
                method: 'POST',
                data: post,
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(
                function (response) {
                    console.log("User: " + JSON.stringify(response.data));
                    this.userDetails = response.data.Authentication
                    if (this.userDetails.authenticated) {
                        $localStorage.pID = this.userDetails.pID;
                        $window.location.href = '/#!/allGroups';

                    } else {
                        alert("Wrong Credentials");
                        loginCtrl.username = ""
                        loginCtrl.password = ""

                    }

                },

                function (response) {
                    // This is the error function
                    // If we get here, some error occurred.
                    // Verify which was the cause and show an alert.
                    var status = response.status;
                    if (status == 0) {
                        alert("No hay conexion a Internet");
                    }
                    else if (status == 401) {
                        alert("Su sesion expiro. Conectese de nuevo.");
                    }
                    else if (status == 403) {
                        alert("No esta autorizado a usar el sistema.");
                    }
                    else if (status == 404) {
                        alert("No se encontro la informacion solicitada.");
                    }
                    else {
                        alert("Error interno del sistema.");
                    }
                });

        };

        console.log($localStorage.pID);
        this.checkLogin();


    }]);