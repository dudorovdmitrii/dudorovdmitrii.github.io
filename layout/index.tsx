import React from "react"
import { BrowserRouter } from "react-router-dom"
import cn from 'classnames'

import { Header } from "./Header"
import { LayoutProps } from "./LayoutProps"

import styles from './Layout.module.scss'

const Layout = ({ children, className }: LayoutProps): JSX.Element => {
    return (
        <div className={cn(styles.layout, className)}>
            <BrowserRouter>
                <Header />
                {children}
            </BrowserRouter>
        </div>
    )
}

export const WithLayout = <T extends Record<string, unknown>>(Component: React.ComponentType<T>) => {
    return function InsideWithLayout(props: T): JSX.Element {
        return (
            <Layout>
                <Component {...props} />
            </Layout>
        )
    }
}