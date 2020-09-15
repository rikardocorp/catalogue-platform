import React from 'react'
const title = ({ children, className='', onClick=null, contentOnClick='VER MAS'}) => {

    return (
        <h5 className={'cp-title mb-4 ml-3 ml-md-0 position-relative ' + className}>
            {children} 
            {
                onClick ? <div className='cp-onclick float-right hvr-backward' onClick={onClick}>{contentOnClick}</div> : null
            }
        </h5>
    );
}
 
export default title;