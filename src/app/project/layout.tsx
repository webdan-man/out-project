import Link from "next/link";
import {Button} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import React from "react";

export default function PageLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="flex gap-10 flex-col items-start">
            <Link href="/projects" passHref><Button icon={<ArrowLeftOutlined />}>Back</Button></Link>
            {children}
        </div>
    )

}