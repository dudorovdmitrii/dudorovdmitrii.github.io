import React, { useRef, useState } from 'react'
import cn from 'classnames'

import { useAppSelector } from '../../store'
import { dispatchAnimation } from '../../helpers/animate'
import { emptyProduct } from '../../globalTypes'

import {
    HomeProps, homeImageDayPath, homeImageNightPath, homeGeneralInfo, animateFadeKeyframes,
    animateOptions, animateAppearKeyframes, loadingListLength
} from './HomeProps'

import styles from './Home.module.scss'
import MoonIcon from '../../public/icons/moon.svg'
import SunIcon from '../../public/icons/sun.svg'
import LoadingIcon from '../../public/icons/loading.svg'

// Home page component
export const Home = ({ className }: HomeProps): JSX.Element => {
    const detailsImageRef = useRef<HTMLImageElement>(null)
    const lampImageRef = useRef<HTMLImageElement>(null)
    const homeImageRef = useRef<HTMLImageElement>(null)

    const [currentProductId, setCurrentProductId] = useState(0)
    const [homeImagePath, setHomeImagePath] = useState(homeImageDayPath)

    const products = useAppSelector(state => state.products.products)
    const { id, material, weight, electrification, width, height, isDarkMode, image } = products[currentProductId] ?? emptyProduct

    const getElectrification = () => {
        // Get prettified electrification field

        return electrification.replace(/,/g, ' |')
    }
    const getMaterial = () => {
        // Get prettified material field

        return material[0].toUpperCase() + material.slice(1,)
    }
    const getWeight = () => {
        // Get prettified weight field

        return weight.toString().replace(/\./, ',') + ' kg'
    }

    const getProductDetailsCircleHTML = () => {
        // Get HTML for product details paragraph

        return (
            products[currentProductId]
                ?
                <p className={cn(styles.productDetails_circle_text, 'detailsTextStrong')}>
                    Material: <span className={'detailsTextLight'}>{getMaterial()}</span>
                    {'\n\n'}Dimensions (cm): <span className={'detailsTextLight'}>H {height} x W {width} x D {width}</span>
                    {'\n\n'}Net Weight: <span className={'detailsTextLight'}>{getWeight()}</span>
                    {'\n\n'}Electrification: {'\n'}<span className={'detailsTextLight'}>{getElectrification()}</span>
                </p>
                :
                ''
        )
    }
    const getProductListHTML = () => {
        // Get HTML for list of products

        return (
            products.length
                ?
                products.map(product => (
                    <li
                        tabIndex={0}
                        key={product.id}
                        data-id={product.id}
                        onKeyDown={handleChooseProduct}
                        onClick={handleChooseProduct}
                        className={cn(styles.productDetails_actions_productList_product, styles.responsiveProduct, { [styles.chosenProduct]: product.id === id })}
                        aria-label={'Product'}
                        aria-selected={id === product.id}
                    >
                        <img
                            src={product.image}
                            alt={'Product image'}
                            className={cn(styles.productDetails_actions_productList_product_img)} />
                    </li>))
                :
                new Array(loadingListLength).fill(null).map((val, id) => {
                    return (
                        <li
                            key={id}
                            className={cn(styles.productDetails_actions_productList_product)}>
                            <LoadingIcon className={cn(styles.productDetails_actions_productList_product_img, styles.loadingImage)} />
                        </li>)

                })
        )
    }
    const getProductImageHTML = () => {
        // Get HTML for product image in product details paragraph

        return (
            image
                ?
                <img
                    alt={'Product image'}
                    src={image}
                    ref={detailsImageRef}
                    className={styles.productDetails_image} />
                :
                <LoadingIcon className={cn(styles.productDetails_image, styles.loadingImage)} />)
    }
    const getLampImageHTML = () => {
        // Get HTML for product image above home image

        return (
            products.length
                ?
                <img
                    ref={lampImageRef}
                    src={image}
                    className={styles.imageWrapper_lampImage} alt={'Lamp image'} />
                :
                <LoadingIcon className={cn(styles.imageWrapper_lampImage, styles.loadingImage)} />
        )
    }

    const handleSetImageMode = async (event: React.MouseEvent) => {
        // Handle day/night home image switch

        const button = (event.target as HTMLElement).closest('button')
        const mode = button.dataset.mode

        if (mode === 'night' && !isDarkMode) return
        if (mode === 'day' && homeImagePath === homeImageDayPath) return
        if (mode === 'night' && homeImagePath === homeImageNightPath) return

        const fadeAnimation = [
            dispatchAnimation(homeImageRef, animateFadeKeyframes, animateOptions),
            dispatchAnimation(lampImageRef, animateFadeKeyframes, animateOptions)
        ]
        const appearInimation = [
            dispatchAnimation(homeImageRef, animateAppearKeyframes, animateOptions),
            dispatchAnimation(lampImageRef, animateAppearKeyframes, animateOptions)
        ]

        // Perform fade animation for the previous product
        await Promise.all(fadeAnimation.map(func => func()))

        lampImageRef.current.classList.toggle(styles.hidden_image)
        setHomeImagePath(mode === 'night' ? homeImageNightPath : homeImageDayPath)

        // Perform appear animation for the chosen product
        await Promise.all(appearInimation.map(func => func()))
    }
    const handleChooseProduct = async (event: React.MouseEvent | React.KeyboardEvent) => {
        // Handle product choosing from the products list

        if (event.type === 'keydown' && (event as React.KeyboardEvent).key !== 'Enter') return
        event.preventDefault()

        const li = (event.target as HTMLElement).closest('li')
        const newId = parseInt(li.dataset.id) - 1

        // Stop highlighting the previous product
        li.classList.remove(styles.chosenProduct)

        const fadeAnimation = [
            dispatchAnimation(detailsImageRef, animateFadeKeyframes, animateOptions),
            dispatchAnimation(lampImageRef, animateFadeKeyframes, animateOptions)
        ]
        const appearInimation = [
            dispatchAnimation(detailsImageRef, animateAppearKeyframes, animateOptions),
            dispatchAnimation(lampImageRef, animateAppearKeyframes, animateOptions)
        ]

        // Handle case when the chosen product doesn`t have the night mode (adding animation)
        if (!products[newId].isDarkMode && homeImagePath === homeImageNightPath) {
            fadeAnimation.push(dispatchAnimation(homeImageRef, animateFadeKeyframes, animateOptions))
            appearInimation.push(dispatchAnimation(homeImageRef, animateAppearKeyframes, animateOptions))
        }

        // Perform fade animation for the previous product
        await Promise.all(fadeAnimation.map(func => func()))

        setCurrentProductId(newId)

        // Handle case when the chosen product doesn`t have the night mode (updating state)
        if (!products[newId].isDarkMode && homeImagePath === homeImageNightPath) {
            lampImageRef.current.classList.toggle(styles.hidden_image)
            setHomeImagePath(homeImageDayPath)
        }

        // Perform appear animation for the chosen product
        await Promise.all(appearInimation.map(func => func()))
    }

    return (
        <main className={cn(className, styles.home)} role="main">
            <section className={cn(styles.info, 'generalText')} aria-label={'General information'}>
                <div className={styles.textPositioningWrapper1}>
                    <div className={styles.textPositioningWrapper2}>
                        {homeGeneralInfo}
                    </div>
                </div>

            </section>
            <div className={styles.productDetails} aria-label={'Product details'}>
                <div className={cn(styles.productDetails_circle)} aria-label={'Product сharacteristics'}>
                    {getProductDetailsCircleHTML()}
                </div>
                {getProductImageHTML()}
                <aside className={styles.productDetails_actions} aria-label={'Actions'}>
                    <ul className={styles.productDetails_actions_productList} tabIndex={0} aria-label={'List of products'}>
                        {getProductListHTML()}
                    </ul>
                    <div className={styles.productDetails_actions_buttons} aria-label={'List of buttons'}>
                        <button
                            onClick={handleSetImageMode}
                            data-mode={"day"}
                            className={styles.productDetails_actions_buttons_button}
                            aria-label={"Switch to day mode"}
                            aria-selected={homeImagePath === homeImageDayPath}
                        >
                            <SunIcon />
                        </button>
                        <button
                            onClick={handleSetImageMode}
                            data-mode={"night"}
                            className={styles.productDetails_actions_buttons_button}
                            aria-label={"Switch to night mode"}
                            aria-selected={homeImagePath === homeImageNightPath}
                        >
                            <MoonIcon />
                        </button>
                    </div>
                </aside>
            </div>
            <figure className={styles.imageWrapper}>
                <img
                    alt={"Home image"}
                    src={homeImagePath}
                    ref={homeImageRef}
                    className={styles.imageWrapper_homeImage}
                />
                {getLampImageHTML()}
            </figure>
        </main>
    )
}
Home.displayName = 'Home'
