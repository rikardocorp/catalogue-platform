import fetch from "isomorphic-unfetch";

function fetcher(...args) {
    return fetch(...args).then(response => response.json());
}


const _params_ = {
    method: 'GET',
    headers: { 
        'Content-Type': 'application/json',
        'x-vtex-api-appKey': 'vtexappkey-mercury-TSCICF',
        'x-vtex-api-appToken': 'QZZBVYIEIFYVWGTDLPSWCSWGJIJIQPCVGZXMLNWYBJZXNBLEIEMVJVMXDTRMPZNTDCPWIHSYTTVTSYSIWFZMDGLLNAJSVJIBVGUKMPVBMNCPZSEEAJQKABQWQEJIYADJ'
    }
}
export const fetcherShopStar = url => fetch(url, _params_).then(r => r.json())

export const fetcherWithToken = (url, method) => {
    let params = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'x-vtex-api-appKey': 'vtexappkey-mercury-TSCICF',
            'x-vtex-api-appToken': 'QZZBVYIEIFYVWGTDLPSWCSWGJIJIQPCVGZXMLNWYBJZXNBLEIEMVJVMXDTRMPZNTDCPWIHSYTTVTSYSIWFZMDGLLNAJSVJIBVGUKMPVBMNCPZSEEAJQKABQWQEJIYADJ'
        }
    }
    return fetch(url, params).then(r => r.json())
}

export default fetcher;