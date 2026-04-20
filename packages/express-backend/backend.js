import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspiring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

const findUsers = ({ name, job }) =>
  users.users_list.filter((user) => {
    const nameMatches = name === undefined || user.name === name;
    const jobMatches = job === undefined || user.job === job;
    return nameMatches && jobMatches;
  });

const findUserById = (id) => users.users_list.find((user) => user.id === id);

const generateId = () => Math.random().toString(36).substr(2, 9);

const addUser = (user) => {
  const newUser = { ...user, id: generateId() };
  users.users_list.push(newUser);
  return newUser;
};

const deleteUserById = (id) => {
  const index = users.users_list.findIndex((user) => user.id === id);
  if (index === -1) {
    return null;
  }

  const [deletedUser] = users.users_list.splice(index, 1);
  return deletedUser;
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const { name, job } = req.query;
  const result = findUsers({ name, job });
  res.send({ users_list: result });
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const result = findUserById(id);

  if (result === undefined) {
    res.status(404).send("Resource not found.");
    return;
  }

  res.send(result);
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const addedUser = addUser(userToAdd);
  res.status(201).send(addedUser);
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const deletedUser = deleteUserById(id);

  if (deletedUser === null) {
    res.status(404).send("Resource not found.");
    return;
  }

  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
