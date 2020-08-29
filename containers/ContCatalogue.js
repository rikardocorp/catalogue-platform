import React from "react"
import CatalogueList, { Fallback as CatalogueListFallback } from "../components/CataloguePagination/CatalogueList";
// import CatalogueListSimple from '../components/CataloguePagination/CatalogueListSimple'
import { Fallback as ProductItemFallback } from "../components/CataloguePagination/ProductItem";

const isServer = typeof window === "undefined";
const fallback = (
    <CatalogueListFallback>
        {Array.from({ length: 16 }, (_, index) => (
            <ProductItemFallback key={index} />
        ))}
    </CatalogueListFallback>
);

const ContCatalogue = ({ keyName, url, componentItem=null, className=''}) => {
    const aux = !isServer ? '1' : '2'
    return (  
        <>
            {!isServer ? (
                <React.Suspense fallback={fallback}>
                    <CatalogueList keyName={keyName} url={url} componentItem={componentItem} className={className} />
                </React.Suspense>
            ) : (
                    fallback
                )
            }
        </>
    );
}
 
export default ContCatalogue;