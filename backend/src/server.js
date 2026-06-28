const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/db");
//1. Import dependencies
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

//2. Load environment variables
dotenv.config();
connectDB();
//3. Create Express app
const app = express();
//4. Register middleware
app.use(express.json());     //JSON parsing
app.use(cors());             //Frontend-Backend communication
app.use(helmet());           //Security Headers
app.use(morgan("dev"));      //Logging
app.use("/api/auth", authRoutes);

//5. Add a health-check route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Hospital Inventory API Running"
  });
});

app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});