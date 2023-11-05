'use client'
import React, {useState} from "react";
import type { MenuProps } from 'antd';
import {Layout, Menu} from "antd";
import Link from "next/link";
import {
    CloudOutlined,
    UserOutlined,
    HomeOutlined
} from '@ant-design/icons';
import {usePathname} from "next/navigation";
import {useSession} from "next-auth/react";
import Image from "next/image";
import {useWindowSize} from 'react-use';
import {apiRoutes} from "@/app/api/auth/[...nextauth]/route";

const { Sider: AntdSider } = Layout;

export default function Sider() {
    const {data} = useSession();

    const pathName = usePathname()

    const {width} = useWindowSize();

    const items: MenuProps['items'] = [
        {
            key: apiRoutes.DEFAULT,
            icon: <HomeOutlined/>,
            label: <Link href={apiRoutes.DEFAULT}>Home</Link>,
        },
        {
            key: apiRoutes.PROJECTS,
            icon: <CloudOutlined/>,
            label: <Link href={apiRoutes.PROJECTS}>Projects</Link>,
        },
        {
            key: apiRoutes.PROFILE,
            icon: <UserOutlined/>,
            label: <Link href={apiRoutes.PROFILE}>Profile</Link>,
        }
    ];

    const [collapsed, setCollapsed] = useState(false);

    return (
        <AntdSider
            collapsible={width > 500}
            collapsed={width <= 500 || collapsed}
            onCollapse={(value) => setCollapsed(value)}
        >
            {(data?.user?.image && data?.user?.name)
                ? <div className="flex mx-[24px] my-[16px]">
                    <Link key="edit" href='/profile'>
                        <Image src={data?.user?.image} alt={data?.user?.name } width={32} height={32} className="rounded-[6px]"/>
                    </Link>
                </div>
                : <div className="h-[32px] m-[16px] rounded-[6px] bg-[rgba(255,255,255,.2)]"/>}
            <Menu theme="dark" mode="inline" selectedKeys={[pathName]} items={items} />
        </AntdSider>
    )
}
