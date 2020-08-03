import React, { useState }  from 'react'
import {Input, Button} from 'reactstrap'
import { MESSAGE_ADD_CART } from '../../config/index'


const DetailProductExt = ({ data = null, children = null, addCart=()=>{}, isLoading=true }) => {
    const [SizeId, setSizeId] = useState(null)
    const { productName = '', brand = '', items=[], price={} } = data.data || {}

    const itemsList = Object.values(items)
    let pickItem = SizeId == null ? itemsList[0] : items[SizeId]

    // console.log('DetailProductExt:', Object.values(items))
    // console.log('Pick Item', pickItem)
    const products = itemsList.map((prod, key) => {
        console.log(key, prod)
        return (
            prod.size ? <option className='opt' key={key} value={prod.sku}>{prod.size[0]}</option> : null
        )
    })
    products.unshift(<option className='opt' value={undefined}></option>)

    const { name='', sku='' } = pickItem || {}
    const productToCart = { ...data.data, pickItem, SizeId }
    delete productToCart['items']
    return (
        <div className='cp-detail-product'>
            <span>{brand}</span>
            <h5><strong>{name}</strong></h5>

            <div className='row pt-3'>
                <div className='col-6'>
                    <span><strong>SKU:</strong> {sku}</span>
                    <h5 className='py-2'>Vía STORE</h5>
                    <Input type="select" name="select" id="exampleSelect"
                        onChange={(e) => setSizeId(e.target.value)}>
                        { products }
                    </Input>
                </div>
                <div className='col-6 cp-price'>
                    <div className='price-original'><span>S/ {price.ListPrice}</span></div>
                    {
                        price.PriceIBK != null ? (
                            <>
                                <div className='price-online'><span><strong>S/ {price.Price}</strong></span></div>
                                <div className='ibk'>
                                    <div>
                                        <img src='/images/logo_ibk.png'></img>
                                    </div>
                                    <div>
                                        <span><strong>S/ {price.PriceIBK}</strong></span>
                                        <span className='tag'>{price.discount}%</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className='price-online big'><span><strong>S/ {price.Price}</strong></span></div>
                        )
                    }
                    
                </div>
            </div>
            <br></br>
            <div className='mt-4'>
                {
                    isLoading ? (
                        <Button style={{ opacity: 0.8 }} size="lg" className='cp-button'>Cargando...</Button>
                    ) : (
                        <Button onClick={() => addCart(MESSAGE_ADD_CART, productToCart)}
                            size="lg" className='cp-button'>AGREGAR A LA BOLSA</Button>
                    )
                }
            </div>
        </div>
    )
}

export default DetailProductExt
