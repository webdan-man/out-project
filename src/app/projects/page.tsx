import {Metadata} from "next";
import ProjectsPage from "@/components/common/ProjectsPage";

export const metadata: Metadata = {
    title: 'Projects | OUT Project',
}

export default function Projects() {
    return <ProjectsPage />;
}