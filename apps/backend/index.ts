// import express from "express";
// import { prismaClient } from "db/client";

// const app = express();

// app.use(express.json());

// app.get("/users", (req, res) => {
//   prismaClient.user.findMany()
//     .then(users => {
//       res.json(users);
//     })
//     .catch(err => {
//       res.status(500).json({ error: err.message });
//     });
// })

// app.post("/user", (req, res) => {
//   const { username, password } = req.body;
  
//   if (!username || !password) {
//     res.status(400).json({ error: "Username and password are required" });
//     return
//   }

//   prismaClient.user.create({
//     data: {
//       username,
//       password
//     }
//   })
//     .then(user => {
//       res.status(201).json(user);
//     })
//     .catch(err => {
//       res.status(500).json({ error: err.message });
//     });
// })

// app.listen(8080);





// packages/your-app/index.ts (or wherever your server lives)
import express from "express";
// Import from the package that exposes db/client
// If you use package name "db" in monorepo, keep as below.
// If not, use a relative path like "../db/client"
import {prismaClient} from "db/client"; // works with default export
// OR: import { prismaClient } from "db/client"; // works with named export

const app = express();
app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const users = await prismaClient.user.findMany();
    res.json(users);
  } catch (err) {
    console.error("GET /users error:", err);
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

app.post("/user", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "Username and password are required" });

  try {
    const user = await prismaClient.user.create({
      data: { username, password },
    });
    res.status(201).json(user);
  } catch (err) {
    console.error("POST /user error:", err);
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

app.listen(8080, () => console.log("Server listening on http://localhost:8080"));
