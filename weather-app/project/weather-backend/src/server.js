import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Optional: log all incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

// Root route
app.get("/", (req, res) => {
  console.log("Request received at /");
  res.send("Backend is running! Go to /weather for test data.");
});

// Weather route
app.get("/weather", (req, res) => {
  console.log("Request received at /weather"); // prints in CMD
  const data = { message: "Weather API is working!" };
  console.log("Sending response:", data); // prints response in CMD
  res.json(data);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
