import { Router } from "express";
import { createBooking, getUserBookings } from "../controller/bookingsController";

const router = Router();

router.post("/", createBooking);
router.get("/", getUserBookings);

export default router;
