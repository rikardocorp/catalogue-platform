export const colorMode = (darkMode=false) => {
    return {
        bgColor: darkMode ? 'bg-dark' : 'bg-light',
        textColor: darkMode ? 'text-white' : 'text-dark',
        textColorInverted: darkMode ? 'text-dark' :'text-light',
    }
} 


export const boxGetWidth = (width, height) => {
    width = parseInt(width)
    height = parseInt(height)
    let _max, _min, percent, mleft, mtop = 0
    if (width > height) {
        _max = width
        _min = height
        percent = _min * 100 / _max
        mtop = (100 - percent) / 2
    } else {
        _max = height
        _min = width
        percent = _min * 100 / _max
        mleft = (100 - percent) / 2
    }

    return [percent, mleft, mtop]
}

export const boxCreator = (box, width, height, increment=0.0) => {
    if (typeof box == 'string') {
        box = box.split('-')
    }

    let [percent, marginLeft, marginTop] = boxGetWidth(width, height)
    // console.log(box)
    // console.log([percent, marginLeft, marginTop])
    // box = box
    box = resizeBoundingBox(box, true, increment, [height, width])
    let points = box.map(x => parseInt(x))
    let left = (percent / 100) * points[0] * 100 / height + (marginLeft)
    let top = (percent / 100) * points[1] * 100 / width + (marginTop)

    let _max = Math.max(width, height)
    let w = (percent / 100) * (points[2] - points[0]) * 100 / _max
    let h = (percent / 100) * (points[3] - points[1]) * 100 / _max

    let divStyle = {
        top: top + '%',
        left: left + '%',
        height: h + '%',
        width: w + '%'
    };

    let divStyle2 = {
        top: top,
        left: left,
        height: h,
        width: w
    };

    let imageStyle = {
        marginLeft: marginLeft + '%',
        marginTop: marginTop + '%'
    };

    return{
        styleBox: divStyle,
        styleValues: divStyle2,
        styleImage: imageStyle,
        widthImage: percent + '%'
    }
}

export const resizeBoundingBox = (box, isSquare = false, percent = 0.2, shape = []) => {
    let [x1, y1, x2, y2] = box
    let w = x2 - x1
    let h = y2 - y1
    if (!isSquare) {
        return x1, y1, x2, y2
    }

    let diff = Math.abs(w - h)
    let incremento = parseInt(diff / 2)
    let percent_size = 0

    if (w > h) {
        percent_size = parseInt(w * percent)
        incremento += percent_size

        x1 -= percent_size
        w += percent_size * 2

        y1 -= incremento
        h += incremento * 2
    } else {
        percent_size = parseInt(h * percent)
        incremento += percent_size

        y1 -= percent_size * 2
        h += percent_size * 2

        x1 -= incremento
        w += incremento * 2
    }

    let [height, width] = shape
    height -= 1
    width -= 1

    let [px1, py1, px2, py2] = [x1, y1, w + x1, h + y1]

    let diffX = 0
    //  EJE X
    if (px2 > width) {
        diffX = px2 - width
        px1 = px1 - diffX
        px2 = width
        if (px1 < 0) {
            px1 = 0
        }
    }

    if (px1 < 0) {
        diffX = -1 * px1
        px2 = px2 + diffX
        px1 = 0
        if (px2 > width) {
            px2 = width
        }
    }
    // EJE Y
    if (py2 > height) {
        diffX = py2 - height
        py1 = py1 - diffX
        py2 = height
        if (py1 < 0) {
            py1 = 0
        }

    }

    if (py1 < 0) {
        diffX = -1 * py1
        py2 = py2 + diffX
        py1 = 0
        if (py2 > height) {
            py2 = height
        }
    }

    return [px1, py1, px2, py2]
}

const process_tag_IBK = (tagIBK) => {

    let value = tagIBK.split(' ')[1].toLowerCase()
    let result = null 
    let _type_ = null
    try {
        if (value.includes('s/.')) {
            result = parseFloat(value.replace('s/.', ''))
            _type_ = 'minus'
        } else if (value.includes('%')) {
            result = parseFloat(value.replace('%', ''))
            _type_ = 'percentage'
        }
    } catch (error) {
        // console.error(error);
    }
    return {value: result, _type_: _type_ }    
}

