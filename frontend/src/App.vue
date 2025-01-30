<script setup>
import { ref, onMounted } from "vue";
import api from "./api.js";
import "./assets/styles.css"; // Importamos el CSS externo

const tareas = ref([]);
const nuevaTarea = ref("");

const obtenerTareas = async () => {
  try {
    const respuesta = await api.get("/tareas");
    tareas.value = respuesta.data;
  } catch (error) {
    console.error("Error al obtener tareas:", error);
  }
};

const agregarTarea = async () => {
  if (!nuevaTarea.value.trim()) return;

  try {
    const respuesta = await api.post("/tareas", { nombre: nuevaTarea.value, completada: false });
    tareas.value.push(respuesta.data);
    nuevaTarea.value = "";
  } catch (error) {
    console.error("Error al agregar tarea:", error);
  }
};

const eliminarTarea = async (id) => {
  try {
    await api.delete(`/tareas/${id}`);
    tareas.value = tareas.value.filter((tarea) => tarea._id !== id);
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
  }
};

const completarTarea = async (id, estado) => {
  try {
    const respuesta = await api.put(`/tareas/${id}`, { completada: !estado });
    const tareaIndex = tareas.value.findIndex((t) => t._id === id);
    if (tareaIndex !== -1) {
      tareas.value[tareaIndex].completada = respuesta.data.completada;
    }
  } catch (error) {
    console.error("Error al completar tarea:", error);
  }
};

onMounted(obtenerTareas);
</script>

<template>
  <div class="container">
    <h1>Lista de Tareas 📝</h1>

    <div class="input-container">
      <input v-model="nuevaTarea" placeholder="Nueva tarea..." @keyup.enter="agregarTarea" />
      <button @click="agregarTarea">➕</button>
    </div>

    <ul>
      <li v-for="tarea in tareas" :key="tarea._id">
        <span :class="{ completada: tarea.completada }" @click="completarTarea(tarea._id, tarea.completada)">
          {{ tarea.nombre }}
        </span>
        <button class="delete" @click="eliminarTarea(tarea._id)">❌</button>
      </li>
    </ul>
  </div>
</template>
