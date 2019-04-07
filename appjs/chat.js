angular.module('AppChat').controller('ChatController', ['$http', '$log', '$scope', '$location', '$route', '$routeParams', '$localStorage',
        function ($http, $log, $scope, $location, $route, $routeParams, $localStorage) {
        var thisCtrl = this;
        this.gID = $routeParams.gID;
        this.pID = $localStorage.pID;

        this.messageList = [];
        this.membersList = []; //Added by Jesi for viewMembers function

        this.newText = "";
        this.message = "";
        this.counter = 1000;

        this.loadMessages = function () {

            var url = "http://127.0.0.1:5000/JJKChat/group/" + thisCtrl.gID + "/detailedpost";


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

            $log.error("Messages Loaded: ", JSON.stringify(thisCtrl.messageList));
        };

        this.loadMessages();

        this.postMsg = function () {

            //Buscar la manera de crear un json object para guardar
            //el contenido de thisCtrl.newText en la parte de texto 
            //del json que representa un post


            var post = new Object();
            post.post_id = thisCtrl.pID;
            post.media = thisCtrl.gID;
            post.message = thisCtrl.newText;
            post.first_name = "Jesiniel"
            post.last_name = "Nieves"


            this.messageList.unshift(post);
            // $http({
            //     url: 'https://http://127.0.0.1:5000/JJKChat/ChatApp/message',
            //     dataType: 'json',
            //     method: 'POST',
            //     data: post,
            //     headers: {
            //         "Content-Type": "application/json"
            //     }


            // }).then(// success call back
            //     function (response) {
            //         // The is the sucess function!
            //         // Copy the list of parts in the data variable
            //         // into the list of parts in the controller.

            //         console.log("response: " + JSON.stringify(response));

            //     }, // error callback
            //     function (response) {
            //         var status = response.status;
            //         if (status === 0) {
            //             alert("No internet connection");
            //         }
            //         else if (status === 401) {
            //             alert("Your session expired. Login again");
            //         }
            //         else if (status === 403) {
            //             alert("Not authorized");
            //         }
            //         else if (status === 404) {
            //             alert("Not found");
            //         }
            //         else {
            //             alert("Internal error.");
            //         }
            //     });
            //$route.reload()


            thisCtrl.newText = "";
        };

        this.like = function (mID) {
            var url = "http://127.0.0.1:5000/JJKChat/ChatApp/like/message/" + mID + "/person/" + thisCtrl.pID;

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
        };

        this.dislike = function (mID) {
            var url = "http://127.0.0.1:5000/JJKChat/ChatApp/dislike/message/" + mID + "/person/" + thisCtrl.pID;

            // Now set up the $http object
            // It has two function call backs, one for success and one for error
            $http.post(url).then(// success call back
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
            $route.reload()
        };

        this.searchHashtags = function () {
            var url = "http://127.0.0.1:5000/JJKChat/ChatApp/messages/hashtag/" + thisCtrl.search + "/group/" + thisCtrl.gID;

            // Now set up the $http object
            // It has two function call backs, one for success and one for error
            $http.get(url).then(// success call back
                function (response) {
                    // The is the sucess function!
                    // Copy the list of parts in the data variable
                    // into the list of parts in the controller.

                    console.log("response: " + JSON.stringify(response));

                    thisCtrl.messageList = response.data.Messages;

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

            $log.error("Messages Loaded: ", JSON.stringify(thisCtrl.messageList));

        };
        this.reloadPage = function () {
            $route.reload()

        };
        
        ///Added by Jesi
        this.viewMembers = function(){
            var url = "http://127.0.0.1:5000/JJKChat/group/" + thisCtrl.gID + "/members";


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

            $log.error("Messages Loaded: ", JSON.stringify(thisCtrl.membersList));


        };
        
        this.viewReacts = function (mID) {
            $location.url('/reactDetails/' + mID);
        };

        this.replyToMessage = function (mID) {
            $location.url('/replyToMessage/' + mID + "/" + this.gID);
        };
        this.logOut = function () {
            delete $localStorage.pID;
            $location.url('/login');
        }

        this.goToGroups = function () {

            $location.url('/chatGroups');
        }

        //Run this.viewMembers
        this.viewMembers();


    }]);
