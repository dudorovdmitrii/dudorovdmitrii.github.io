import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface AppProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
    className?: string
}