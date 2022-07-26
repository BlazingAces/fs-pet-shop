const fs = require('fs');
const http = require('http');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json')
const petRegExp = /^\/pets\/(.*)$/;
let port = process.env.PORT || 8000;

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && petRegExp.test(req.url)) {
        const index = req.url.match(petRegExp)[1];
        fs.readFile(petsPath, "utf-8", (error, data) => {
            if (error) {
                req.statusCode = 500;
                res.end();
            } else {
                console.log(data, "data at index");
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                const parsedData = JSON.parse(data);
                const dataIndex = parsedData[index];
                if (dataIndex) {
                    res.write(JSON.stringify(dataIndex));
                    res.end();
                } else {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/plain');
                    res.write("Not Found");
                    res.end();
                }

            }

        })
    } else if (req.method === 'GET' && req.url === '/pets') {
        fs.readFile(petsPath, "utf-8", (error, data) => {
            if (error) {
                req.statusCode = 500;
                res.end();
            } else {
                console.log(data, "data");
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.write(data)
                res.end();
            }

        })

    } else if (req.method === 'POST' && req.url === '/pets') {
        console.log("Creating new pet")
        fs.readFile(petsPath, "utf-8", (error, data) => {
            if (error) {
                req.statusCode = 500;
                res.end();
            } else {
                console.log(data, "data");

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.write(data)
                res.end();
            }

        })
    } else if (req.method === 'GET') {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.write("Not Found");
        res.end();
    }


})

server.listen(port, function() {
    console.log('Listening on port', port);
  });






// const server = http.createServer((req, res) => {
//     if(req.method === 'GET' && req.url === '/pets') {
//         fs.readFile(petsPath, 'utf8', (error, petsJSON) => {
//             if(error) {
//                 console.error(error.stack);
//                 res.statusCode = 500;
//                 res.setHeader('Content-Type', 'text/plain');
//                 return res.end('Interal Server Error');
//             }
//             res.setHeader('Content-Type', 'application/json');
//             res.end(petsJSON);
//         });
//     } else if (req.method === 'GET' && petRegExp.test(req.url)) {
//         fs.readFile(petsPath, 'utf8', (error, petsJSON) => {
//             if(error) {
//                 console.error(error.stack);
//                 res.statusCode = 500;
//                 res.setHeader('Content-Type', 'text/plain');
//                 return res.end('Internal Server Error');
//             }

//             let pets = JSON.parse(petsJSON);
//             let petJSON =JSON.stringify(pets[0]);

//             res.setHeader('Content-Type' , 'application/json');
//             res.end(petJSON);
//         })

//     }  else if (req.method === 'GET' && req.url === "/pets/1") {
//         fs.readFile(petsPath, 'utf8', (error, petsJSON) => {
//             if(error) {
//                 console.error(error.stack);
//                 res.statusCode = 500;
//                 res.setHeader('Content-Type', 'text/plain');
//                 return res.end('Internal Server Error');
//             }

//             let pets = JSON.parse(petsJSON);
//             let petJSON =JSON.stringify(pets[1]);

//             res.setHeader('Content-Type' , 'application/json');
//             res.end(petJSON);
//         })
//     } else {
//         res.statusCode = 404;
//         res.setHeader('Content-Type', 'text/plain');
//         res.end('Not found');
//     }
// })

// server.listen(port, function() {
//     console.log('Listening on port', port);
//   });

//   module.exports = server;




