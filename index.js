const express = require("express");
const app = express();
const apiRoutes = require("./routes");
const {sequelize,ConnectToDb} = require("./db");


app.use(express.json());
app.use('/api',apiRoutes);

const port=process.env.PORT || 10002;
 
app.listen(port,async()=>{
console.log(`server is runing on http://localhost:${port}`);
await ConnectToDb();
});  