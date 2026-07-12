"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage(){

const[email,setEmail]=useState("");
const[password,setPassword]=useState("");

async function login(e:any){

e.preventDefault();

await signIn("credentials",{
email,
password,
callbackUrl:"/"
});

}

return(

<main className="max-w-md mx-auto p-10">

<h1 className="text-3xl font-bold mb-6">
Login
</h1>

<form
onSubmit={login}
className="space-y-4">

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
Login
</button>

</form>

</main>

);

}