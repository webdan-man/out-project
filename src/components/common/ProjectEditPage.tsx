'use client'

import {getAllProjects, getProject, updateProject, useProjects} from "@/services/getProjects";
import useSWR from "swr";
import {useRouter} from 'next/navigation'
import {ProjectEditPageProps, ProjectType} from "@/types/ProjectTypes";
import ProjectEditForm from "@/components/common/ProjectEditForm";


export default function ProjectEditPage({params: {id}}: ProjectEditPageProps) {
    const { projects, mutate } = useProjects();
    const {data: project} = useSWR(["projects", id], () => getProject(id));

    const router = useRouter()

    const onFinish = async (values: any) => {
        const projectsUpdated = projects || [];
        const projectId = projectsUpdated.findIndex((p) => p.id === project?.id);
        if (projectId) {
            projectsUpdated[projectId] = {...project, ...values}
        }
        await updateProject(projectsUpdated[projectId]);
        await mutate([...projectsUpdated])
        await router.push('/projects')
    };

    return (project && <ProjectEditForm onFinish={onFinish} project={project as ProjectType} />);
}