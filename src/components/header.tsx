import * as React from "react"

export default function Header({ heading }) {
    return <h1 onClick={() => console.log('test onclick')}>{heading}</h1>
}

