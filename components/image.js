import React from 'react'
import { PATH_IMAGE } from '../config/index'

const Image = (props) => {

    let { path = null, filename = null, url = null, className='' } = props

    let sourceImage = null

    if (url !== null) {
        sourceImage = url
    } else if (path == null) {
        sourceImage = PATH_IMAGE + filename
    } else {
        sourceImage = path + filename
    }
    return (
        <img className={'w-100 ' + className} src={sourceImage} />
    )
}

export default Image