import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const tasks = await prisma.task.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(tasks);
}
export async function POST(request: Request) {
  const body = await request.json();

 let user = await prisma.user.findFirst();

if (!user) {
  const hashedPassword = await bcrypt.hash("demo123", 10);

  user = await prisma.user.create({
    data: {
      name: "Demo User",
      email: "demo@example.com",
      password: hashedPassword,
    },
  });
}

  const task = await prisma.task.create({
    data: {
      title: body.title,
      description: body.description,
      status: "Pending",
      userId: user.id,
    },
  });

  return NextResponse.json(task);
}