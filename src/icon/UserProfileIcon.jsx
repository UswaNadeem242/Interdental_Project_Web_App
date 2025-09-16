import React from 'react'

export default function UserProfileIcon({ color = "#949494", ...props }) {
    return (
        <div><svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M10 8.83335C11.841 8.83335 13.3334 7.34097 13.3334 5.50002C13.3334 3.65907 11.841 2.16669 10 2.16669C8.15907 2.16669 6.66669 3.65907 6.66669 5.50002C6.66669 7.34097 8.15907 8.83335 10 8.83335Z" stroke={color} />
            <path d="M10 18C13.2217 18 15.8334 16.5076 15.8334 14.6666C15.8334 12.8257 13.2217 11.3333 10 11.3333C6.77836 11.3333 4.16669 12.8257 4.16669 14.6666C4.16669 16.5076 6.77836 18 10 18Z" stroke={color} />
        </svg>
        </div>
    )
}
