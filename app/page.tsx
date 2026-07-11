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
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data);
  }

  useEffect(() => {
    loadTasks();
  }, []);

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
    <main className="max-w-4xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6">Student Task Manager</h1>
<input
  className="border p-2 w-full mb-5"
  placeholder="Search tasks..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
      <form onSubmit={addTask} className="space-y-4 mb-8">
        <input
          className="border p-2 w-full"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="border p-2 w-full"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
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
  className="border rounded-xl shadow-md p-5 mb-4 bg-white"
>
            <input
  className="border p-2 w-full mb-2"
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
  className="border p-2 w-full"
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
  className="border p-2 mt-2"
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
  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
>
  Delete
</button>
          </div>
        ))
      )}
    </main>
  );
}