const express = require("express");
const cors = require("cors");
const env = require("dotenv").config();
const colors = require("colors");
const port = process.env.PORT || 5000;

const connectDB = require("./config/connectDB");
connectDB(process.env.MONGO_URI);

const resetMongos_id = require("./config/resetMongos_id");
resetMongos_id();

const logger = require("./middleware/logger");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("storage"));

app.use(logger);

// Testing route and dep
app.get("/", (req, res) => {
  res.send("Hello there");
});

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/v1/good-categories", require("./routes/categoryRoutes"));
app.use("/api/v1/goods", require("./routes/productRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/v1/payment-methods", require("./routes/paymentMethodRoutes"));
app.use("/api/v1/delivery-methods", require("./routes/deliveryMethodRoutes"));
app.use('/api/v1/recipients', require("./routes/recipientRoutes"));
app.use('/api/v1/me/basket-items', require("./routes/basketRoutes"));
app.use('/api/v1/checkouts', require("./routes/checkoutRoutes"));
app.use('/api/v1/transactions', require("./routes/transactionRoutes"));


const { errorHandler } = require("./middleware/errorMiddleware");

app.use(errorHandler);


app.listen(port, () =>
  console.log(`listening on port ${port}`.cyan.underline)
);
