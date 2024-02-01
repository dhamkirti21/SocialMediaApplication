import { useTheme } from '@emotion/react'
import { Button } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const ConfirmPage = () => {
    const { pallete } = useTheme();
    const navigate = useNavigate();


    const handleClick = () => {
        navigate("/");
    }

    return (
        <div style={{
            textAlign: "center",
            padding: "10%"
        }}>
            <div>
                <h1>You Have SuccessFully Created Your Account 😎</h1>
                <Button variant="contained" onClick={handleClick}>Let's Go</Button>
            </div>
        </div>
    )
}

export default ConfirmPage