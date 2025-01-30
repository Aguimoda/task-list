import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

// Cargar variables de entorno
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Conectar a MongoDB
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI)
  .then(() => console.log(`🟢 Conectado a MongoDB (${dbURI})`))
  .catch(err => console.log("🔴 Error al conectar a MongoDB:", err));

// IMPORTAR RUTAS (DEBE IR DESPUÉS DE INICIALIZAR EXPRESS)
import taskRoutes from "./routes/taskRoutes.js";
app.use("/api/tareas", taskRoutes);

console.log("🔍 Rutas registradas en Express:");
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    // Si es una ruta directa (como app.get("/"))
    console.log(`✅ ${Object.keys(middleware.route.methods).join(", ").toUpperCase()} ${middleware.route.path}`);
  } else if (middleware.name === "router") {
    // Si es un Router (como taskRoutes.js), recorrer sus rutas internas
    middleware.handle.stack.forEach((subMiddleware) => {
      if (subMiddleware.route) {
        console.log(`✅ ${Object.keys(subMiddleware.route.methods).join(", ").toUpperCase()} /api/tareas${subMiddleware.route.path}`);
      }
    });
  }
});



// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
