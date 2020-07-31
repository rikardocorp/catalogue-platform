import React from 'react'
import { Button } from 'reactstrap'


const DetailProduct = ({ data = null, children = null, addCart = () => { }, isLoading = true}) => {

    const { sku = null, productName = '', brand = '' } = data.data || {}
    return (
        <div>
            <span>{brand}</span>
            <h5><strong>{productName}</strong></h5>
            <span><strong>SKU:</strong> {sku}</span>
            <h5 className='p-1'>Vía STORE</h5>
            <br></br>
            {
                isLoading ? (
                    <>
                        <div>
                            <Button style={{ opacity: 0.8 }} size="lg" className='cp-button'>Cargando...</Button>
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <Button style={{ opacity: 0.5 }} size="lg" className='cp-button'>NO DISPONIBLE</Button>
                        </div>
                        <div className='mt-4'>
                            <i>Pero, te recomendamos ...</i>
                        </div>
                    
                    </>
                )
            }
        </div>
    )
}

export default DetailProduct
