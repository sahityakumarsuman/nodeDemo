'use strict';

// we bring the module of http which helps to use http properties
const http = require('http');
const url = require('url');
const qs = require('querystring');

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
        '/api/info' : (req, res)=> {
            res.writeHead(200, {'Content-type':'application/json'});
            res.end(JSON.stringify(req.queryParams));
        }
    },
    'POST' : {
      'api/login':(req, res) => {
        let body = '';

        req.on('data', data => {
  				body += data;
  			});

        req.on('end', () => {
          let params = qs.parse(body);
          console.log('User name : ', params['username']);
          console.log('Password :', params['password']);
          // Query for saving data to database
          res.end();
        });

      }
    },
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

http.createServer(router).listen(3050, () => {
  console.log("Sever is running on 3050 port no");
});
