import { prisma } from "@/lib/prisma";
import LookbookProjectPage from "./page.client";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const projects = await prisma.lookbookProject.findMany({
    select: { slug: true },
  });
  return projects.map((p: { slug: string }) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await prisma.lookbookProject.findUnique({
    where: { slug: params.slug },
    select: { title: true, metaTitle: true, metaDescription: true },
  });
  if (!project) return { title: "Lookbook" };
  return {
    title: project.metaTitle || project.title,
    description: project.metaDescription,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const project = await prisma.lookbookProject.findUnique({
    where: { slug: params.slug },
    include: { images: { orderBy: { order: "asc" } } },
  });

  if (!project) notFound();

  return <LookbookProjectPage project={project} />;
}