export const process_product_external = (product=null) => {

    if (product==null) return null

    const { productId = null, productName = '', brand = '', productClusters={}, items=[] } = product

    // DESCUENTO CLUSTER 
    let TAGIBK_CLUSTER = null
    let TAGIBK = Object.values(productClusters).filter(arr => arr.match("TAGIBK") !== null)
    if (TAGIBK.length > 0) {
        TAGIBK_CLUSTER = TAGIBK[TAGIBK.length-1]
    }

    // PROCESAR ITEMS
    let OBJECT_ITEMS = {}
    let PRICE = null
    let LISTPRICE = null
    let IMAGES = []
    let TAGIBK_TEASER = null

    // console.log('UTILS::::')
    // console.log(items)
    items.map( item => {
        let include = false
        const { itemId, name, referenceId, images, Tallas, sellers } = item
        sellers.map( sell => {
            const { sellerName, commertialOffer } = sell
            if (sellerName == 'oechsle') {
                const { Teasers=[], ListPrice=null, Price=null } = commertialOffer
                if (ListPrice != null) {
                    include = true
                    PRICE = Price
                    LISTPRICE = ListPrice
                    try {
                        TAGIBK_TEASER = (TAGIBK_TEASER == null) ? Teasers[0]['<Name>k__BackingField'] : TAGIBK_TEASER
                    } catch (error) {
                        // console.log(error);
                    }
                }
            }
        })

        console.log('UTIL: ')
        console.log(item)
        console.log(IMAGES, images)

        IMAGES = (IMAGES.length == 0 && images && images.length > 0) ? images : IMAGES

        if (include) {
            OBJECT_ITEMS[itemId] = { 
                name, 
                referenceId: referenceId[0]['Value'], 
                sku:itemId, 
                size:Tallas,
                images: (images && images.length > 0) ? images.map(img => img.imageUrl) : []
            }
        }
    })

    // PROCESANDO IMAGENES
    IMAGES = IMAGES.map(img => img.imageUrl)

    // PROCESANDO PRECIO
    let DESCUENTO = null
    let DESCUENTO_TYPE = null
    let TAG = null
    let PRICEIBK = null

    if (TAGIBK_TEASER != null) {
        TAG = process_tag_IBK(TAGIBK_TEASER)
        DESCUENTO = TAG.value
        DESCUENTO_TYPE = TAG._type_
    } else if (TAGIBK_CLUSTER != null){
        TAG = process_tag_IBK(TAGIBK_CLUSTER)
        DESCUENTO = TAG.value
        DESCUENTO_TYPE = TAG._type_
    }

    // console.log('::::: RICK _KARDOCORP :::::')
    // console.log(DESCUENTO_TYPE, DESCUENTO)
    // console.log(PRICE, LISTPRICE)

    if (DESCUENTO_TYPE != null && PRICE != null) {
        if (DESCUENTO_TYPE == 'minus'){
            PRICEIBK = PRICE - DESCUENTO
            DESCUENTO = parseInt(100 - ( PRICEIBK * 100 / PRICE ) + 0.5)
        } else {
            PRICEIBK = PRICE - PRICE * DESCUENTO / 100
            // DESCUENTO = parseInt(100 - (PRICEIBK * 100 / PRICE) + 0.5)
        }
        PRICEIBK = Number((PRICEIBK).toFixed(2))
    }

    return {
        productId,
        productName,
        brand,
        images: IMAGES,
        items: OBJECT_ITEMS,
        price: PRICE == null ? null : {
            ListPrice: LISTPRICE ? Number((LISTPRICE).toFixed(2)) : null,
            Price: PRICE ? Number((PRICE).toFixed(2)) : null,
            PriceIBK: PRICEIBK,
            discount: DESCUENTO,
            discount_type: DESCUENTO_TYPE,
        }
    }
}