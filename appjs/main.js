(function () {

    var app = angular.module('AppChat', ['ngRoute', 'ngStorage','ngMaterial','material.svgAssetsCache', 'ngMaterialCollapsible','ngFileUpload']);

    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $routeProvider.when('/login', {
            templateUrl: 'pages/login.html',
            controller: 'LoginController',
            controllerAs: 'loginCtrl'
        }).when('/chat/:gID', {
            templateUrl: 'pages/chat.html',
            controller: 'ChatController',
            controllerAs: 'chatCtrl'
        }).when('/reactDetails/:mID', {
            templateUrl: 'pages/reactdetails.html',
            controller: 'ReactDetailsController',
            controllerAs: 'reactDCtrl'
        }).when('/chatGroups', {
            templateUrl: 'pages/chatgroups.html',
            controller: 'ChatGroupsController',
            controllerAs: 'groupsCtrl'
        }).when('/contacts', {
            templateUrl: 'pages/contacts.html',
            controller: 'ContactsController',
            controllerAs: 'contactsCtrl'
        }).when('/allGroups', {
            templateUrl: 'pages/allgroups.html',
            controller: 'AllChatGroupsController',
            controllerAs: 'allGroupsCtrl'
        }).when('/register', {
            templateUrl: 'pages/register.html',
            controller: 'RegisterController',
            controllerAs: 'registerCtrl'
        }).when('/allPosts', {
            templateUrl: 'pages/allposts.html',
            controller: 'AllPostsController',
            controllerAs: 'allPostsCtrl'
        }).when('/statistics', {
            templateUrl: 'pages/statistics.html',
            controller: 'StatisticsController',
            controllerAs: 'StatsCtrl'
        }).otherwise({
            redirectTo: '/login'
        });
    }]);

})();
