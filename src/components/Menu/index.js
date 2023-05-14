import React, { useState } from 'react'

import filter from 'lodash/filter'
import map from 'lodash/map'
import findIndex from 'lodash/findIndex'
import join from 'lodash/join'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

import isMobile from 'is-mobile'

const CustomTypography = styled(Typography)(() => ({
    color: 'orange',
    fontWeight: 700,
    fontSize: 20,
    marginBottom: 3,
    textAlign: 'center'

}))

const isMobileDevice = isMobile()

function ProductList () {
    const productList = [
        {
            id: 1,
            name: 'Cheeseburger',
            image: '',
            price: 2400,
            description: ''
        },
        {
            id: 2,
            name: 'Patty melt',
            image: '',
            price: 2800,
            description: ''
        },
        {
            id: 3,
            name: 'Veggie burger',
            image: '',
            price: 2200,
            description: ''
        }
    ]

    const [cart, setCart] = useState([])
    const [finalOrder, setFinalOrder] = useState('')

    const sendOrder = () => {
        setFinalOrder(join(map(cart, item => `Name: ${item.name}, Description: ${item.description}, Price: ${item.price}`), '\n'))
    }

    const handleAddToCart = (product) => {
        setCart([...cart, product])
    }

    const handleRemoveFromCart = (product) => {
        const index = findIndex(cart, { id: product.id })
        if (index !== -1) {
            const updatedCart = [...cart]
            updatedCart.splice(index, 1)
            setCart(updatedCart)
        }
    }

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
        <Box>
            {map(productList, product => {
                const cartItemCount = filter(cart, { id: product.id }).length

                return (
                    <Box key={product.id} sx={{ mb: 3, mt: 3 }}>
                        <CustomTypography>
                            {product.name}
                        </CustomTypography>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CustomTypography sx={{ mr: 2 }}>
                                ${product.price}
                            </CustomTypography>
                            <IconButton sx={{
                                backgroundColor: 'orange',
                                color: 'black',
                                border: '1px solid transparent',
                                '&:hover': { backgroundColor: 'black', color: 'orange', border: '1px solid orange' }
                            }}
                            onClick={() => handleAddToCart(product)}>
                                <AddIcon sx={{ fontSize: 'small' }}/>
                            </IconButton>
                            {cartItemCount > 0 && (
                                <>
                                    <IconButton
                                        sx={{
                                            backgroundColor: 'orange',
                                            color: 'black',
                                            border: '1px solid transparent',
                                            '&:hover': { backgroundColor: 'black', color: 'orange', border: '1px solid orange' },
                                            ml: 1
                                        }}
                                        onClick={() => handleRemoveFromCart(product)}
                                    >
                                        <RemoveIcon sx={{ fontSize: 'small' }} />
                                    </IconButton>
                                    <CustomTypography sx={{ ml: 1 }}>({cartItemCount})</CustomTypography>
                                </>
                            )}
                        </Box>
                    </Box>
                )
            })}
            <CustomButton onClick={sendOrder} href={`https://wa.me/5492281407590/?text=${encodeURIComponent(finalOrder)}`} target="_blank" rel="noopener noreferrer">
                Enviar orden
            </CustomButton>
        </Box>
    )
}

export default ProductList
