import { prisma } from "@/lib/prisma";
import LookbookProjectPage from "./page.client";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await prisma.lookbookProject.findUnique({
    where: { slug },
    select: { title: true, description: true },
  });
  if (!project) return { title: "Lookbook" };
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await prisma.lookbookProject.findUnique({
    where: { slug },
    include: { images: { orderBy: { order: "asc" } } },
  });

  if (!project) notFound();

  return <LookbookProjectPage project={project} />;
}
