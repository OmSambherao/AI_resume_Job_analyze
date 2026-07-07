const dns = require("dns");
require("dotenv").config();




dns.setServers(["1.1.1.1" , "8.8.8.8"]);

const app = require("./src/app");
const connectDB = require("./src/config/database");

connectDB();


app.listen(3000, () => {
    console.log("App is working on port 3000");
});