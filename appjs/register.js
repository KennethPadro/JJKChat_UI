angular.module('AppChat').controller('RegisterController', ['$http', '$log', '$scope', '$location', '$window',
    function ($http, $log, $scope, $location, $window) {
        var registerCtrl = this;



        this.register = function () {
            var postObject = new Object();
            postObject.username = registerCtrl.username;
            postObject.password = registerCtrl.password;
            postObject.pfirstname = registerCtrl.firstName;
            postObject.plastname = registerCtrl.lastName;
            postObject.pphone = registerCtrl.phone;
            postObject.pemail = registerCtrl.email;
            console.log(postObject);
            $http({

                url: "http://127.0.0.1:5000/JJKChat/ChatApp/person",
                dataType: 'json',
                method: 'POST',
                data: postObject,
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(// success call back
                function (response) {
                    // The is the sucess function!
                    // Copy the list of parts in the data variable
                    // into the list of parts in the controller.
                    $window.location.href = '/#!/login';
                    console.log("response: " + JSON.stringify(response));
                    $location.url("/login")
                }, // error callback
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


                }
                );
        };

    }]);