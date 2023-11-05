'use client'

import {createProject, getAllProjects, useProjects} from "@/services/getProjects";
import {useRouter} from "next/navigation";
import useSWR from "swr";
import ProjectEditForm from "@/components/common/ProjectEditForm";

export default function ProjectPage() {
    const { projects, mutate } = useProjects();
    const router = useRouter()

    const onFinish = async (values: any) => {
        const newProject = await createProject(values);
        await mutate([...(projects || []), {...values, id: newProject.id}])
        await router.push('/projects')
    };

    return (<ProjectEditForm onFinish={onFinish} />);
}