'use client'
import {Button, Space} from "antd";
import Link from "next/link";
import PageCard from "@/components/common/PageCard";
import useSWR from "swr";
import {getAllProjects} from "@/services/getProjects";

export type CommentType = {
    author: string;
    avatar: string;
    content: string;
    datetime: string;
}

export type TaskType = {
    title: string;
    done: boolean;
}

export type ProjectType = {
    id: string;
    comments: CommentType[];
    title: string;
    tasks: TaskType[];
}

export default function ProjectsPage() {
    const {data: projects, isLoading } = useSWR("projects", getAllProjects);

    return (
        <div className="w-full flex flex-col gap-5">
            <Link href="/project">
                <Button style={{ width: 240, height: "auto" }} type="dashed" block>
                    + Add Project
                </Button>
            </Link>
            <Space direction="vertical">
                {projects?.map((project) => <PageCard key={project.id} project={project as ProjectType}/>)}
            </Space>
        </div>
    )
}