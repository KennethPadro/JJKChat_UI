angular.module('AppChat').controller('ContactsController', ['$http', '$log', '$scope', '$location', '$route', '$routeParams', '$localStorage',
    function ($http, $log, $scope, $location, $route, $routeParams, $localStorage) {
        var thisCtrl = this;
        this.pID = $localStorage.pID;

        this.contactsList = [];
        this.groupList2 = [];

        this.first_name = "";
        this.last_name="";
        this.email="";
        this.phone="";

        this.loadContacts = function () {

            var url = "http://127.0.0.1:5000/JJKChat/user/" + thisCtrl.pID + "/contact";


            $http.get(url).then(
                function (response) {


                    console.log("response: " + JSON.stringify(response));

                    thisCtrl.contactsList = response.data;
                    console.log(thisCtrl.contactsList)

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
                    else if (status === 777) {
                        M.toast({html: 'You have no contacts yet! Add one ', classes: 'rounded blue pulse z-depth-3 '});
                    }
                    else {
                        alert("Internal error.");
                    }
                });

        };

        this.loadContacts();


        this.addContact = function () {
            var post = new Object();
            post.first_name = thisCtrl.first_name;
            post.last_name = thisCtrl.last_name;
            post.email = thisCtrl.email;
            post.phone = thisCtrl.phone;

            $http({
                url: "http://127.0.0.1:5000/JJKChat/user/" + thisCtrl.pID + "/contact",
                dataType: 'json',
                method: 'POST',
                data: post,
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(
                function (response) {
                    console.log("User: " + JSON.stringify(response.data));
                    M.toast({html: 'Contact added!', classes: 'rounded green pulse z-depth-3 '});
                    $route.reload()
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
                        M.toast({html: 'Contact not found!', classes: 'rounded red pulse z-depth-3 '});
                    }
                    else {
                        alert("Internal error.");
                    }
                });
        };


        this.logOut = function () {
            delete $localStorage.pID;
            $location.url('/login');
        }

    }]);
