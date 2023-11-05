'use client'

import {Button, Layout} from 'antd';
import {signOut} from "next-auth/react";
import Link from "next/link";

const { Header: AntdHeader } = Layout;

const Header = () => {
    return (
        <AntdHeader className='flex justify-end gap-4'>
            <Link passHref href="#" onClick={() => signOut()}>
                <Button type='primary'>Sign Out</Button>
            </Link>
        </AntdHeader>
    )
}

export { Header }