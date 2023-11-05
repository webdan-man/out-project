import Link from "next/link";
import {Button} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import React from "react";
import {apiRoutes} from "@/constants/constants";

export default function PageLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="flex gap-10 flex-col items-start">
            <Link href={apiRoutes.PROJECTS} passHref><Button icon={<ArrowLeftOutlined />}>Back</Button></Link>
            {children}
        </div>
    )

}