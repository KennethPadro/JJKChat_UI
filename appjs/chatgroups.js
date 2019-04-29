angular.module('AppChat').controller('ChatGroupsController', ['$http', '$log', '$scope', '$location', '$route', '$routeParams', '$localStorage',
    function ($http, $log, $scope, $location, $route, $routeParams, $localStorage) {
        
        var thisCtrl = this;
        this.pID = $localStorage.pID;

        this.groupList = [];
        this.groupList2 = [];

        this.loadGroups = function () {

            var url = "http://127.0.0.1:5000/JJKChat/user/"+ thisCtrl.pID + "/member";


            $http.get(url).then(
                function (response) {


                    console.log("response: " + JSON.stringify(response));

                    thisCtrl.groupList = response.data;
                    console.log(thisCtrl.groupList)

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

        this.createGroup = function () {
            var post = new Object();
            post.chat_name = thisCtrl.chat_name;
            post.user_id = thisCtrl.pID;

            $http({
                url: 'http://127.0.0.1:5000/JJKChat/group',
                dataType: 'json',
                method: 'POST',
                data: post,
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(
                function (response) {
                    console.log("User: " + JSON.stringify(response.data));

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
                        alert("User not found");
                        loginCtrl.username = ""
                        loginCtrl.password = ""
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
