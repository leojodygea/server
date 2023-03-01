const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

// Routes

// Add
app.post("/students", async (req, res) => {
  try {
    const { firstname, lastname, origin } = req.body;
    const newData = await pool.query(
      "INSERT INTO students (firstname, lastname, origin) VALUES ($1,$2,$3) RETURNING *",
      [firstname, lastname, origin]
    );
    res.json(newData.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//Get
app.get("/students", async (req, res) => {
  try {
    const allData = await pool.query("SELECT * FROM students");
    res.json(allData.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Upddate
app.put("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, origin } = req.body;
    const updateData = await pool.query(
      "UPDATE students set firstname = $1, lastname = $2, origin = $3 WHERE id = $4",
      [firstname, lastname, origin, id]
    );
    res.json("Data Diperbaharui");
  } catch (err) {
    console.error(err.message);
  }
});

//Delete
app.delete("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteData = await pool.query("DELETE FROM students WHERE id = $1", [
      id,
    ]);

    res.json("Data Dihapus");
  } catch (err) {
    console.error(err.message);
  }
});

//Server Start
app.listen(5000, () => {
  console.log("Server Started on Port 5000");
});
