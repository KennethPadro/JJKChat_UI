angular.module('AppChat').controller('AllChatGroupsController', ['$http', '$log', '$scope', '$location', '$route', '$routeParams', '$localStorage',
    function ($http, $log, $scope, $location, $route, $routeParams, $localStorage) {
        var thisCtrl = this;
        this.pID = $localStorage.pID;

        this.groupList = [];

        this.loadGroups = function () {

            var url = "http://127.0.0.1:5000/JJKChat/groups";

            $http.get(url).then(
                function (response) {
                    console.log("response: " + JSON.stringify(response));

                    thisCtrl.groupList = response.data;
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

        this.loadGroups();

        this.enterGroup = function (gID) {
            $location.url('/chat/' + gID);
        }
        this.join = function (gID) {
            var url = "http://127.0.0.1:5000/JJKChat/ChatApp/group/" + gID + "/person/" + thisCtrl.pID;


            $http.post(url).then(// success call back
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
