const dns = require("dns");
require("dotenv").config();


const Port = process.env.PORT || 3000;
<<<<<<< HEAD

=======
>>>>>>> b9641e9fd3e80c5192371a258f003182f7f454e7

dns.setServers(["1.1.1.1" , "8.8.8.8"]);

const app = require("./src/app");
const connectDB = require("./src/config/database");

connectDB();


<<<<<<< HEAD
app.listen(Port, () => {
=======
app.listen(Port , () => {
>>>>>>> b9641e9fd3e80c5192371a258f003182f7f454e7
    console.log("App is working on port 3000");
});
