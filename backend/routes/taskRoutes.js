import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// Crear tarea
router.post("/", async (req, res) => {
  try {
    const nuevaTarea = new Task(req.body);
    await nuevaTarea.save();
    res.status(201).json(nuevaTarea);
  } catch (err) {
    res.status(500).json({ error: "Error al crear la tarea" });
  }
});

// Obtener todas las tareas
router.get("/", async (req, res) => {
    try {
        console.log("Se ha llamado a /api/tareas");

      const tareas = await Task.find();
      res.json(tareas);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las tareas" });
    }
  });

// Marcar tarea como completada
router.put("/:id", async (req, res) => {
  try {
    const tarea = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(tarea);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar la tarea" });
  }
});

// Eliminar tarea
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Tarea eliminada" });
});

export default router;
