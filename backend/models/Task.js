import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  completada: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Task", taskSchema, "Tareas"); // Especificamos "Tareas"
