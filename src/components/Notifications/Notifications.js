import React, { Component } from 'react';
import './Notifications.css';
import { connect } from 'react-redux';
import {  } from './../../redux/reducer';
import { withRouter } from 'react-router';

class Notifications extends Component {
    constructor(){
      super();
  
    }
  
    render() {
      return (
        <div className="Notifications">
          Notifications
        </div>
      );
    }
  }
  
  function mapStateToProps(state){
    return {
        
    }
  }
  
  export default withRouter(connect(mapStateToProps, {  })(Notifications));