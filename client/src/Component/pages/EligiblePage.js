import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// To render the credit card eligible page with details
const EligiblePage = props => {

    let imgUrl= '../' + props.cardType + '.png';
    let imgAlt = props.cardType + ' Card';

     let uiRender = <div>
        <div className="row">
            <h2>Congratulations! You are eligible for {props.cardType} Credit Card</h2>
        </div>
       <div className="row"><b>{props.promotionMsg}</b></div>
        <br></br>
        <div className="row imageCenter">
                <img src={imgUrl} alt={imgAlt} />
        </div>
        <div className="row">
            <ul >
                <li className="col span-1-of-3">
                    <span>Representative </span>
                    <span><b> {props.reduxCurrentApr}%</b> APR </span>
                    <span>(variable)</span>
                </li>
                <li className="col span-1-of-3">
                    <span>Purchase rate </span>
                    <span><b> {props.purChaseRate}% </b></span>
                    <span>p.a. (variable)</span>
                </li>
                <li className="col span-1-of-3">
                    <span>Credit limits up to </span>
                    <span><b>£ {props.creditLimit} </b></span>
                    <span>and no annual fee</span>
                </li>
            </ul>
        </div>
        <br></br>
        <div className="row"><b>Representative Example:</b>
        <span>Representative {props.reduxCurrentApr}% APR variable. Based on assumed borrowing of £{props.creditLimit}. Rate of interest {props.purChaseRate}% (variable) annual. Credit limit is subject to status.</span>
        </div>
        <div className="row">
            <div className="col span-1-of-3">
                <label>&nbsp;</label>
            </div>
            <div className="col span-3-of-3 btnCenter">
                <input type="submit" value="Back to Form Page" onClick={props.switchToFormPage}></input>
            </div>
        </div>
    </div>

    if (props.renderUiPage === 'Home') {
        uiRender = <Redirect to="/" />
    }

    return (
        uiRender
    );

}

const mapStateToProps = (state) => {
    return {
        renderUiPage: state.pageTag.uiPage,
        reduxCurrentApr : state.pageTag.currentApr,
        cardType: state.pageTag.cardType,
        promotionMsg: state.pageTag.promotionMsg,
        purChaseRate: state.pageTag.purChaseRate,
        creditLimit: state.pageTag.creditLimit
    }
}

const mapDispatchToProps = dispatch => {
    return {
        switchToFormPage: () => dispatch({ type: 'SWITCH_TO_FORM_PAGE' })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EligiblePage);
