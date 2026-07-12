"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  async function register(e:any){
    e.preventDefault();

    const res=await fetch("/api/register",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        email,
        password
      })
    });

    if(res.ok){
      alert("Registration Successful");
      router.push("/login");
    }else{
      alert("Registration Failed");
    }
  }

  return(
    <main className="max-w-md mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6">Register</h1>

      <form onSubmit={register} className="space-y-4">

        <input
        className="border p-2 w-full"
        placeholder="Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        />

        <input
        className="border p-2 w-full"
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />

        <input
        type="password"
        className="border p-2 w-full"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />

        <button
        className="bg-blue-600 text-white p-2 rounded w-full">
          Register
        </button>

      </form>
    </main>
  );
}