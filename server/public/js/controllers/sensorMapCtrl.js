'use strict';
sensorCloud.controller('SensorMapCtrl', function($window,$scope,DataService,NgMap){
  var vm = this;

  vm.initMap = function(){
    $scope.user_id = $window.sessionStorage.userId;
    vm.getSensorDataServer();      
  };

  vm.positions = [];
    
    
    vm.dynMarkers = []
    NgMap.getMap().then(function(map) {
      var bounds = new google.maps.LatLngBounds();
      for (var k in map.customMarkers) {
        var cm = map.customMarkers[k];
        vm.dynMarkers.push(cm);
        bounds.extend(cm.getPosition());
      };
      
      vm.markerClusterer = new MarkerClusterer(map, vm.dynMarkers, {});
      map.setCenter(bounds.getCenter());
      map.fitBounds(bounds);  
   });

    vm.getSensorDataServer = function(){
    var urlParam = "/"+$scope.user_id+"/sensors";
      DataService.getData(URLs.USER_DATA+urlParam,{}).success(function(response){
      //Group By options
          var areas = response.data.map(function(sensor){
            return sensor.area;
          });
          var cities = response.data.map(function(sensor){
            return sensor.city;
          });

          vm.GROUPS=[
                  {
                    group:'area',
                    values:areas,
                    group_title : 'Area'
                  },
                  {
                    group:'city',
                    values:cities,
                    group_title:'City'
                  }];
          vm.group = vm.GROUPS[0];
          
          vm.groupBy = vm.group.values[0];

          for(var i = 0; i<vm.group.values.length;i++){
            vm.groupBy = vm.group.values[i];
            var params = {
                group : vm.group.group,
                value : vm.groupBy
              };
            
            DataService.getData(URLs.SENSOR_DATA,params).success(function(response){
                var rArea = response.data[response.data.length - 1];
                console.log(response);
                var areaDetail = [];
                areaDetail.push(rArea.sensorid);
                areaDetail.push(rArea.lat);
                areaDetail.push(rArea.lng);
                areaDetail.push(rArea.area);
                areaDetail.push(rArea.city);
                areaDetail.push(rArea.humidity);
                areaDetail.push(Math.round(rArea.pressure * 100) / 100);
                areaDetail.push(rArea.temp);
                vm.positions.push(areaDetail);
                console.log(vm.positions);
            });
          }

      });
    };
});

// "San Jose State University"
// "San Jose"
// "37.336275"
// "-121.881099"

// "Stanford University"
// "Stanford"
// "37.427474"
// "-122.169869"

// "Santa Clara University"
// "Santa Clara"
// "37.349582"
// "-121.939181"

// "San Jose City College"
// "San Jose"
// "37.314598"
// "-121.925220"