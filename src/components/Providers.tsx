'use client'

import React from "react";
import {SessionProvider} from 'next-auth/react'
import StyledComponentsRegistry from './AntdRegistry'

export const Providers = ({children}: {children: React.ReactNode}) => {
    return (
        <SessionProvider>
            <StyledComponentsRegistry>
                {children}
            </StyledComponentsRegistry>
        </SessionProvider>
    )
}