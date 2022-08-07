export interface ProductInterface {
    id: number,
    name: string,
    published_at: string,
    material: string,
    height: number,
    width: number,
    weight: number,
    electrification: string,
    image: string,
    isDarkMode: boolean
}

export const emptyProduct: ProductInterface = {
    id: null,
    name: '',
    published_at: '',
    material: '',
    weight: null,
    electrification: '',
    width: null,
    height: null,
    isDarkMode: false,
    image: ''
}