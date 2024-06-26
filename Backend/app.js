const express = require('express');

const app = express();

app.get('/currenttime', function(req, res){
    res.send('<h1>' + new Date().toISOString() + '</h1>');
}); // localhost:6969/currenttime

app.get('/', function(req, res){
    res.send('<h1>BLEHHH</h1>')
}); // localhost:6969/

app.listen(6969);


// const http = require('http');

// function handleReq(req, resp){
    //     // status codes
    //     // 200 - req parsed successfully, a resp can be generated and sent 
//     // 404 - client side error. requested resource/link was not found.
//     // 401 - client side error. client(user) is not authorized to access the requested resource/link
//     // 500 - server-side error. req was valid.

//     if(req.url === '/currenttime'){
//         resp.statusCode = 200;
//         resp.end('<h1>' + new Date().toISOString() + '</h1>');
//     }
//     else if(req.url === '/'){
//         resp.statusCode = 200;
//         resp.end('<h1>BILLLIIIII 🐈‍⬛</h1>');
//     }
// }

// const server = http.createServer(handleReq);

// server.listen(3000);

// amazon.com => send a req to amazon.com
// common port to send unencrypted req
// amazon.com:80
// :443 uses ssl