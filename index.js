const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const PORT = process.env.PORT || 5000;

//middleware

app.use(cors());
app.use(express.json());

//POST new user's information
app.post("/user", async (req, res) => {
  try {
    // connect to Twillio api
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      PhoneNumber: req.body.phone,
      Day: req.body.day.toLowerCase(),
      Time: req.body.time,
      Week: req.body.week,
      FullName: req.body.name,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://pbx24by7.com/HeyYou/addUser.php", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    // insert new user here
    const newUser = await pool.query(
      "INSERT INTO users (user_phone, user_day, user_time, user_week, user_name, user_friend_name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        req.body.phone,
        req.body.day,
        req.body.time,
        req.body.week,
        req.body.name,
        req.body.friend_name,
      ]
    );
    res.status(200).json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("server error");
  }
});

// GET information for all users
app.get("/user", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.status(200).json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("server error");
  }
});

// DELETE a user from our database
app.delete("/user/:id", async (req, res) => {
  try {
    const deleteUser = await pool.query(
      "DELETE FROM users WHERE user_id = $1",
      [req.params.id]
    );
    res.status(200).json("User deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).json("server error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});
