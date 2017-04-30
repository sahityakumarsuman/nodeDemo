'use strict';

const http = require('http');
const url = require('url');


let routes = {
    'GET' : {
        '/': (req, res)=> {
          res.writeHead(200,{'Content-type':'text/html'});
          res.end('<h1>This is home page</h1>');
        },
        '/about':(req, res)=> {
          res.writeHead(200, {'Content-type':'text/html'});
          res.end('<h1> This is about page');
        },
        'api/getInfo':(req, res)=> {
          res.writeHead(200, {'Content-type':'application/json'});
          res.end(JSON.stringify(req.queryParams));
      }
    },
    'POST': {},
    'NA':(req, res)=> {
      res.writeHead(404);
      res.end('Content not foundS');
    }
}

function router(req, res){
        let baseURI = url.parse(req.url, true);
        let resolveRoute = routes[req.method][req.pathname];
        if(resolveRoute != undefined){
          req.queryParams = baseURI.query;
          resolveRoute(req, res);
        }else {
          routes['NA'](req,res);
        }
}

http.createServer(router).listen(3000, () => {
    console.log('Server is running on 3000 port no');
});
