"use client";

import { useParams } from "next/navigation";
import ProjectDetails from "@/components/ProjectDetails";
import PageTransition from "@/components/PageTransition";

export default function ProjectPage() {
  const params = useParams();
  const id = params.id;
  
  return (
    <PageTransition>
      <ProjectDetails id={id} />
    </PageTransition>
  );
}
