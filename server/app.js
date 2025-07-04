require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");


const authRoutes = require("./routes/auth");
const plantsRoutes = require("./routes/plants");
const remindersRoutes = require("./routes/reminders");
const communityRoutes = require("./routes/community");
const supportRoutes = require("./routes/support");
const plantdbRoutes = require("./routes/plantdb");



const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/plants", plantsRoutes);
app.use("/api/reminders", remindersRoutes);
app.use("/api/community", communityRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/support", supportRoutes);
app.use("/api/plantdb", plantdbRoutes);



app.listen(5000, () => console.log("Backend en puerto 5000"));
