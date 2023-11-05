'use client'


import {Layout} from "antd";

const { Content: AntdContent } = Layout;

export default function Content({children}: {children: React.ReactNode}) {
    return (
        <AntdContent style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            {children}
        </AntdContent>
    )
}
