import React from "react"
import cn from "classnames"
import { Link, useLocation } from "react-router-dom"

import { HeaderProps, linksList } from "./HeaderProps"

import styles from './Header.module.scss'
import LogoIcon from '../../public/icons/logo.svg'

// Header component
export const Header = ({ className }: HeaderProps) => {
    const { pathname } = useLocation()
    return (
        <header className={cn(className, styles.header)}>
            <Link
                to={"/ease"}
                className={styles.header_link}
                aria-label={'Home page'}
                aria-selected={pathname === "/ease"}
            >
                <LogoIcon className={styles.header_link_logo} />
            </Link>
            <nav className={styles.header_nav} role="navigation">
                {
                    linksList.map(linkName =>
                        <Link
                            key={linkName}
                            to={`/${linkName}`}
                            className={cn(styles.header_link, styles.header_nav_link, 'linkText')}
                            aria-selected={pathname === `/${linkName}`}
                        >
                            {linkName.toUpperCase()}
                        </Link>)
                }
            </nav>
        </header>)
}
Header.displayName = 'Header'