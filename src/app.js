const express = require("express");
const adminRouter = require("./routes/admin/admin.routes");
const imagekitAuthRouter = require("./routes/imagekit/imagekit.routes");
const mailRouter = require("./routes/mail/mail.route");
const userRouter = require("./routes/user/user.routes");
const installmentRouter = require("./routes/installment/installment.route");
const phoneRouter = require("./routes/phone/phone.route");
const companyRouter = require("./routes/company/company.route")
const customerRouter = require("./routes/customer/customer.route")
const documentRouter = require("./routes/document/document.route")
const purchaseRouter = require("./routes/purchase/purchase.route")
const receiptRouter = require("./routes/receipt/receipt.route")
const emiRouter = require("./routes/emi/emi.route")
const specificationRouter = require("./routes/specification/specification.route")
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
app.use("/installment", installmentRouter);
app.use("/company", companyRouter);
app.use("/phone", phoneRouter);
app.use("/specification", specificationRouter);
app.use("/customer", customerRouter);
app.use("/document", documentRouter);
app.use("/purchase", purchaseRouter);
app.use("/receipt", receiptRouter);
app.use("/emi", emiRouter);


// if(process.env.NODE_ENV == 'development'){
// app.use(express.static('client/dist'))
// app.get("/*", (req, res) => 
//   res.sendFile(path.resolve(__dirname,'..','client','dist','index.html'))
// )
// }
//Middleware for errors
app.use(errorMiddleware);


module.exports = app;
