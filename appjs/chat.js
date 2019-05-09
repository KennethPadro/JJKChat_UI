angular.module('AppChat').controller('ChatController', ['$http', '$log', '$scope', '$location', '$route', '$routeParams', '$localStorage','Upload','$timeout',
    function ($http, $log, $scope, $location, $route, $routeParams, $localStorage, Upload,$timeout) {
        var thisCtrl = this;
        this.gID = $routeParams.gID;
        this.pID = $localStorage.pID;

        this.messageList = [];
        this.membersList = []; //Added by Jesi for viewMembers function
        this.contactsList = [];

        this.newText = "";
        this.newText2 ="";
        this.message = "";

        $scope.uploadPic = function(file) {
            file.upload = Upload.upload({
                url: "https://jjkchat-api.herokuapp.com/JJKChat/group/" + thisCtrl.gID + "/post",
                data: {user_id: thisCtrl.pID, message: $scope.message, file: file},
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });


        };

        this.loadMessages = function () {

            var url = "https://jjkchat-api.herokuapp.com/JJKChat/group/" + thisCtrl.gID + "/detailedpost";


            $http.get(url).then(
                function (response) {

                    console.log("response: " + JSON.stringify(response));

                    thisCtrl.messageList = response.data;

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

            //  $log.error("Messages Loaded: ", JSON.stringify(thisCtrl.messageList));
        };

        this.loadMessages();

        this.like = function (post_id) {
            var data = {};
            data.user_id = thisCtrl.pID;
            data.post_id = post_id;
            console.log("response: " + JSON.stringify(data));
            $http({
                url: "https://jjkchat-api.herokuapp.com/JJKChat/post/" + post_id + "/likes",
                dataType: 'json',
                method: 'POST',
                data: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }


            }).then(// success call back
                function (response) {
                    // The is the sucess function!
                    // Copy the list of parts in the data variable
                    // into the list of parts in the controller.

                    console.log("response: " + JSON.stringify(response.data));

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
                    else if (status === 777) {
                        M.toast({html: 'Already reacted to this post' , classes: 'rounded yellow pulse z-depth-3'});
                    }
                    else {
                        alert("Internal error.");
                    }
                });
        };

        this.dislike = function (post_id) {
            var data = {};
            data.user_id = thisCtrl.pID;
            data.post_id = post_id;
            console.log("response: " + JSON.stringify(data));
            $http({
                url: "https://jjkchat-api.herokuapp.com/JJKChat/post/" + post_id + "/dislikes",
                dataType: 'json',
                method: 'POST',
                data: JSON.stringify(data),
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
                    else if (status === 777) {
                        M.toast({html: 'Already reacted to this post' , classes: 'rounded yellow pulse z-depth-3'});
                    }
                    else {
                        alert("Internal error.");
                    }
                });
            //$route.reload()
        };


        this.reloadPage = function () {
            $route.reload()

        };

        ///Added by Jesi
        this.viewMembers = function(){
            var url = "https://jjkchat-api.herokuapp.com/JJKChat/group/" + thisCtrl.gID + "/members";


            // Now set up the $http object
            // It has two function call backs, one for success and one for error
            $http.get(url).then(// success call back
                function (response) {
                    // The is the sucess function!
                    // Copy the list of parts in the data variable
                    // into the list of parts in the controller.

                    console.log("response: " + JSON.stringify(response));

                    thisCtrl.membersList = response.data;

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
            //   $log.error("Messages Loaded: ", JSON.stringify(thisCtrl.membersList));
        };


        this.removeMember = function (user_id) {
            var post = new Object();
            post.user_id = user_id;
            console.log("User: " + JSON.stringify(user_id));
            $http({
                url: "https://jjkchat-api.herokuapp.com/JJKChat/group/" + thisCtrl.gID + "/members",
                dataType: 'json',
                method: 'DELETE',
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
            // $route.reload()

        };

        this.viewReacts = function (mID) {
            $location.url('/reactDetails/' + mID);
        };

        this.replyToMessage = function (post_id) {
            var post = new Object();
            post.user_id = thisCtrl.pID;
            post.reply_message = thisCtrl.newText2;
            $http({
                url: "https://jjkchat-api.herokuapp.com/JJKChat/post/" + post_id + "/replies",
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
            // $route.reload()

        };

        this.logOut = function () {
            delete $localStorage.pID;
            $location.url('/login');
        };


        this.loadContacts = function () {

            var url = "https://jjkchat-api.herokuapp.com/JJKChat/user/" + thisCtrl.pID + "/contact";


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
                    }
                    else {
                        alert("Internal error.");
                    }
                });

        };

        this.addMember = function (user_id) {
            var post = new Object();
            post.user_id = user_id;
            console.log("User: " + JSON.stringify(user_id));
            $http({
                url: "https://jjkchat-api.herokuapp.com/JJKChat/group/" + thisCtrl.gID + "/members",
                dataType: 'json',
                method: 'POST',
                data: post,
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(
                function (response) {
                    console.log("User: " + JSON.stringify(response.data));
                    M.toast({html: 'Contact added to group', classes: 'rounded green pulse z-depth-3 '});
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
                    }
                    else {
                        alert("Internal error.");
                    }
                });
            // $route.reload()

        };

        this.loadContacts();

        //Run this.viewMembers
        this.viewMembers();


    }]);
