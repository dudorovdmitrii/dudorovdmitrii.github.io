import { DetailedHTMLProps, HTMLAttributes } from "react";
import { API_URL } from "../../settings";

export interface HomeProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
    className?: string
}

// Number of loading svg icons while waiting for the products
export const loadingListLength = 3

// Default genetal text
export const homeGeneralInfo = `Collection of lighting is inspired by the geometric works of the great Suprematist artists Kissitzky and Kazimir Malevich. 
\nSuprematism is a modernist movement in the art of the early twentieth century, focused on the basic geometric forms, such as circles, squares, lines and rectangles.The geometric structure of the lamps will always look like a small art objects in your house.`

// Home image paths
export const homeImageDayPath = API_URL + '/photos/day.webp'
export const homeImageNightPath = API_URL + '/photos/night.webp'


// Animations
export const animateFadeKeyframes = [
    { opacity: 1 },
    { opacity: 0 }
]

export const animateOptions = {
    duration: 300,
    iterations: 1
}

export const animateAppearKeyframes = [
    { opacity: 0 },
    { opacity: 1 }
]