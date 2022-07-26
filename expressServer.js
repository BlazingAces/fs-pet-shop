// set up dependencies
const express = require('express');
const fs = require('fs');
const app = express();
const port = 8000;

//MiddleWare
app.use(express.json());

//handle requests with routes
app.get('/pets' , (req, res) => {
    fs.readFile('pets.json', 'utf-8', (error, data) => {
    //     if(error) {
    //         res.status(500).json({error: 'message'});
    //     } else {
    //         res.type('json').send(data);
    //     }
    res.set('Content-Type' , 'application/json').send(data)
    })
})
app.get('/pets/:id', (req, res) => {
    let index = req.params.id
    fs.readFile('pets.json', 'utf-8', (error, data) => {
        let pet = JSON.parse(data);
        if(error) {
            res.status(500).send('Server Error')
        } else if (pet[index]) {
            res.set('Content-Type' , 'application/json').send(pet[index])
        } else {
            res.set('Content-Type' , 'application/json').status(404).send('Not Found')
        }
    })

})

app.post("/pets", (req, res) => {
    const body = req.body;
    fs.readFile("pet.json", "utf-8", (error, data) => {
        const parseBody = JSON.parse(body);
        parseBody.push(body);
        fs.writeFile("pets.json", JSON.stringify(parseBody), (error) => {
            if(error) {
                console.error('Failure')
            } else {
                res.send(body);
            }
        })
    })
})


app.listen(port, () => {
    console.log('Listening to 8000')
})


//[Dannys Code]
//import express from 'express';
//import {readfile} from "fs/promises"

//const app = express();
//const PORT = 3000;

// app.use(express.json());

// app.get("/pets", (req, res) => {
//     readFile("pets.json" , "utf-8").then((str) => {
//         const pets = JSON.parse(str)
//         res.send(pets);
//     })

//     app.get("/pets/:index", (req, res) => {
//         const index = req.params.index
//         readFile("pets.json" , "utf-8").then((str) => {
//             const pets = JSON.parse(str)
//             res.send(pets[index]);
//     })
// })
//      app.post("/pets", (req, res, next) => {
//           const newPet = req.body;
//           readPetsFile()
//               .then((pets) => {
//                    const newPets = pets.concat(newPet);
//                    return fs.writeFile('pets.json', JSON.stringify(newPets))
//               })
//                .then(() => {
//                    res.send(newPet);
//               })
//                .catch(next)
// })
// })