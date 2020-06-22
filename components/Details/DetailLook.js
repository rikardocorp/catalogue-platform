import Catalogue from '../Catalogue/Catalogue'
import PrincipalImage from '../Details/PrincipalImage'
import useSWR from 'swr'
import fetcher from "../../lib/fetcher"
import Product from '../Catalogue/Product'
import { Container, Row, Col } from 'reactstrap'
import { CATEGORIES } from '../../config'
import { colorMode } from '../../lib/utils'

const ProcessRelations = (relationsData=null, version='') => {
    let relations = {
        cover: null,dress: null,top: null,middle: null,bottom: null
    }
    if (relationsData) {
        let relationsContent = relationsData.data
        if (relationsContent.length > 0) {
            relationsContent.map(_item => {
                let item = _item
                if (item) {
                    let category = item.category
                    let items = item.items
                    relations[category] = {
                        id: version + '_' + category,
                        data: items
                    }
                }
            })
        }
    }
    return relations
}

const RecommenderCategories = (recommenderData) => {

    let categories = CATEGORIES
    let contentCategories = []
    if (recommenderData) {
        categories.map((cat, index) => {
            let key = cat['key']
            let text = cat['text']

            if (recommenderData[key] != null) {
                let data = recommenderData[key].data
                let key_name = recommenderData[key].id
                contentCategories.push(
                    <Catalogue
                        key={index}
                        id={key_name}
                        typeCard={'column'}
                        items={data}
                        componentItem={Product}
                        // viewMore={() => this.onclick()}
                        title={text}>
                    </Catalogue>
                )
            }
        })
    }
    return contentCategories
}

const DetailLook = ({version='', darkMode=true}) => {

    let { bgColor, textCorlor, textColorInverted } = colorMode(darkMode)

    let urlItem = 'https://todo-6drzojst7q-uc.a.run.app/skus/1319181'
    let responseA = useSWR(urlItem, fetcher);
    const query = responseA.data ? responseA.data[0] : undefined

    // let urlRel = 'https://todo-6drzojst7q-uc.a.run.app/sku_v2_fast_V1_1/1466920'
    let urlRel = 'https://piloto-druid-spsa.appspot.com/ver1/v11/sku_json_fast/1215647'
    let responseB = useSWR(urlRel, fetcher);
    const relations = ProcessRelations(responseB.data, version)
    console.log(query)
    console.log(relations)
    console.log(responseB.data)
    const contentCategories = RecommenderCategories(relations)
    
    return (
        <Container fluid className="">
            <Row className='' >
                <Col xs={{ size: 8, offset: 2 }} md={{ size: 5, offset: 0 }}  lg={{ size: 4, offset: 1 }} 
                    className={"h-100-header-bar m-height-header-bar position-sm-relative position-xs-relative py-1 d-flex align-items-center justify-content-center fixed-top z-0 pl-lg-5"}>
                    {/* <h5 className="d-none d-sm-block">I'm Fixed</h5> */}
                    <PrincipalImage
                        className='p-4' event_tops={() => { }}
                        darkMode={darkMode}
                        item={query} categories={CATEGORIES}
                        relations={relations} version={version} />
                </Col>
                {/* <Col xs='0' sm='6' className="invisible"></Col> */}
                <Col xs={12} md={{ size: 7, offset: 5 }}  lg={{ size: 6, offset: 5 }} className={"py-2 pr-lg-5"}>
                    {contentCategories}
                </Col>
            </Row>
        </Container>
    )
}
 
export default DetailLook;
