import { useParams } from "react-router-dom";

import ProjectDetails from "@/components/ProjectDetails";

export default function ProjectPage() {
    const { id } = useParams();
    return <ProjectDetails id={id} />;
}
