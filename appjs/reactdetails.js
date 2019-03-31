/**
 * Created by manuel on 4/24/18.
 */
angular.module('AppChat').controller('ReactDetailsController', ['$http', '$log', '$scope', '$location', '$routeParams', '$window',
    function ($http, $log, $scope, $location, $routeParams, $window) {
        // This variable lets you access this controller
        // from within the callbacks of the $http object

        var thisCtrl = this;

        // This variable hold the information on the part
        // as read from the REST API
        var likeDetails = {};
        var dislikeDetails = {};


        this.loadLikeDetails = function () {
            // Get the target part id from the parameter in the url
            // using the $routerParams object
            var messageID = $routeParams.mID;

            // Now create the url with the route to talk with the rest API

            var likesReqURL = "http://127.0.0.1:5000/JJKChat/post/" + messageID + "/likes";


            // Now issue the http request to the rest API
            $http.get(likesReqURL).then(
                // Success function
                function (response) {
                    console.log("likesData: " + JSON.stringify(response.data));
                    // assing the part details to the variable in the controller
                    thisCtrl.likeDetails = response.data;
                }, //Error function
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
        this.loadDislikeDetails = function () {
            // Get the target part id from the parameter in the url
            // using the $routerParams object
            var messageID = $routeParams.mID;

            // Now create the url with the route to talk with the rest API
            var dislikesReqURL = "http://127.0.0.1:5000/JJKChat/post/" + messageID + "/dislikes";
            // Now issue the http request to the rest API
            $http.get(dislikesReqURL).then(
                // Success function
                function (response) {
                    console.log("dislikesData: " + JSON.stringify(response.data));
                    // assing the part details to the variable in the controller
                    thisCtrl.dislikeDetails = response.data;
                }, //Error function
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

        this.loadLikeDetails();
        this.loadDislikeDetails();

        this.backToChat = function () {
            $window.history.back();
        }
        this.logOut = function () {
            delete $localStorage.pID;
            $location.url('/login');
        }
    }]);