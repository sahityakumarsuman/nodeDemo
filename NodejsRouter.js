'use strict';

// we bring the module of http which helps to use http properties
const http = require('http');
const url = require('url');

let routes = {
    'GET' : {
        '/' : (res, req) => {
          res.writeHead(200, {'Content-type':'text/html'});
          res.end('<h1>Hello Router</h1>');
        },
        '/about' : (req, res)=>{
          res.writeHead(200,{'Content-type':'text/html'});
          res.end('<h1> This is about page </h1>')
        },
        '/api/info': (req, res)=> {
            res.writeHead(200, {'Content-type':'application/json'});
            res.end(JSON.stringify(req.queryParams));
        }
    },
    'POST' : {},
    'NA':(req, res)=>{
      res.writeHead(404);
      res.end(' 404 Error ');
    }
}

function router(req, res){
    let baseURI = url.parse(req.url, true);
    console.log('Requested route :',baseURI);
    let resolveRoute = routes[req.method][baseURI.pathname];

    if(resolveRoute != undefined){
      req.queryParams = baseURI.query;
      resolveRoute(req, res);
    }else{
      routes['NA'](req,res);
    }

    //
    // res.writeHead(200, {'Content-type':'text/html'});
    // res.end('<h1>Hello World</h1>');
    // console.log('Request route url :',req.url);
    // console.log('Request method : ',req.method);
  //  console.log('Request header :' ,req.header);
}

http.createServer(router).listen(3080, () => {
  console.log("Sever is running on 3080 port no");
});
