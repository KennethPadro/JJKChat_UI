angular.module('AppChat').controller('StatisticsController', ['$http', '$log', '$scope', '$location', '$route', '$routeParams', '$localStorage',
    function($http, $log, $scope, $location, $route, $routeParams, $localStorage) {

        var thisCtrl = this;
        console.log("Testing Statistcis Controller");
        this.pID = $localStorage.pID;

        this.postPerDayDataPoints = [];

        this.loadPostPerDay = function() {

            var url = "https://jjkchat-api.herokuapp.com/JJKChat/post/countperday";

            $http.get(url).then(
                function(response) {

                    console.log("Entre aqui");

                    var data = response.data;

                    console.log("response: " + JSON.stringify(response));
                    for (var i = 0; i < data.length; i++) {
                        thisCtrl.postPerDayDataPoints.push({
                            x: new Date(data[i].day),
                            y: data[i].total
                        });

                    }
                    console.log(thisCtrl.postPerDayDataPoints);

                    postPerDaychart.render();
                },
                function(response) {
                    var status = response.status;
                    if (status === 0) {
                        alert("No internet connection");
                    } else if (status === 401) {
                        alert("Your session expired. Login again");
                    } else if (status === 403) {
                        alert("Not authorized");
                    } else if (status === 404) {
                        alert("Not found");
                    } else {
                        alert("Internal error.");
                    }
                });

        };

        var postPerDaychart = new CanvasJS.Chart("post-per-day", {
            animationEnabled: true,
            theme: "light2",
            backgroundColor: "transparent",
            //title: {
            //    text: "Post Per Day"
            //},
            axisY: {
                title: "Number of posts",
                titleFontSize: 24
            },
            toolTip: {
                borderThickness: 0,
                cornerRadius: 0
            },
            data: [{
                type: "spline",
                yValueFormatString: "###,### posts",
                dataPoints: this.postPerDayDataPoints
            }]
        });

        this.loadPostPerDay();


        this.repliesPerDayDataPoints = [];

        this.loadRepliesPerDay = function() {

            var url = "https://jjkchat-api.herokuapp.com/JJKChat/replies/count";

            $http.get(url).then(
                function(response) {

                    console.log("Entre aqui");

                    var data = response.data;

                    console.log("response: " + JSON.stringify(response));
                    for (var i = 0; i < data.length; i++) {
                        thisCtrl.repliesPerDayDataPoints.push({
                            x: new Date(data[i].day),
                            y: data[i].total
                        });

                    }
                    console.log(thisCtrl.repliesPerDayDataPoints);

                    repliesPerDaychart.render();
                },
                function(response) {
                    var status = response.status;
                    if (status === 0) {
                        alert("No internet connection");
                    } else if (status === 401) {
                        alert("Your session expired. Login again");
                    } else if (status === 403) {
                        alert("Not authorized");
                    } else if (status === 404) {
                        alert("Not found");
                    } else {
                        alert("Internal error.");
                    }
                });

        };

        var repliesPerDaychart = new CanvasJS.Chart("replies-per-day", {
            animationEnabled: true,
            theme: "light2",
            backgroundColor: "transparent",
            //title: {
            //    text: "Post Per Day"
            //},
            axisY: {
                title: "Number of replies",
                titleFontSize: 24
            },
            toolTip: {
                borderThickness: 0,
                cornerRadius: 0
            },
            data: [{
                type: "spline",
                yValueFormatString: "###,### posts",
                dataPoints: this.repliesPerDayDataPoints
            }]
        });

        this.loadRepliesPerDay();

        
        this.likesPerDayDataPoints = [];

        this.loadLikesPerDay = function() {

            var url = "https://jjkchat-api.herokuapp.com/JJKChat/likes/count";

            $http.get(url).then(
                function(response) {

                    console.log("Entre aqui");

                    var data = response.data;

                    console.log("response: " + JSON.stringify(response));
                    for (var i = 0; i < data.length; i++) {
                        thisCtrl.likesPerDayDataPoints.push({
                            x: new Date(data[i].day),
                            y: data[i].total
                        });

                    }
                    console.log(thisCtrl.likesPerDayDataPoints);

                    likesPerDaychart.render();
                },
                function(response) {
                    var status = response.status;
                    if (status === 0) {
                        alert("No internet connection");
                    } else if (status === 401) {
                        alert("Your session expired. Login again");
                    } else if (status === 403) {
                        alert("Not authorized");
                    } else if (status === 404) {
                        alert("Not found");
                    } else {
                        alert("Internal error.");
                    }
                });

        };

        var likesPerDaychart = new CanvasJS.Chart("likes-per-day", {
            animationEnabled: true,
            theme: "light2",
            backgroundColor: "transparent",
            //title: {
            //    text: "Post Per Day"
            //},
            axisY: {
                title: "Number of likes",
                titleFontSize: 24
            },
            toolTip: {
                borderThickness: 0,
                cornerRadius: 0
            },
            data: [{
                type: "spline",
                yValueFormatString: "###,### posts",
                dataPoints: this.likesPerDayDataPoints
            }]
        });

        this.loadLikesPerDay();

        this.dislikesPerDayDataPoints = [];

        this.loadDislikesPerDay = function() {

            var url = "https://jjkchat-api.herokuapp.com/JJKChat/dislikes/count";

            $http.get(url).then(
                function(response) {

                    console.log("Entre aqui");

                    var data = response.data;

                    console.log("response: " + JSON.stringify(response));
                    for (var i = 0; i < data.length; i++) {
                        thisCtrl.dislikesPerDayDataPoints.push({
                            x: new Date(data[i].day),
                            y: data[i].total
                        });

                    }
                    console.log(thisCtrl.dislikesPerDayDataPoints);

                    dislikesPerDaychart.render();
                },
                function(response) {
                    var status = response.status;
                    if (status === 0) {
                        alert("No internet connection");
                    } else if (status === 401) {
                        alert("Your session expired. Login again");
                    } else if (status === 403) {
                        alert("Not authorized");
                    } else if (status === 404) {
                        alert("Not found");
                    } else {
                        alert("Internal error.");
                    }
                });

        };

        var dislikesPerDaychart = new CanvasJS.Chart("dislikes-per-day", {
            animationEnabled: true,
            theme: "light2",
            backgroundColor: "transparent",
            //title: {
            //    text: "Post Per Day"
            //},
            axisY: {
                title: "Number of dislikes",
                titleFontSize: 24
            },
            toolTip: {
                borderThickness: 0,
                cornerRadius: 0
            },
            data: [{
                type: "spline",
                yValueFormatString: "###,### posts",
                dataPoints: this.dislikesPerDayDataPoints
            }]
        });

        this.loadDislikesPerDay();




        thisCtrl.enteredUID = "";


        this.loadPostPerDayByUser = function() {

            var url = "https://jjkchat-api.herokuapp.com/JJKChat/user/"+thisCtrl.enteredUID+"/postsperday";

            $http.get(url).then(
                function(response) {
                    postPerDayByUserDataPoints = [];

                    console.log("Cleaning thisCtrl.postPerDayByUserDataPoints");
                    console.log("Before call: " + postPerDayByUserDataPoints);

                    var data = response.data;

                    console.log("response: " + JSON.stringify(response));
                    for (var i = 0; i < data.length; i++) {
                        postPerDayByUserDataPoints.push({
                            x: new Date(data[i].day),
                            y: data[i].total
                        });

                    }
                    console.log("After Call: " + postPerDayByUserDataPoints);

                    var postPerDayByUserchart = new CanvasJS.Chart("post-per-day-by-user");

                    postPerDayByUserchart.options.animationEnabled= true;
                    postPerDayByUserchart.options.theme = "light2";
                    postPerDayByUserchart.options.backgroundColor= "transparent";


                    postPerDayByUserchart.options.axisY = {
                        title: "Number of post",
                        titleFontSize: 24
                    };

                    postPerDayByUserchart.options.toolTip = {
                        borderThickness: 0,
                        cornerRadius: 0
                    };

                    var series1 = {
                        type: "spline",
                        yValueFormatString: "###,### posts",
                    };

                    postPerDayByUserchart.options.data = [];

                    postPerDayByUserchart.options.data.push(series1);

                    series1.dataPoints = postPerDayByUserDataPoints;


                    postPerDayByUserchart.render();


                },
                function(response) {
                    var status = response.status;
                    if (status === 0) {
                        alert("No internet connection");
                    } else if (status === 401) {
                        alert("Your session expired. Login again");
                    } else if (status === 403) {
                        alert("Not authorized");
                    } else if (status === 404) {
                        alert("Not found");
                    } else {
                        alert("Internal error.");
                    }
                });

        };

        /**
        var postPerDayByUserchart = new CanvasJS.Chart("post-per-day-by-user", {
            animationEnabled: true,
            theme: "light2",
            backgroundColor: "transparent",
            //title: {
            //    text: "Post Per Day"
            //},
            axisY: {
                title: "Number of post",
                titleFontSize: 24
            },
            toolTip: {
                borderThickness: 0,
                cornerRadius: 0
            },
            data: [{
                type: "spline",
                yValueFormatString: "###,### posts",
                dataPoints: thisCtrl.postPerDayByUserDataPoints
            }]
        });
        **/

        //this.loadPostPerDayByUser(3);





        //Trending by hashtags
        
        this.trendingTopics = [];
        
        this.loadTrendingTopics = function () {
            console.log("Entered on Trending Topics");
            var url = "https://jjkchat-api.herokuapp.com/JJKChat/hashtag/trending";


            $http.get(url).then(
                function (response) {
                    console.log("response: " + JSON.stringify(response.data));

                    thisCtrl.trendingTopics = response.data;

                },
                function (response) {
                    console.log("Entre en error");
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
            console.log("Sali sin hacer nada en trending topics");
         //  $log.error("Messages Loaded: ", JSON.stringify(thisCtrl.messageList));
        };
        this.loadTrendingTopics();

        
        thisCtrl.enteredPID = "";

        thisCtrl.numLikes = "";
        thisCtrl.numDislikes = "";
        thisCtrl.numReplies = "";

        thisCtrl.likesData = [];

        this.loadStats = function() {
            this.loadLikes();
            this.loadDislikes();
            this.loadReplies();
        }

        
        this.loadLikes = function () {
            var url = "https://jjkchat-api.herokuapp.com/JJKChat/post/" + thisCtrl.enteredPID +"/likes/count";


            $http.get(url).then(
                function (response) {
                    console.log("response: " + JSON.stringify(response.data));

                    thisCtrl.likesData = response.data;
                    thisCtrl.numLikes = "Number of Likes: " + thisCtrl.likesData["reactions"];

                },
                function (response) {
                    console.log("Entre en error");
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

        thisCtrl.dislikesData = [];


        this.loadDislikes = function () {
            var url = "https://jjkchat-api.herokuapp.com/JJKChat/post/" + thisCtrl.enteredPID +"/dislikes/count";


            $http.get(url).then(
                function (response) {
                    console.log("response: " + JSON.stringify(response.data));

                    thisCtrl.dislikesData = response.data;
                    thisCtrl.numDislikes = "Number of Disikes: " + thisCtrl.dislikesData["reactions"];

                },
                function (response) {
                    console.log("Entre en error");
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
        
        thisCtrl.repliesData = [];
        thisCtrl.numReplies = "";

        this.loadReplies = function () {
            var url = "https://jjkchat-api.herokuapp.com/JJKChat/replies/" +thisCtrl.enteredPID +"/count";


            $http.get(url).then(
                function (response) {
                    console.log("response: " + JSON.stringify(response.data));

                    thisCtrl.repliesData = response.data;
                    thisCtrl.numReplies = "Number of Replies: " + thisCtrl.repliesData["total_replies"];

                },
                function (response) {
                    console.log("Entre en error");
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

       
       this.activeUsersDataPoints = [];

        this.loadactiveUsersPerDay = function() {

            var url = "https://jjkchat-api.herokuapp.com/JJKChat/user/mostactive";

            $http.get(url).then(
                function(response) {

                    console.log("Entre aqui");

                    var data = response.data;

                    console.log("response: " + JSON.stringify(response));
                    for (var i = 0; i < data.length; i++) {
                        thisCtrl.activeUsersDataPoints.push({
                            x: new Date(data[i].date),
                            y: data[i].user_id
                        });

                    }
                    console.log(thisCtrl.activeUsersDataPoints);

                    activeUserschart.render();
                },
                function(response) {
                    var status = response.status;
                    if (status === 0) {
                        alert("No internet connection");
                    } else if (status === 401) {
                        alert("Your session expired. Login again");
                    } else if (status === 403) {
                        alert("Not authorized");
                    } else if (status === 404) {
                        alert("Not found");
                    } else {
                        alert("Internal error.");
                    }
                });

        };

        var activeUserschart = new CanvasJS.Chart("active-user-per-day", {
            animationEnabled: true,
            theme: "light2",
            backgroundColor: "transparent",
            //title: {
            //    text: "Post Per Day"
            //},
            axisY: {
                title: "Most active users",
                titleFontSize: 24
            },
            toolTip: {
                borderThickness: 0,
                cornerRadius: 0
            },
            data: [{
                type: "spline",
                yValueFormatString: "###,### posts",
                dataPoints: this.activeUsersDataPoints
            }]
        });

        this.loadactiveUsersPerDay();






        this.logOut = function() {
            delete $localStorage.pID;
            $location.url('/login');
        }

    }
]);