import React from 'react'
import './App.css'

import './fonts/FSEmeric/stylesheet.css'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import logo from './images/logo.jpg'

import isMobile from 'is-mobile'

import Menu from './components/Menu'

const isMobileDevice = isMobile()

function App () {
    const CustomTypography = styled(Typography)(() => ({
        fontFamily: 'FS Emeric',
        color: 'orange',
        fontWeight: 700,
        fontSize: 25,
        marginTop: 10,
        marginBottom: 5,
        textAlign: 'center'

    }))

    const CustomButton = styled(Button)(() => ({
        fontSize: 15,
        backgroundColor: 'orange',
        color: 'black',
        marginBottom: 10,
        textTransform: 'none',
        fontWeight: '600',
        width: isMobileDevice ? '80%' : '25%',
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
                width: '80vw',
                margin: 'auto'
            }}>
                <CustomTypography>
                    La Fortaleza
                </CustomTypography>
                <Box component="img" src={logo} sx={{
                    display: 'flex',
                    alignContent: 'center',
                    width: 100,
                    height: 'auto',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginBottom: 5
                }}/>
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
