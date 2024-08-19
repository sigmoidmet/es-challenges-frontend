import React from 'react';

const Header = ({ headerButtons }) => {
    return (
      <header className="header">
          <h1>ES Challenges</h1>
          <div className="header-buttons">
              {/* Dynamic buttons go here */}
              {headerButtons}
          </div>
      </header>
    );
}

export default Header;