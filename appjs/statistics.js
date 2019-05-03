angular.module('AppChat').controller('StatisticsController', ['$http', '$log', '$scope', '$location', '$route', '$routeParams', '$localStorage',
    function($http, $log, $scope, $location, $route, $routeParams, $localStorage) {

        var thisCtrl = this;
        console.log("Testing Statistcis Controller");
        this.pID = $localStorage.pID;

        this.postPerDayDataPoints = [];

        this.loadPostPerDay = function() {

            var url = "http://127.0.0.1:5000/JJKChat/post/countperday";

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

            var url = "http://127.0.0.1:5000/JJKChat/replies/count";

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

            var url = "http://127.0.0.1:5000/JJKChat/likes/count";

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

            var url = "http://127.0.0.1:5000/JJKChat/dislikes/count";

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

        //Trending by hashtags
        
        this.trendingTopics = [];
        
        this.loadTrendingTopics = function () {
            console.log("Entered on Trending Topics");
            var url = "http://127.0.0.1:5000/JJKChat/hashtag/trending";


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
        console.log("Antes de la llamada!");
        this.loadTrendingTopics();


        this.logOut = function() {
            delete $localStorage.pID;
            $location.url('/login');
        }

    }
]);