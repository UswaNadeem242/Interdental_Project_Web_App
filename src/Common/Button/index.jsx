import React from 'react'
import { NavLink } from 'react-router-dom'

export function PrimaryButtonUI({ title, onClick, className, href }) {
    return (
        <NavLink to={href}>
            <button onClick={onClick} className={`${className} bg-secondaryBrand  text-white   font-poppins text-sm  whitespace-nowrap`}>
                {title}
            </button>
        </NavLink>

    )
}

export function SecondaryButton({ title, onClick, className, icon, href }) {
    return (
        <NavLink to={href}>
            <button onClick={onClick} className={`${className} font-poppins text-sm  whitespace-nowrap`}>
                {icon}     {title}
            </button>
        </NavLink>

    )
}