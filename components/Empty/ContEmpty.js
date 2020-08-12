import React from 'react'
import {Jumbotron, Container} from 'reactstrap'

const ContEmpty = ({children=null, message='', isEmpty=true}) => {
    return ( 
        <> 
        {
            !isEmpty ? children : (
                <section>
                    <div className='cp-no-cart'>
                        <Jumbotron fluid className='bg-light'>
                            <Container fluid>
                                <h4 className="display-3 text-center">
                                    <i className="fas fa-shopping-bag">{'  '}</i>
                                    <strong>    anna</strong> <small>te espera!!</small>
                                </h4 >
                                <p className="lead text-center">{message}</p>
                            </Container >
                        </Jumbotron >
                    </div>
                </section>
            )
        }
        </>
    )
}
 
export default ContEmpty;