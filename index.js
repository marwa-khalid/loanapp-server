const express = require("express");
const app=express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require('body-parser');
const router = express.Router();

const port = process.env.PORT || 5000;

const userRoute = require("./routes/user");
const loanRoute = require("./routes/loan");
dotenv.config();

const DB = 'mongodb://marwakhalid:marwamarwa@marwa-shard-00-00.x9zjp.mongodb.net:27017,marwa-shard-00-01.x9zjp.mongodb.net:27017,marwa-shard-00-02.x9zjp.mongodb.net:27017/loanApp?ssl=true&replicaSet=atlas-6szo5v-shard-0&authSource=admin&retryWrites=true&w=majority';

router.get('/', (req,res)=>{
    res.send("Welcome to Dhani Loan Server!");
})

app.use(cors());

mongoose.set("strictQuery", false);
mongoose.connect(DB,{}).then(()=>{
    console.log("connection successful with db");
}).catch((err)=>console.log("no connection"));

app.use(express.json());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use("/",router);
app.use("/users", userRoute);
app.use("/loans", loanRoute);


app.listen(port, ()=>{
    console.log(`Server running at port numnber ${port}`);
});