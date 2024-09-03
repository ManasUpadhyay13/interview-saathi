import React from 'react'
import Header from './_components/Header'

const DashbaordLayout = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}

export default DashbaordLayout