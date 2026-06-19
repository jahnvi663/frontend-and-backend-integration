const express = require("express");
const db = require("./database");

const cors = require("cors");const app = express();

app.use(express.json());
app.use(cors());
app.get("/hello", (req, res) => {
  res.send("HELLO FROM NEW SERVER");
});

// Home Route
app.get("/", (req, res) => {
  res.send("Database Integration Project Running");
});

// CREATE
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  db.run(
    "INSERT INTO contacts(name,email,message) VALUES(?,?,?)",
    [name, email, message],
    function (err) {
      if (err) return res.status(500).send(err.message);

      res.send("Contact Added Successfully");
    }
  );
});

// UPDATE
app.put("/contact/:id", (req, res) => {
  const { message } = req.body;

  db.run(
    "UPDATE contacts SET message=? WHERE id=?",
    [message, req.params.id],
    function (err) {
      if (err) return res.status(500).send(err.message);

      res.send("Contact Updated");
    }
  );
});

// DELETE
app.delete("/contact/:id", (req, res) => {
  db.run(
    "DELETE FROM contacts WHERE id=?",
    [req.params.id],
    function (err) {
      if (err) return res.status(500).send(err.message);

      res.send("Contact Deleted");
    }
  );
});

// READ
app.get("/contacts", (req, res) => {
  db.all("SELECT * FROM contacts", [], (err, rows) => {
    if (err) return res.status(500).send(err.message);

    res.json(rows);
  });
});

app.get("/test", (req, res) => {
  res.send("Test Route Working");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

console.log("File loaded completely");

app.get("/addsample", (req, res) => {
  db.run(
    "INSERT INTO contacts(name,email,message) VALUES(?,?,?)",
    ["Jahnvi", "jahnvi.mittal.cseai.2024@miet.ac.in", "Hello World"],
    function(err) {
      if (err) return res.send(err.message);

      res.send("Sample Contact Added");
    }
  );
});
app.get("/contacts", (req, res) => {
    db.all("SELECT * FROM contacts", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(rows);
    });
});