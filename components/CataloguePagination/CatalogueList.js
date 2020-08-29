import React, { useState, useEffect } from 'react'
import useSWR, { useSWRPages } from "swr"
import fetcher from "../../lib/fetcher"
import ProductItemDefault from "./ProductItemDefault"
import useOnScreen from "./UseOnScreen"
import Loading from '../../components/loading'
import { CardGroup } from 'reactstrap'

export const Fallback = ({ children }) => {
    return <CardGroup>{children}</CardGroup>;
}

const CatalogueList = ({ keyName='default', url='', componentItem=null, className=''}) => {

    // const URL = url && url.split('?')[0]
    const storageList = `${keyName}-list`
    const ProductComponent = componentItem ? componentItem : ProductItemDefault
    const { pages, isLoadingMore, isReachingEnd, loadMore } = useSWRPages(
        storageList,
        ({ offset, withSWR }) => {
            const urlLocal = offset || url;
            const { data: response } = withSWR(useSWR(urlLocal, fetcher, { suspense: true }));
            if (!response) return null;
            const results = response.data;
            return results.map((result, index) => (
                <ProductComponent sufix={'look'} key={index} index={index} data={result} />
            ));
        },
        (SWR) => SWR.data.next,
        []
    );

    const [infiniteScrollEnabled, setInfiniteScrollEnabled] = React.useState(false);
    const $loadMoreButton = React.useRef(null);
    const infiniteScrollCount = React.useRef(0);
    const isOnScreen = useOnScreen($loadMoreButton, "200px");

    React.useEffect(() => {
        if (!infiniteScrollEnabled || !isOnScreen) return;

        loadMore();

        const count = infiniteScrollCount.current;

        if (count + 1 === 3) {
            setInfiniteScrollEnabled(false);
            infiniteScrollCount.current = 0;
        } else {
            infiniteScrollCount.current = count + 1;
        }
    }, [infiniteScrollEnabled, isOnScreen]);


    return (
        <>
            <CardGroup className={className}>{pages}</CardGroup>
            {
                isLoadingMore && (
                    <div className="mx-auto my-5 text-center">
                        <Loading />
                    </div>
                )
            }
            <div className="mx-auto mt-3 mb-3 text-center">
                {!isReachingEnd && (
                    <button
                        ref={$loadMoreButton}
                        className='cp-button btn btn-secondary btn-lg my-4'
                        disabled={isLoadingMore}
                        onClick={() => {
                            loadMore();
                            setInfiniteScrollEnabled(true);
                        }}
                    >
                        VER MAS LOOKS
                    </button>
                )}
            </div>
        </>
    );
}

export default CatalogueList;