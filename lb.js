import express from 'express';
import request from 'request';

const servers= ["http://localhost:3000","http://localhost:3001"];

let current =0;

const handler = (req,res) =>{
    const server = servers[current];
    req.pipe(request({url: server + req.url})).pipe(res);
    current = (current +1)% servers.length;
}

const lbServer = express()
lbServer.get('/favicon.ico', (req,res)=>res.send('/favicon.ico'));
lbServer.use((req,res)=> {handler(req,res)});
lbServer.listen(8080, err =>{
    err ? console.log("Failed to listen on port 8080"): console.log("Load balancer server listening on port 8080");
})