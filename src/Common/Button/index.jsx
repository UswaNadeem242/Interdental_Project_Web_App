import React from 'react'

export default function ButtonUI({ title, onClick, className }) {
    return (
        <button onClick={onClick} className={`${className} bg-secondaryBrand  text-white font-semibold font-poppins text-sm  whitespace-nowrap`}>
            {title}
        </button>
    )
}

