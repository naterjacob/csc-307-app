import User from "../models/user.js";

const buildUserFilter = ({ name, job }) => {
  const filter = {};

  if (name !== undefined) {
    filter.name = name;
  }

  if (job !== undefined) {
    filter.job = job;
  }

  return filter;
};

export const findUsers = ({ name, job }) =>
  User.find(buildUserFilter({ name, job }));

export const findUserById = (id) => User.findById(id);

export const addUser = (user) => User.create(user);

export const deleteUserById = (id) => User.findByIdAndDelete(id);
