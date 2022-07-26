// Set up dependencies
const bodyParser = require("body-parser");
const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 8000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Error Handler
app.use((req, res) => {
    res.status(404).send("Data Not Found, Please Restart");
  });

//Post, create new route
app.post("/pets", (req, res) => {
  let body = req.body;
//   console.log("I Work Yay");

  if (!body.age || !body.kind || !body.name) {
    res.type("text").status(404).send("Data Not Found");
  } else {
    let petJSON = fs.readFileSync("pets.json", "utf-8");
    const newPet = JSON.parse(petJSON);
    newPet.push(body);
    console.log(newPet);
    let str = JSON.stringify(newPet);
    fs.writeFile("pets.json", str, (error) => {
      if (error) {
        console.error(error.stack);
      }
    });
    res.send("NEW FRIEND ADDED");
  }
});

//Get, handle all requests
//readFileSync(path, options)
app.get("/pets", (req, res) => {
  const pet = fs.readFileSync("pets.json", "utf-8");
  let petParse = JSON.parse(pet);
  res.send(petParse);
});

//GET, handle a single request
app.get("/pets/:id", (req, res) => {
  const pet = fs.readFileSync("pets.json", "utf-8");
  let id = req.params.id;
  let onePet = JSON.parse(pet)[id];
  if (!onePet) {
    res.status(400).send("Data Not Found");
  }
  res.send(onePet);
});

//PATCH, update information
app.patch("/pets/:id", (req, res) => {
  // console.log("I Run Boss Man")
  let id = req.params.id;
  let body = req.body;
  let petJson = fs.readFileSync("pets.json", "utf-8");
  const newPet = JSON.parse(petJson);
  console.log(newPet);

  if (!newPet) {
    res.send("Data not found").status(404);
    if (newPet === undefined) {
      res.send("Data not found").status(404);
    }
  }
  if (body.age) {
    newPet[id].age = body.age;
  }
  if (body.kind) {
    newPet[id].kind = body.kind;
  }
  if (body.name) {
    newPet[id].name = body.name;
  }
  let petStr = JSON.stringify(newPet);
  fs.writeFile("pets.json", petStr, (error) => {
    if (error) {
      console.error(error.stack);
    }
  });
  res.send(newPet[id]).status(201);
});

//Delete, Delete information
app.delete("/pets/:id", (req, res) => {
  // console.log("Check me out");
  let id = req.params.id;
  let petJson = fs.readFileSync("pets.json", "utf-8");
  const newPet = JSON.parse(petJson);
  console.log(newPet);
  if (id >= newPet.length || id < 0) {
    res.type("text/plain").status(404).send("Data not found");
  } else {
    newPet.splice(id, 1);
    let petStr = JSON.stringify(newPet);
    fs.writeFile("pets.json", petStr, (error) => {
      if (error) {
        console.error(error.stack);
      }
    });
    res.send(newPet[id]).status(204);
  }
});

app.listen(PORT, () => {
  console.log("Listening on port 8000");
});