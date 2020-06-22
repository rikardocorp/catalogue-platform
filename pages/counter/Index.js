import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link'
import { decrementCounter, incrementCounter } from '../../store/actions/general';

class App extends React.Component {

    constructor(props) {
        super(props);

        //Initialise state
        this.state = {
            counter: 0
        };
    }


    render() {
        return (
            <div>
                <button onClick={this.props.incrementCounter}>Increment</button>
                <button onClick={this.props.decrementCounter}>Decrement</button>
                <h1>{this.props.counter}</h1>
                <p>
                    Before <Link href="/"><a>this page!</a></Link>
                </p>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        counter: state.general.value
    }
}

const mapDispatchToProps = dispatch => {
    return {
        incrementCounter: () => dispatch(incrementCounter()),
        decrementCounter: () => dispatch(decrementCounter())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);