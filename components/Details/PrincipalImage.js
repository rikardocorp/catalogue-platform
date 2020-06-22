import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardHeader, CardFooter } from 'reactstrap'
import Catalogue from '../Catalogue/Catalogue'
import Image from '../image'
import React, { Component } from 'react'
import { Link } from 'react-scroll'
import EllipsisText from "react-ellipsis-text";
import Title from '../Catalogue/Title'
import { colorMode } from '../../lib/utils'


class PrincipalImage extends Component {

    state = {
        isOn: true,
        styleBox: {},
        styleImage: {},
        widthImage: '100%',
    }

    get_width = (width, height) => {
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

    updateBox = () => {
        const { box = null, size_width = null, size_height = null } = this.props.item || {}
        console.log('updateBox::')
        console.log(this.props.item)
        // console.log(this.props.item.box)}
        let divStyle, imageStyle, widthImage = null
        if (box) {
            [divStyle, imageStyle, widthImage] = this.getBox(box, size_width, size_height)
        } else {
            [divStyle, imageStyle, widthImage] = [{}, {}, '100%']
        }

        this.setState({
            styleBox: divStyle,
            styleImage: imageStyle,
            widthImage: widthImage,
            isOn: true
        })
    }

    componentDidMount() {
        // console.log('componentDidMount')
        // this.updateBox()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log('componentDidUpdate')
        // if (this.props.item && prevProps.item && this.props.item.sku !== null && this.props.item.sku !== prevProps.item.sku) {
        //     this.updateBox()
        // }
    }

    getBox = (box, width, height) => {
        let [percent, marginLeft, marginTop] = this.get_width(width, height)
        box = box.split('-')
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

        let imageStyle = {
            marginLeft: marginLeft + '%',
            marginTop: marginTop + '%'
        };

        return [divStyle, imageStyle, percent + '%']
    }


    changeState = () => {
        this.setState(state => {
            return {
                isOn: !state.isOn
            }
        })
    }

    render() {
        let classOn = 'off'
        if (this.state.isOn) {
            classOn = 'on'
        }

        const {item={}, className='', darkMode=false, title=null} = this.props
        const { bgColor, textColor, textColorInverted } = colorMode(darkMode)
        const { sku = null, productName = '', image = null, productId = null, imageId = null, link = null, imageUrl = null } = item || {}
        // const title = productName
        const categories = this.props.categories
        const version = this.props.version

        let list_tags = null
        if (this.props.relations != undefined) {
            list_tags = categories.map((cat, index) => {
                let key = cat['key']
                let text = cat['text']
                let obj = this.props.relations[key]
                let classname = 'tag' + (index + 1)
                if (obj != null) {
                    classname = classname + ' activated'
                }
                return (
                    <Link key={index} activeClass="active" to={version + '_' + key} smooth={true} spy={true} offset={-20} duration={1000}>
                        <span className={classname}>{text}</span>
                    </Link >
                )
            })
        }

        let imagePrincipal = null
        if (sku !== null) {
            imagePrincipal = <Image url={imageUrl} width={this.state.widthImage} style={this.state.styleImage}></Image>
        }

        return (
            <div className={'cp-principal-image ' + className}>
                {
                    title && <Title className='text-center'>{title}</Title>
                }
                <Card className={'cp-content-image'}>
                    <CardBody className='position-relative p-0'>
                        {/* <div className='boxing' style={this.state.styleBox}></div> */}
                        <CardImg top width="100%" src={imageUrl} alt="Card image cap" />
                        <div className='tags-list'>
                            {list_tags}
                        </div>
                    </CardBody>
                    {/* <CardFooter className='p-2 text-center bg-white'>
                        <CardTitle className='m-0'>
                            <EllipsisText className={'text-center mt-2 ' + textColorInverted} text="CASUAL" length={60} />
                        </CardTitle>
                    </CardFooter> */}
                </Card>
            </div>
        )
    }
}

export default PrincipalImage
