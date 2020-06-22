const title = ({ children, className='', onClick=null}) => {

    return (
        <h5 className={'cp-title mb-4 position-relative ' + className}>
            {children} 
            {
                onClick ? <span className='cp-onclick float-right hvr-backward' onClick={onClick}>VER MAS</span> : null
            }
        </h5>
    );
}
 
export default title;