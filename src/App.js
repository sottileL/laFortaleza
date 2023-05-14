import React, { useState } from 'react'
import './App.css'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import isMobile from 'is-mobile'

import Menu from './components/Menu'

const isMobileDevice = isMobile()

function App () {
    const CustomTypography = styled(Typography)(() => ({
        color: 'orange',
        fontWeight: 700,
        fontSize: 40,
        marginTop: 10,
        marginBottom: 50,
        textAlign: 'center'

    }))

    const CustomButton = styled(Button)(() => ({
        fontSize: 20,
        backgroundColor: 'orange',
        color: 'black',
        marginBottom: 10,
        textTransform: 'none',
        fontWeight: '600',
        width: isMobileDevice ? '90%' : '45%',
        alignSelf: 'center',
        border: '1px solid transparent',
        '&:hover': { backgroundColor: 'black', color: 'orange', border: '1px solid orange' }
    }))

    return (
        <Box sx={{ backgroundColor: 'black' }}>
            <Box sx={{
                backgroundColor: 'black',
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                width: '60vw',
                margin: 'auto'
            }}>
                <CustomTypography>
                    La Fortaleza
                </CustomTypography>
                <CustomButton>
                    Menú
                </CustomButton>
                {true && (
                    <Menu/>
                )}
            </Box>
        </Box>
    )
}

export default App
