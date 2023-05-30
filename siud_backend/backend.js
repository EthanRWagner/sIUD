const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user");
const bcrypt = require('bcrypt');
// Add mongdb user services
const userServices = require("./models/user-services");

const app = express();
const port = 8675;

app.use(cors());
app.use(express.json());
//get a list of user with their information
app.get("/users", async (req, res) => {
  const username = req.query["username"];
  if (username) {
    let result = await userServices.findUserByUsername(username);
    result = { users_list: result };
    res.send(result);
  } else {
    res.status(500).send("An error ocurred in the server.");
  }
});

// set device name
app.patch("/device", async (req, res) => {
    const {device, user} = req.body;
    let exUser = await userServices.findUserById(user);
    if(exUser !== null) {
        if (device){
            await userServices.setDevice(exUser.username, device);
            res.status(202).send("Device Set!");
        }
        else {
            res.status(404).send("Invalid device name.");
        }
    }
    else {
        res.status(500).send("An error ocurred in the server.");
    }
  });

// get device name
app.post("/device", async (req, res) => {
    const {user} = req.body;
    let exUser = await userServices.findUserById(user);
    if(exUser !== null) {
        res.status(202).send(exUser.device);
    }
    else {
        res.status(500).send("An error ocurred in the server.");
    }
  });

// get recently recorded data
app.post("/getData", async (req, res) => {
    const {user} = req.body;
    let exUser = await userServices.findUserById(user);
    if(exUser !== null) {
        res.status(202).send(exUser.data.pop());
    }
    else {
        res.status(500).send("An error ocurred in the server.");
    }
  });

// send recorded data to db
app.post("/postData", async (req, res) => {
    const {data, user} = req.body;
    let exUser = await userServices.findUserById(user);
    if(exUser !== null) {
        await userServices.pushData(exUser.username, data);
        res.status(202).send("Data recorded");
    }
    else {
        res.status(500).send("An error ocurred in the server.");
    }
    
  });

// create a new user
app.post("/signup", async (req, res) =>{
    const { username, password, confirmPassword } = req.body;

    // Validate user input
    if (!(password && username && confirmPassword)) {
      res.status(400);
    }

    const existedUserWithUsername = await userServices.findUserByUserName(username);
    if (existedUserWithUsername.length > 0) {
      return res.status(409);
    }
    else if(password != confirmPassword){
      return res.status(404);
    }

    //Encrypt user password
    else{
      encryptedUserPassword = await bcrypt.hash(password, 10);
      encryptedConfPassword = encryptedUserPassword;
    // Create user in our database
      const user = await User.create({
        username: username,
        password: encryptedUserPassword,
        confPassword : encryptedConfPassword,
      });
      console.log(user);
      if(user){
        return res.status(201).send(user);
      }
    }
 });

 // allow user to signin with the correct username and password
app.post("/signin", async(req, res) => {
    const {username, password} = req.body;
    //check for username and password
    if(!username) {
      return res.status(404).send("Need username");
    }
    if(!password) {
      return res.status(404).send("Need password");
    }
    //validate user
    const tempUser = await userServices.findUserByUserName(username);
    if(tempUser.length > 0){
      let result = bcrypt.compareSync(password, tempUser[0].password);
      if(result){
        return res.status(202).send(tempUser);
      }
      return res.status(404).send("Incorrect username or password");
    }
    return res.status(404).send("User not found");
  });

app.patch("/access", async(req, res) => {
    const {id, pref} = req.body;
    const user = await userServices.findUserById(id);
    if(user){
        if(pref >=1 && pref <= 6){
            const returnVal = await userServices.changeColorPref(user.username, pref);
            if(!returnVal){
                return res.status(404).send("Error: Color Preferences Could Not Be Edited...");
            }
            return res.status(202).send("Color Preference Edited!");
        }
        return res.status(404).send("Error: Color Preference Selection Invalid...");
    }
    return res.status(404).send("Error: User Not Found...");
});

 app.listen(process.env.PORT || port, () => {
    if (process.env.PORT) {
      console.log(`REST API is listening on port: ${process.env.PORT}.`);
    } else console.log(`REST API is listening on port: ${port}.`);
  });