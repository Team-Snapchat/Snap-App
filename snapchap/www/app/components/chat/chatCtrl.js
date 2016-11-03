angular.module('snapchat').controller('chatCtrl', function ($scope, $stateParams, mainService, $rootScope, $state) {

  mainService.showMenu();

  $('#index-html__chat-btn, #index-html__take-photo-btn, #index-html__dots-btn').addClass('chatty-nav');


  mainService.getPendingMessageIds($rootScope.userInfo.id).then(function(response) {
    $rootScope.pendingMessages = response.data;
  });


  var canvas = document.getElementById('message-canvas');
  var context = canvas.getContext('2d');
  var image = new Image();

  var messageCanvasContainer = $('#message-canvas-container');

  canvas.width = messageCanvasContainer.width();
  canvas.height = messageCanvasContainer.height();

  $scope.getMessage = function(messageId) {
    mainService.getMessage(messageId).then(function(response) {
      setTimeout(function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        messageCanvasContainer.removeClass('active');
        mainService.showMenu();
        mainService.deleteMessage(messageId).then(function(response) {
          mainService.getPendingMessageIds($rootScope.userInfo.id).then(function(response) {
            $rootScope.pendingMessages = response.data;
          });
        });
      }, 10000);
      messageCanvasContainer.addClass('active');
      mainService.hideMenu();
      image.onload = function() {
        $('#message-canvas').css('top', 'calc(50% - ' + image.height / 2 + 'px');
        context.drawImage(image, 0, 0);
      }
      image.src = response.data[0].message;
    });
  }


  $scope.goToView = function(view) {
    $state.go(view);
  }


});
