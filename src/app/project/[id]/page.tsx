'use client'
import ProjectEditPage from "@/components/common/ProjectEditPage";
import {getProject} from "@/services/getProjects";
import {Metadata} from "next";

async function generateMetadata({params: {id}}: ProjectEditPageProps): Promise<Metadata> {
    const project = await getProject(id);

    return {
        title: project?.title
    }
}

export type ProjectEditPageProps = {
    params: {
        id: string;
    }
}
export default function ProjectEdit({params}: ProjectEditPageProps) {
    return <ProjectEditPage params={params}/>;
}