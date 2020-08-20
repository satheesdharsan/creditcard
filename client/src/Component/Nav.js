import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

const Nav = (props) => {

  return (
    <>
      <div className="fixed-nav">
        <nav>
          <div className="header-row clearfix">
            <div></div>
            <div></div>
            <h1>Credit Card Qualification</h1>
            <ul className="main-nav">
              <li>
                <Link to="/" onClick={props.switchToFormPage}>Home</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    switchToFormPage: () => dispatch({ type: 'SWITCH_TO_FORM_PAGE' })
  }
}

export default connect(null, mapDispatchToProps)(Nav);

