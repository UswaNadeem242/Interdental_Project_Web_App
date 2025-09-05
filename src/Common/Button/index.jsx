import React from 'react'

export function PrimaryButtonUI({ title, onClick, className }) {
    return (
        <button onClick={onClick} className={`${className} bg-secondaryBrand  text-white font-semibold font-poppins text-sm  whitespace-nowrap`}>
            {title}
        </button>
    )
}

export function SecondaryButton({ title, onClick, className, icon }) {
    return (
        <button onClick={onClick} className={`${className}   font-semibold font-poppins text-sm  whitespace-nowrap`}>
            {icon}     {title}
        </button>
    )
}