/**
 * root.js
 *      Main root component
 * @module components/root
 */
// External Dependencies
import React from 'react';
import {RouteHandler} from 'react-router';
import logger from 'bragi-browser';
import {connect} from 'react-redux';

import * as ACTIONS from '../actions.js';

import MainMenu from './root-main-menu.js';
import Party from './root-party.js';
import PartyCreate from './root-party-create.js';

/**
 *
 * Functionality
 *
 */
var Root = React.createClass({
    contextTypes: { router: React.PropTypes.func.isRequired },

    componentWillMount: function componentWillMount(){
        logger.log('components/page-root:componentWillMount', 'called');
    },
    shouldComponentUpdate: function(nextProps){
        if(nextProps.mainMenu === this.props.mainMenu){
            logger.log('components/page-root:shouldComponentUpdate', 'false');
            return false;
        } else {
            logger.log('components/page-root:shouldComponentUpdate', 'true');
            return true;
        }

    },

    render: function render(){
        logger.log('components/page-root:render:' + this.props.mainMenu.page,
        'called | %j', { props: this.props });

        const dispatch = this.props.dispatch;
        let rootHtml = '';

        switch(this.props.mainMenu.page){
            case 'home':
                rootHtml = (<MainMenu dispatch={dispatch}/>);
                break;

            case 'party':
                rootHtml = (<Party dispatch={dispatch} account={this.props.account}/>);
                break;

            case 'party-create':
                //TODO : pass in possible classes / (races?)
                rootHtml = (
                    <PartyCreate dispatch={dispatch}
                        classes={this.props.classes}
                        account={this.props.account}/>
                );
                break;

            default:
                rootHtml = (<MainMenu dispatch={dispatch}/>);
        }

        return (
            <div className='root__wrapper'>
                {rootHtml}
            </div>
        );
    }
});

/**
 * configure select function and connect to redux
 */
function select(state) {
    logger.log('components/app:select', 'called: ', state);

    // TODO: use https://github.com/faassen/reselect and only return certain
    // things
    return state;
}
export default connect(select)(Root);