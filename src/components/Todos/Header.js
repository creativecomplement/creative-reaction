import React from "react"

const Header = () => {
    const headerStyle = {
        padding: "20px 0",
        lineHeight: "2em",
    }
    return(
        <header style={headerStyle}>
            <h1 style={{ fontSize: "25px", marginBottom: "15px" }}>Sample Todo App</h1>
            <p style={{ fontSize: "19px" }}>
                Add some to-do's and try it out
            </p>
        </header>
    )
}

export default Header