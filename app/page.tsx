"use client";

import { useEffect, useState } from "react";

type Task = {
  id: string;
  title: string;
  description: string | null;
  status: string;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
async function loadTasks() {
  try {
    const res = await fetch("/api/tasks");

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    setTasks(data);
  } catch (error) {
    console.error("Error loading tasks:", error);
    setTasks([]);
  }
}
  
  async function addTask(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });

    setTitle("");
    setDescription("");
    loadTasks();
  }
  async function deleteTask(id: string) {
  await fetch(`/api/tasks/${id}`, {
    method: "DELETE",
  });

  loadTasks();
}

  return (
    <main className="min-h-screen bg-slate-100 py-10">
  <div className="max-w-4xl mx-auto px-6">
      <h1 className="text-5xl font-extrabold text-center text-indigo-700 mb-8">Student Task Manager</h1>
<input
 className="w-full rounded-xl border border-gray-300 bg-white p-3 shadow-sm mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  placeholder="Search tasks..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
      <form
  onSubmit={addTask}
  className="bg-white rounded-2xl shadow-lg p-6 space-y-4 mb-8"
>
        <input
          className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
         className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold shadow-md transition"
          type="submit"
        >
          Add Task
        </button>
      </form>

      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        tasks
  .filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  )
  .map((task) => (
          <div
  key={task.id}
  className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6"
>
            <input
  className="w-full rounded-lg border border-gray-300 p-3 mb-3"
  defaultValue={task.title}
  onBlur={async (e) => {
    await fetch(`/api/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: e.target.value,
        description: task.description,
        status: task.status,
      }),
    });

    loadTasks();
  }}
/>

<textarea
 className="w-full rounded-lg border border-gray-300 p-3"
  defaultValue={task.description ?? ""}
  onBlur={async (e) => {
    await fetch(`/api/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: task.title,
        description: e.target.value,
        status: task.status,
      }),
    });

    loadTasks();
  }}
/>
           <select
  value={task.status}
  className="rounded-lg border border-gray-300 p-2 mt-4 bg-white"
  onChange={async (e) => {
    await fetch(`/api/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        status: e.target.value,
      }),
    });

    loadTasks();
  }}
>
  <option value="Pending">Pending</option>
  <option value="In Progress">In Progress</option>
  <option value="Completed">Completed</option>
</select>
            <button
  onClick={() => deleteTask(task.id)}
  className="mt-4 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
>
  Delete
</button>
          </div>
        ))
      )}
      </div>
    </main>
  );
}