import React from 'react'
import Catalogue from '../components/Catalogue/Catalogue'
import Product from '../components/Catalogue/Product'
import useSWR from 'swr'
import fetcher from "../lib/fetcher";
import Loading from '../components/loading'
import { TITLE_RECOMMENDER, TITLE_LOOK, URL_INDEX_RECOMMENDER } from '../config'

const CataRecommender = (props) => {

    console.log('CataRecommender')
    let url = URL_INDEX_RECOMMENDER
    const { data, error } = useSWR(url, fetcher);
    console.log(data)
    let items = null
    if (data != undefined) {
        items = data.data.slice(0, 8)
    }

    return (
        <section>
            <Catalogue
                id='principal_recommender'
                typeCard={'deck'}
                items={items}
                componentItem={Product}
                colSizes={{md:3}}
                // viewMore={() => this.onclick()}
                title={TITLE_RECOMMENDER}>
            </Catalogue>
            
        </section>

    );
}
 
export default CataRecommender;


// class CataRecommender extends Component {

//     state = {
//         items: []
//     }

//     componentDidMount() {
//         console.log('componentDidMount')
//         const { data, error, isValidating, mutate } = useSWR('https://jsonplaceholder.typicode.com/photos')
//         console.log(data, error, isValidating, mutate)
//     }

//     onclick = async () => {
//         let data = await this.props.wrapperHttp({
//             methodReq: ()=>axios.get('https://jsonplaceholder.typicode.com/photos')
//         })

//         if (data.success) {
//             this.setState({
//                 items: data.content.slice(0, 12)
//             })
//         }
//         console.log('RESPONSE ONCLICK')
//         console.log(data)
//     }

//     render() {
//         console.log('RENDER: CataRecommender')
//         // this.props.incrementCounter()
//         // console.log(this.props.isLoading)
//         return (
//             <section>
//                 <Catalogue
//                     typeCard={'column'}
//                     items={this.state.items}
//                     componentItem={Product}
//                     viewMore={() => this.onclick()}
//                     title={TITLE_RECOMMENDER}>
//                 </Catalogue>
//             </section>
            
//         )
//     }
// }


// const mapStateToProps = state => {
//     return {
//         isLoading: state.general.isLoading
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         // incrementCounter: (params) => dispatch(incrementCounter(params)),
//         wrapperHttp: (params) => dispatch(wrapperHttp(params))
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(CataRecommender);