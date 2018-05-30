import React, { Component } from 'react';
import './Messaging.css';
import { connect } from 'react-redux';
import {  } from './../../redux/reducer';
import { withRouter } from 'react-router';

class Messaging extends Component {
    constructor(){
      super();
  
    }
  
    render() {
      return (
        <div className="messaging">
          Messaging
        </div>
      );
    }
  }
  
  function mapStateToProps(state){
    return {
        
    }
  }
  
  export default withRouter(connect(mapStateToProps, {  })(Messaging));