angular.module('AppChat').controller('ReplyController', ['$http', '$log', '$scope', '$location', '$route', '$routeParams', '$localStorage',
    function ($http, $log, $scope, $location, $route, $routeParams, $localStorage) {
        var thisCtrl = this;
        this.gID = $routeParams.gID;
        this.pID = $localStorage.pID;
        this.originalMessageID = $routeParams.mID;
        this.originalMessageText = "";
        this.newText = "";
        this.message = "";

        this.loadOriginalMessage = function () {

            var url = "http://127.0.0.1:5000/JJKChatChatApp/message/" + this.originalMessageID;

            // Now set up the $http object
            // It has two function call backs, one for success and one for error
            $http.get(url).then(// success call back
                function (response) {
                    // The is the sucess function!
                    // Copy the list of parts in the data variable
                    // into the list of parts in the controller.
                    console.log(response.data.Messages.mText);
                    thisCtrl.originalMessageText = response.data.Messages.mText;

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

        }

        this.postReply = function () {
            var post = new Object();
            post.pid = thisCtrl.pID;
            post.gid = thisCtrl.gID;
            post.rtext = thisCtrl.newText;
            post.mtext = "'RE: " + this.originalMessageText + "'\n" + thisCtrl.newText;
            $http({
                url: 'http://127.0.0.1:5000/JJKChat/' + this.originalMessageID,
                dataType: 'json',
                method: 'POST',
                data: post,
                headers: {
                    "Content-Type": "application/json"
                }


            }).then(// success call back
                function (response) {
                    // The is the sucess function!
                    // Copy the list of parts in the data variable
                    // into the list of parts in the controller.

                    console.log("response: " + JSON.stringify(response));

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
            thisCtrl.newText = "";
            $location.url('/chat/' + this.gID)



        };
        this.loadOriginalMessage();

        this.logOut = function () {
            delete $localStorage.pID;
            $location.url('/login');
        }

        this.goToMessages = function () {

            $location.url('/chat/' + this.gID);
        }

    }]);
