angular.module('AppChat').controller('ContactsController', ['$http', '$log', '$scope', '$location', '$route', '$routeParams', '$localStorage',
    function ($http, $log, $scope, $location, $route, $routeParams, $localStorage) {
        var thisCtrl = this;
        this.pID = $localStorage.pID;

        this.contactsList = [];
        this.groupList2 = [];

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
                    else {
                        alert("Internal error.");
                    }
                });

        };

        this.loadContacts();

        this.loadGroups2 = function () {

            var url = "http://127.0.0.1:5000/JJKChat/user/"+ thisCtrl.pID +"/ownedgroups";


            $http.get(url).then(
                function (response) {


                    console.log("response: " + JSON.stringify(response));

                    thisCtrl.groupList2 = response.data;
                    console.log(thisCtrl.groupList2)

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

        this.loadGroups2();

        this.enterGroup = function (gID) {
            $location.url('/chat/' + gID);
        }
        this.joinGroup = function () {
            var url = "http://127.0.0.1:5000/JJKChat/ChatApp/group/" + thisCtrl.groupToJoin + "/person/" + thisCtrl.pID;


            $http.post(url).then(
                function (response) {

                    console.log("response: " + JSON.stringify(response));

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
            $route.reload()
        }
        this.logOut = function () {
            delete $localStorage.pID;
            $location.url('/login');
        }

    }]);