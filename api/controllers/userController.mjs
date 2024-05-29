import { User } from "../models/userModel.mjs";
const getAllUsers = async (req, res) => {
  try {
    const books = await User.find({});
    res.status(200).send({ count: books?.length, data: books });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const book = await User.findById(id);
    if (!book?.title)
      return res.status(404).send({ message: "User not found" });
    return res.status(200).send({ count: book?.length, data: book });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { title, author, publishedYear } = req?.body;
    if (!title || !author || !publishedYear) {
      return res.status(400).send({ message: "All field are required" });
    }
    await User.findByIdAndUpdate(id, req.body);
    return res.status(200).send("User updated successfully");
  } catch (err) {
    console.error(err.message || err);
    res.status(500).send({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id)
      return res.status(400).response({ message: "User id is required" });
    await User.findByIdAndDelete(id);
    return res.status(200).send({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err.message || err);
    res.status(500).send({ message: err.message });
  }
};

export const userController = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
