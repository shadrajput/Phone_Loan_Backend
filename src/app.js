const express = require("express");
const adminRouter = require("./routes/admin/admin.routes");
const imagekitAuthRouter = require("./routes/imagekit/imagekit.routes");
const mailRouter = require("./routes/mail/mail.route");
const userRouter = require("./routes/user/user.routes");
const emisRouter = require("./routes/emis/emis.routes");
const companyRouter = require("./routes/company/company.routes")
const errorMiddleware = require("./middlewares/errors");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public/images"));
app.use(express.urlencoded({ extended: false }));

app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/imagekit", imagekitAuthRouter);
app.use("/mail", mailRouter);
app.use("/emis", emisRouter);
app.use("/company", companyRouter);


// if(process.env.NODE_ENV == 'development'){
  // app.use(express.static('client/dist'))
  // app.get("/*", (req, res) => 
  //   res.sendFile(path.resolve(__dirname,'..','client','dist','index.html'))
  // )
// }
//Middleware for errors
app.use(errorMiddleware);


module.exports = app;
