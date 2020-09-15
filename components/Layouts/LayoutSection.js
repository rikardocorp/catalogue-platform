const LayoutSection = ({className='', children=null, id=null}) => {
    return (  
        <section id={id} className={'w-lg-75 w-xl-75 mx-auto ' + className}>
            {
                children
            }
        </section>
    );
}
 
export default LayoutSection;