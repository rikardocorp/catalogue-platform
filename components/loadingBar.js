import React, { Component } from 'react'
import { connect } from 'react-redux';

export class Loading extends Component {
    state = {

    }

    render() {
        return (
            <section className='position-fixed w-100 z-1'>
                {
                    this.props.isLoading && setInterval(() => (
                        <div className="slider">
                            <div className="line"></div>
                            <div className="subline2 inc2"></div>
                            <div className="subline2 dec2"></div>
                            <div className="subline inc"></div>
                            <div className="subline dec"></div>
                        </div>
                    ), 1000)
                    
                }
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.general.isLoading
    }
}

export default connect(mapStateToProps)(Loading);

