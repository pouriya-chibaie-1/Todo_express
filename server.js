require("dotenv").config();
 
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const {testConnection, sequelize} = require("./config/dbConfig");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credential"); 
const verifyJWT = require("./middleware/verifyJWT");
const attachUserIdToRequest = require("./middleware/attachUserIdToRequest");
const roleRouter = require('./routes/api/roles');
const permissionRouter = require('./routes/api/permissions');

const PORT = process.env.PORT || 3500;
const db=sequelize  
console.log(new Date())
app.use(credentials); 
app.use(cors(corsOptions));

app.use(express.json()); 
app.use(cookieParser());   
db.sync({force: false}).then(({f}) => { 
  console.log('Database synchronized');
}).catch((err) => { 
  console.error('Error synchronizing database:', err);
});
// public routes
app.use("/register", require("./routes/api/register")); 
app.use("/auth", require("./routes/api/auth")); 
app.use("/logout", require("./routes/api/logout"));
app.use("/refresh", require("./routes/api/refresh"));

// protected routes
app.use(verifyJWT);
app.use(attachUserIdToRequest)
app.use("/project", require("./routes/api/Project"));
app.use("/users", require("./routes/api/users"));
app.use('/roles', roleRouter);
app.use('/permissions', permissionRouter);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("text").send("404 Not Found");
  }
});

app.use((err, req, res) => {
  res.status(500).send(err.message);
});

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
testConnection()
});