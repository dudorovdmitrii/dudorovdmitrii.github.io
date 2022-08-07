import React, { useEffect } from "react"
import { Route, Routes } from "react-router-dom"

import { Home } from "../../pages"
import { WithLayout } from "../../layout"

import { AppProps } from "./AppProps"
import { useAppDispatch } from "../../store"
import { fetchProducts } from "../../store/slices/products"

// App component used for routing
export const App = WithLayout(({ className }: AppProps) => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchProducts())
    }, [])
    return (
        <>
            <Routes>
                <Route path={"/"} element={<Home className={className} />} />
            </Routes>
        </>)
})