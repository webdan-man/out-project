import {Metadata} from "next";
import ProjectPage from "@/components/common/ProjectPage";

export const metadata: Metadata = {
    title: 'New Project | OUT Project',
}

export default function Project() {
    return (
        <ProjectPage />
    );
}