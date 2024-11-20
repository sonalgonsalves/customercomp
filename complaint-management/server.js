const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const complaintsRoutes = require("./routes/complaints");
const userModel = require("./models/users")

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/complaintManagement", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    //we set up admin credentials
    userModel.findOne({ name: "admin" }).then((admin) => {
      if (!admin) {
        userModel.create({ name: "admin", email:"admin@test.com", password: "admin123" })
          .then(() => console.log("Admin user created"))
          .catch((err) => console.error("Error creating admin user:", err));
      }
    });
  })
  .catch((err) => console.error(err));

app.post('/login', (req, res) => {
  const { name, password } = req.body;

  userModel.findOne({ name: name })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json("Success");
        } else {
          res.json("Password is incorrect");
        }
      } else {
        res.json("No record exists!");
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});


  app.post("/users", async (req, res) => {
    try {
      const user = await userModel.create(req.body);
      res.status(201).json({ message: "User created successfully", user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  app.post('/resetpassword', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        user.password = password; 
        await user.save();

        res.json({ success: true, message: "Password reset successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: "An error occurred while resetting the password" });
    }
});

// Routes
app.use("/api/complaints", complaintsRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
