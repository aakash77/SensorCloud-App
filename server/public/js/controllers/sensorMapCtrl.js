'use strict';
sensorCloud.controller('SensorMapCtrl', function($scope,DataService,NgMap){
  var vm = this;

  vm.initMap = function(){
      vm.getSensorDataServer();      
  };

  vm.positions = [];

  //Group By options
    vm.GROUPS = GROUP_OPTIONS;
    vm.group = vm.GROUPS[0];
    
    
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
    
    for(var i = 0; i<4;i++){
      vm.groupBy = vm.group.values[i];
      var params = {
          group : vm.group.group,
          value : vm.groupBy
        };
      
      DataService.getData(URLs.SENSOR_DATA,params).success(function(response){
          var rArea = response.data[response.data.length - 1]
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