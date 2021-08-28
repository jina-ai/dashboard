import React from 'react'
export type ButtonElementProps = React.HTMLAttributes<HTMLButtonElement>;
interface ButtonProps extends ButtonElementProps {
    label?: string
    variant?: 'primary' | 'secondary' | 'outlined'
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const getVariantStyles = (variant: string | undefined) => {
    switch(variant) {
        case 'primary': return 'bg-primary-500 hover:bg-primary-700 '
        case 'secondary': return 'bg-blue-500 hover:bg-blue-700 '
        default: return 'bg-gray-500 hover:bg-gray-700'
    }
}

export default function Button({ label, onClick, children, variant }: ButtonProps) {
    return (
        <button
            className={`${getVariantStyles(variant)} text-white font-bold py-2 px-4 rounded`}
            onClick={onClick}
            >
            {label}
            {children}
        </button>
    )
}