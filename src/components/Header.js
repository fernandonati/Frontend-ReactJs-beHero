import React from 'react';

//children have a internal content.
function Header({ children }) {  //can use props or specify children
    return (
        <header>
            <h1>{children}</h1>  
        </header>
    )
}

export default Header;