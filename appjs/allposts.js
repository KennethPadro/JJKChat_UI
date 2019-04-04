angular.module('AppChat').controller('AllPostsController', ['$http', '$log', '$scope', '$location', '$route', '$routeParams', '$localStorage',
function ($http, $log, $scope, $location, $route, $routeParams, $localStorage) {
    var thisCtrl = this;
   // this.pID = $localStorage.pID;

    this.postsLists = [];

    this.loadGroups = function () {

        var url = "http://127.0.0.1:5000/JJKChat/post";


        $http.get(url).then(
            function (response) {

                console.log("response: " + JSON.stringify(response));

                thisCtrl.postsLists = response.data;
                console.log(thisCtrl.postsLists.post_id)
                console.log(thisCtrl.postsLists)

            },
            function (response) {
                var status = response.status;
                if (status == 0) {
                    alert("No internet connection");
                }
                else if (status == 401) {
                    alert("Your session expired. Login again");
                }
                else if (status == 403) {
                    alert("Not authorized");
                }
                else if (status == 404) {
                    alert("Not found");
                }
                else {
                    alert("Internal error.");
                }
            });0
    };



    this.loadGroups();

    this.getReactions = function (pID) {

        var url = "http://127.0.0.1:5000/JJKChat/dislikes/"+ pID + "/count";


        $http.get(url).then(
            function (response) {

                console.log("response: " + JSON.stringify(response));

                thisCtrl.postsLists = response.data;
                console.log(thisCtrl.postsLists.post_id)
                console.log(thisCtrl.postsLists)

            }, // error callback
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
