var http = require('http'),
  fs = require('fs'),
  proxy = require('http-proxy'),
  request = require('request');


var TIMEOUT = 5000,
  failoverTimer=[],
  RETRY = 1;


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
  //Randomnly selected
  var selectedServer = Math.floor(Math.random() * proxies.length);

  //check if the selected server is down
  if(proxies[selectedServer].options.down){
    selectedServer = -1;

    var attempts = 0;
    while(attempts < proxies.length && selectedServer<0)
    {
      var newSelectedServer = Math.floor(Math.random()*proxies.length);
      if(!proxies[newSelectedServer].options.down){
        selectedServer = newSelectedServer;
        attempts = proxies.length;
      }
      attempts++;
    }
  }

  return selectedServer;
};

var retries = 0;
//Handle Server failure
var requestFailHandler = function(index,req,res) {
  if (failoverTimer[index]) {
    return;
  }
  if(retries >= RETRY){
    renderErrorPage(res);
    return ;
  }

  failoverTimer[index] = setTimeout(function() {
    // Check if the server is up or not
    request({
      url: 'http://' + proxies[index].options.target.host + ':' + proxies[index].options.target.port,
      method: 'HEAD',
      timeout: TIMEOUT
    }, function(err, resp, body) {
      failoverTimer[index] = null;
      if (resp && resp.statusCode === 200) {
        proxies[index].options.down = false;
        console.log('Server ' + proxies[index].options.target.host + ' is back up.');
        retries=0;
        proxyRequest(req,res,index);
        return ;
      } else {
        proxies[index].options.down = true;
        retries++;
        console.log('Server ' + proxies[index].options.target.host + ' is still down.');
        requestFailHandler(index,req,res);
      }
    });
  }, TIMEOUT);
};

//Render Error Page
var renderErrorPage = function(response){
    fs.readFile('./views/error.html',function(err,html){
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);
        response.end();
    });
};


//Proxy the incoming request
var proxyRequest = function(req,res,index){

  var proxy = proxies[index];

  if(proxy){
    console.log("Redirecting request at "+proxy.options.target.host);
    proxy.web(req, res);
    proxy.on('error', function(err) {
      requestFailHandler(index,req,res);
    });  
  }
};


// Select the next server and send the http request.
var server = http.createServer(function(req, res) {
  var proxyIndex = selectServer();
  //If no server found
  if(proxyIndex<0){
    renderErrorPage(res);
  }
  //If server allotted
  proxyRequest(req,res,proxyIndex);
  
}).listen(8080,function(){
  console.log("Load Balancer started at 8080");
});

// Get the next server and send the upgrade request.
server.on('upgrade', function(req, socket, head) {
  var proxyIndex = selectServer();
  var proxy = proxies[proxyIndex];
  proxy.ws(req, socket, head);

  proxy.on('error', function(err, req, socket) {
    socket.end();
    requestFailHandler(proxyIndex,null);
  });
});