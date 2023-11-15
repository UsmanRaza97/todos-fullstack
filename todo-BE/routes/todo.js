const router = require("express").Router();
const Todo_model = require("../models/todo");

router.get("/", async (req, res) => {
  try {
    const todos = await Todo_model.find();

    res.send(todos);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { todo } = req.body;
    if (!todo) {
      return res.status(400).json({ error: "Todo content is required." });
    }
    const newTodo = new Todo_model({ todo });
    await newTodo.save();

    res.status(201).send({ message: "Todo successfully added" });
  } catch (err) {
    console.error("Error adding todo:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { todo: updatedTodo } = req.body;
    if (!updatedTodo) {
      return res.status(400).json({ error: "Updated todo is required." });
    }

    const todo = await Todo_model.findByIdAndUpdate(
      id,
      { todo: updatedTodo },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ error: "Todo not found." });
    }

    res.send(todo);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo_model.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found." });
    }

    res.send({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
