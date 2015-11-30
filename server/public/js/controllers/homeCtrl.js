'use strict';
sensorCloud.controller("HomeCtrl", function($scope,DataService,GraphService) {

  var hm = this;

  hm.changeTemplate = function(template){
      hm.templateView = template;
  }

});