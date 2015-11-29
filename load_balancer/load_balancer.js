var http = require('http');
var fs = require('fs');
var proxy = require('http-proxy');

http.globalAgent.maxSockets = 10240;

// Define the servers to load balance.
var servers = [
  {host: '128.136.179.46', port: 3000}
];

// Create a proxy object for each target.
var proxies = servers.map(function (target) {
  return new proxy.createProxyServer({
    target: target,
    ws: true,
    xfwd: true
  });
});

/**
 * Select a random server to proxy to.
 * @return {Number}     Index of the proxy to use.
 */
var selectServer = function(req, res) {
  return Math.floor(Math.random() * proxies.length);
};

// Select the next server and send the http request.
var serverCallback = function(req, res) {
  var proxyIndex = selectServer();
  var proxy = proxies[proxyIndex];
  proxy.web(req, res);

  proxy.on('error', function(err) {
    startFailoverTimer(proxyIndex);
  });
};
var server = http.createServer(serverCallback);

// Get the next server and send the upgrade request.
server.on('upgrade', function(req, socket, head) {
  var proxyIndex = selectServer();
  var proxy = proxies[proxyIndex];
  proxy.ws(req, socket, head);

  proxy.on('error', function(err, req, socket) {
    socket.end();
    startFailoverTimer(proxyIndex);
  });
});
server.listen(8080);