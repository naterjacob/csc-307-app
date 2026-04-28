import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {
  addUser,
  deleteUserById,
  findUserById,
  findUsers,
} from "./services/user-service.js";

const app = express();
const port = 8000;

dotenv.config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  try {
    const name = typeof req.query.name === "string" ? req.query.name : undefined;
    const job = typeof req.query.job === "string" ? req.query.job : undefined;
    const result = await findUsers({ name, job });
    res.send({ users_list: result });
  } catch (error) {
    res.status(500).send("Unable to fetch users.");
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await findUserById(id);

    if (result === null) {
      res.status(404).send("Resource not found.");
      return;
    }

    res.send(result);
  } catch (error) {
    res.status(500).send("Unable to fetch user.");
  }
});

app.post("/users", async (req, res) => {
  try {
    const userToAdd = req.body;
    const addedUser = await addUser(userToAdd);
    res.status(201).send(addedUser);
  } catch (error) {
    res.status(400).send("Invalid user payload.");
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await deleteUserById(id);

    if (deletedUser === null) {
      res.status(404).send("Resource not found.");
      return;
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).send("Unable to delete user.");
  }
});

const { MONGO_CONNECTION_STRING } = process.env;

if (MONGO_CONNECTION_STRING === undefined) {
  console.error("Missing MONGO_CONNECTION_STRING in environment.");
  process.exit(1);
}

mongoose.set("debug", true);

mongoose
  .connect(MONGO_CONNECTION_STRING, { dbName: "users" })
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch((error) => console.error(error));
