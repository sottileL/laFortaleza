/* eslint-disable no-unused-vars */

import React, { useState } from 'react'

import filter from 'lodash/filter'
import get from 'lodash/get'
import map from 'lodash/map'
import findIndex from 'lodash/findIndex'
import join from 'lodash/join'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Modal from '@mui/material/Modal'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import RemoveIcon from '@mui/icons-material/Remove'

import { Formik } from 'formik'
import * as Yup from 'yup'

import isMobile from 'is-mobile'
import { ClickAwayListener, FormControl } from '@mui/base'

const CustomTypography = styled(Typography)(() => ({
    fontFamily: 'FS Emeric',
    color: 'orange',
    fontWeight: 700,
    fontSize: 18,
    marginRight: 5,
    textAlign: 'center'

}))

const CustomButton = styled(Button)(() => ({
    fontSize: 15,
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

const CssTextField = styled(TextField)({
    '& input::placeholder': { color: 'gray' },
    '& label.Mui-focused': { color: 'gray' },
    '& .MuiInput-underline:after': { borderBottomColor: 'green' },
    '& .MuiOutlinedInput-root': {
        color: 'white',
        '& fieldset': { borderColor: 'gray' },
        '&:hover fieldset': { borderColor: 'white' },
        '&.Mui-focused fieldset': { borderColor: 'white' }
    },
    '& .MuiInputLabel-root': { color: 'gray' }
})

const CssSelect = styled(Select)({
    color: 'white',
    border: '1px solid white'
})

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
    const [personInfo, setPersonInfo] = useState('')
    const [openModal, setOpenModal] = useState(false)

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

    const continueWithPurchase = () => {
        setOpenModal(true)
    }

    const initialValues = {
        fullName: '',
        paymentMethod: '',
        address: '',
        additionalComments: ''
    }

    const validationSchema = Yup.object({
        fullName: Yup.string().required('Requerido'),
        paymentMethod: Yup.string().required('Requerido'),
        address: Yup.string().required('Requerido')
    })

    const handleSubmit = (values, { setSubmitting }) => {
        setFinalOrder(join(map(cart, item => `${item.name} - $${item.price}`), '\n'))
        setPersonInfo(`'\n' Nombre: ${get(values, 'fullName')} Forma de pago: ${get(values, 'paymentMethod')} '\n', Retira por el local: ${get(values, 'takeAway')} Dirección: ${get(values, 'address')}`)
        console.log(finalOrder, personInfo, cart)
        // setSubmitting(false)
        setOpenModal(false)
    }

    return (
        <Box>
            {map(productList, product => {
                const cartItemCount = filter(cart, { id: product.id }).length

                return (
                    <Grid container key={product.id} sx={{ mb: 3, mt: 3, justifyContent: 'space-around' }}>
                        <Grid item xs={8}>
                            <CustomTypography>
                                {product.name}
                            </CustomTypography>
                            <CustomTypography>
                                    - ${product.price}
                            </CustomTypography>
                        </Grid>
                        <Grid item xs={4} sx={{ display: 'flex', alignSelf: 'center' }}>
                            <IconButton sx={{
                                backgroundColor: 'orange',
                                color: 'black',
                                border: '1px solid transparent',
                                '&:hover': { backgroundColor: 'black', color: 'orange', border: '1px solid orange' }
                            }}
                            onClick={() => handleAddToCart(product)}>
                                <AddIcon sx={{ fontSize: 'small' }}/>
                            </IconButton>
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
                            {cartItemCount > 0 && (
                                <CustomTypography sx={{ ml: 1 }}>({cartItemCount})</CustomTypography>
                            )}
                        </Grid>
                    </Grid>
                )
            })}
            {cart.length > 0 && (
                <>
                    <CustomButton sx={{ display: 'flex', margin: 'auto', width: 'auto', mt: 4 }} onClick={continueWithPurchase}>
                        Continuar con el pedido
                    </CustomButton>
                    <Box>
                        {openModal && (
                            <Modal
                                open={openModal}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Box sx={{
                                    ...isMobileDevice ? { width: '90vw' } : { width: '40vw' },
                                    height: 'auto',
                                    border: '2px solid orange',
                                    borderRadius: '10px',
                                    backgroundColor: 'black'
                                }}>
                                    <Box sx={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                                    }}>
                                        <CustomTypography sx={{ ml: 1 }}>
                                            Finalizar pedido
                                        </CustomTypography>
                                        <IconButton onClick={() => setOpenModal(false)}>
                                            <CloseIcon sx={{ color: 'orange' }} />
                                        </IconButton>
                                    </Box>
                                    <Formik
                                        enableReinitialize
                                        validationSchema={validationSchema}
                                        initialValues={initialValues}
                                        onSubmit={handleSubmit}
                                    >
                                        {({ handleSubmit, handleChange, values, touched, errors }) => (
                                            <Grid container direction="column">
                                                <Grid item xs={12} mt={2} width="99%">
                                                    <Grid container spacing={2} direction="row" px="10%" alignItems="center" justifyContent="center">
                                                        <Grid item xs={12}>
                                                            <CssTextField
                                                                fullWidth
                                                                id="fullName"
                                                                name="fullName"
                                                                label="Nombre y Apellido"
                                                                value={values.fullName}
                                                                onChange={handleChange}
                                                                error={touched.fullName && Boolean(errors.fullName)}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <CssTextField
                                                                fullWidth
                                                                id="address"
                                                                name="address"
                                                                label="Dirección"
                                                                value={values.address}
                                                                onChange={handleChange}
                                                                error={touched.address && Boolean(errors.address)}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <FormControl>
                                                                <CssSelect
                                                                    fullWidth
                                                                    id="paymentMethod"
                                                                    name="paymentMethod"
                                                                    label="Forma de pago"
                                                                    value={values.paymentMethod}
                                                                    onChange={handleChange}
                                                                    error={touched.paymentMethod && Boolean(errors.paymentMethod)}
                                                                    displayEmpty
                                                                >
                                                                    <MenuItem value=""> Forma de pago </MenuItem>
                                                                    <MenuItem value={'Efectivo'}>Efectivo</MenuItem>
                                                                    <MenuItem value={'Transferencia'}>Transferencia (Cuenta DNI, MercadoPago, etc)</MenuItem>
                                                                </CssSelect>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <FormControl>
                                                                <CssSelect
                                                                    fullWidth
                                                                    id="takeAway"
                                                                    name="takeAway"
                                                                    label="Retiro por el local"
                                                                    value={values.takeAway}
                                                                    onChange={handleChange}
                                                                    error={touched.takeAway && Boolean(errors.takeAway)}
                                                                    displayEmpty
                                                                >
                                                                    <MenuItem value=""> Retiro por el local? </MenuItem>
                                                                    <MenuItem value={'Si'}>Si</MenuItem>
                                                                    <MenuItem value={'No'}>No</MenuItem>
                                                                </CssSelect>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <CssTextField
                                                                fullWidth
                                                                id="message"
                                                                name="message"
                                                                label="Comentarios adicionales"
                                                                value={values.message}
                                                                onChange={handleChange}
                                                                error={touched.message && Boolean(errors.message)}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sx={{ textAlign: 'center', mt: 2, mb: 2 }}>
                                                            <CustomButton sx={{ display: 'flex', margin: 'auto' }}
                                                                onClick={handleSubmit}>
                                                                    Enviar pedido
                                                            </CustomButton>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        )}
                                    </Formik>
                                </Box>
                            </Modal>
                        )}
                    </Box>
                </>

            )}
        </Box>
    )
}

export default ProductList
