var http = require('http'),
  fs = require('fs'),
  proxy = require('http-proxy'),
  request = require('request'),
  constants = require('./constants');

var TIMEOUT = 5000,
  RETRY = 1,
  previousIndex=-1;


http.globalAgent.maxSockets = 10240;

// Define the servers to load balance.
  /*{host: '128.136.179.46', port: 3000}*/
var servers = [
  {host: 'localhost', port: 3000}
];

// Create a proxy object for each target.
var proxies = servers.map(function (target) {
  return new proxy.createProxyServer({
    target: target,
    ws: true,
    xfwd: true,
    down: false
  });
});

/**
 * Select a up and running server randomnly
 */
var selectServer = function(req, res) {
  previousIndex++;

  //Round Robin
  var selectedServer = previousIndex%proxies.length;
  
  //check if the selected server is down
  if(proxies[selectedServer].options.down){
    requestFailHandler(selectedServer);
    selectedServer++;
    var foundRunning = false;
    var attempts = 0;
    while(attempts < proxies.length)
    {
      var newSelectedServer = selectedServer%proxies.length;
      if(!proxies[newSelectedServer].options.down){
        selectedServer = newSelectedServer;
        attempts = proxies.length;
        foundRunning=true;
      }
      attempts++;
    }
    if(!foundRunning)
      selectedServer=-1;
    else
      console.log("Redirecting request at "+proxies[selectedServer].options.target.host);
  }
  previousIndex = selectedServer;
  return selectedServer;
};

//Handle Server failure
var requestFailHandler = function(index) {
  for(var i=1;i<=RETRY;i++){
      request({
          url: 'http://' + proxies[index].options.target.host + ':' + proxies[index].options.target.port,
          method: 'HEAD',
          timeout: TIMEOUT
    },function(err,resp,body){
        if (resp && resp.statusCode === 200) {
            proxies[index].options.down = false;
            console.log('Server ' + proxies[index].options.target.host + ' is back up.');
          }else{
            proxies[index].options.down = true;   
            console.log('Server ' + proxies[index].options.target.host + ' is still down.');
          }
    });
  }
};  

//Render Error Page
var renderErrorPage = function(response){
    fs.readFile('./views/error.html',function(err,html){
        response.writeHeader(503, {"Content-Type": "text/html"});
        response.end(html.toString());
    });
};

//Proxy the incoming request
var proxyRequest = function(req,res,index){
  //If no server found
  if(index<0){
    renderErrorPage(res);
  }
  else{
    var proxy = proxies[index];
    if(proxy){

      proxy.web(req, res, function(e) {
        if(e){
          requestFailHandler(index);
          proxyRequest(req,res,selectServer());  
        }
      });
    }  
  }
};

// Select the next server and send the http request.
var server = http.createServer(function(req, res) {
  proxyRequest(req,res,selectServer());  
}).listen(8080,function(){
  console.log("Load Balancer started at 8080");
});

// Get the next server and send the upgrade request.
server.on('upgrade', function(req, socket, head) {

  console.log("in upgrade");
  var proxyIndex = selectServer();
  if(proxyIndex<0){
    renderErrorPage(res);
  }else{
    var proxy = proxies[proxyIndex];
    proxy.ws(req, socket, head);
    proxy.on('error', function(err, req, socket) {
      socket.end();
      requestFailHandler(proxyIndex);
    });  
  }
});