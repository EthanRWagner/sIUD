const mongoose = require("mongoose");
const userModel = require("./user");
const dotenv = require("dotenv");
const User = require("./user");

dotenv.config();

// Uncomment the following to debug mongoose queries, etc.
mongoose.set("debug", true);

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.MONGO_USER +
      ":" +
      process.env.MONGO_PWD +
      "@" +
      process.env.MONGO_CLUSTER +
      "/" +
      process.env.MONGO_DB +
      "?retryWrites=true&w=majority",
    {
      useNewUrlParser: true, //useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .catch((error) => console.log(error));

async function findUserById(id) {
  return await userModel.findById(id);
 
}

async function findUserByUserName(username) {
  return await userModel.find({ username: username });
}

async function changeColorPref(username, newColorPref){
  return await userModel.updateOne({username : username}, {$set:{colorPref: newColorPref}});
}

async function pushData(username, newData){
  return await userModel.updateOne({username : username}, {$push:{data: newData}});
}

async function setDevice(username, devName){
  return await userModel.updateOne({username : username}, {$set:{device: devName}});
}

exports.findUserById = findUserById;
exports.findUserByUserName = findUserByUserName;
exports.changeColorPref = changeColorPref;
exports.pushData = pushData;
exports.setDevice = setDevice;
