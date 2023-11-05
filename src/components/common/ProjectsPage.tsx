'use client'
import {Button, Space} from "antd";
import Link from "next/link";
import PageCard from "@/components/common/PageCard";
import useSWR from "swr";
import {getAllProjects} from "@/services/getProjects";
import {ProjectType} from "@/types/ProjectTypes";
import {apiRoutes} from "@/app/api/auth/[...nextauth]/route";

export default function ProjectsPage() {
    const {data: projects, isLoading } = useSWR("projects", getAllProjects);

    return (
        <div className="w-full flex flex-col gap-5">
            <Link href={apiRoutes.PROJECT}>
                <Button className="w-full max-w-[240px]" style={{ height: "auto" }} type="dashed" block>
                    + Add Project
                </Button>
            </Link>
            <Space direction="vertical">
                {projects?.map((project) => <PageCard key={project.id} project={project as ProjectType}/>)}
            </Space>
        </div>
    )
}