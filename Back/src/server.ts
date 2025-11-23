import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import servicesRoutes from "./routes/services";
import bookingsRoutes from "./routes/bookings";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/", (req, res, next) => {
  // simple healthclear
  if (req.path === "/") return res.json({ message: "Backend funcionando" });
  next();
});

app.use("/", authRoutes);
app.use("/services", servicesRoutes);
app.use("/appointments", bookingsRoutes);

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
