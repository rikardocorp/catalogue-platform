const LayoutSection = ({className='', children=null}) => {
    return (  
        <section className={'w-md-75 w-lg-75 w-xl-75 mx-auto ' + className}>
            {
                children
            }
        </section>
    );
}
 
export default LayoutSection;