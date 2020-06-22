import { 
    ListGroup, ListGroupItem, Row, Col, Button, Jumbotron, Container, 
} from 'reactstrap'
import Image from '../components/image'
import { useToasts } from 'react-toast-notifications'
import { MESSAGE_REMOVE_CART} from '../config'
import Link from 'next/link'


const ContShoppingBag = ({ items = {}, deleteMethod = () => { }, buyProducts = () => { }}) => {

    const { addToast } = useToasts()
    let list_products = Object.keys(items)

    let total = list_products.length
    const listItems = list_products.map( (item, index) => {
        const { count, data} = items[item]
        const { imageUrl, productName, sku } = data
        console.log(items[item])
        return (
            <ListGroupItem key={index}>
                <Row>
                    <Col sm={2}>
                        <Image url={imageUrl}></Image>
                    </Col>
                    <Col sm={6}>
                        <h5 className='text-dark'>
                            <Link href='/producto/[id]' as={'/producto/' + sku}>
                                <a className='text-dark'>
                                    {productName}
                                </a>
                            </Link>
                        </h5>
                        <p><small>SKU: {sku}</small></p>
                        <p>VÍA STORE</p>

                    </Col>
                    <Col className='d-flex align-items-center' sm={2}>
                        <p><strong>x {count}</strong></p> 
                    </Col>
                    <Col className='d-flex align-items-center' sm={2}>
                        <Button className='cp-button' onClick={() => deleteMethod(addToast, MESSAGE_REMOVE_CART, data)}>Remover</Button>
                    </Col>
                </Row>
            </ListGroupItem>
        )
    })

    return (
        <section>
            <ListGroup flush>
                {
                    listItems
                }
            </ListGroup>
            {
                total > 0 ? (
                    <Row className='mt-5'>
                        <Col sm={2}>
                            <h4 className='text-right'>
                                <strong>TOTAL</strong>
                            </h4>
                        </Col>
                        <Col sm={7}>
                            <h4 className='pl-3'>S/ 0.00 </h4>
                        </Col>
                        <Col sm={3}>
                            <Button className='cp-button hvr-pulse' onClick={() => buyProducts()}>
                                <i className="fas fa-shopping-bag">{'  '}</i>
                                <span>   COMPRAR</span>
                            </Button>
                        </Col>
                    </Row>
                ) : (
                    <div className='cp-no-cart'>
                        <Jumbotron fluid className='bg-light'>
                            <Container fluid>
                                <h4 className="display-3 text-center">
                                    <i className="fas fa-shopping-bag">{'  '}</i>
                                    <strong>    anna</strong> <small>te espera!!</small>
                                </h4>
                                <p className="lead text-center">Aun no tiene productos en la bolsa.</p>
                            </Container>
                        </Jumbotron>
                    </div>
                )
            }
            
        </section>
        
    );
}
 
export default ContShoppingBag;
