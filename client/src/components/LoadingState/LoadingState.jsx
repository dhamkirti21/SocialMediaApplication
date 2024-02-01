import React from 'react'
import "./Loader.css"
const LoadingState = ({ loading, message }) => {

    return (
        <div className="overlay">
            <div className="spinner"></div>
            <h3>{message}</h3>
        </div>
    )
}

export default LoadingState


