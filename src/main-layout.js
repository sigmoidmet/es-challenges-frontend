import React from 'react';
import Header from './header';

const MainLayout = ({ headerButtons, children }) => {
    return (
        <div className="App">
            <Header headerButtons={headerButtons}/>
            <div className="form-container">
                {children}
            </div>
        </div>
    );
}

export default MainLayout;