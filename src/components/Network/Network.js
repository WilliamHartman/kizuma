import React, { Component } from 'react';
import './Network.css';
import { connect } from 'react-redux';
import {  } from './../../redux/reducer';
import { withRouter } from 'react-router';

class Network extends Component {
    constructor(){
      super();
  
    }
  
    render() {
      return (
        <div className="Network">
          Network
        </div>
      );
    }
  }
  
  function mapStateToProps(state){
    return {
        
    }
  }
  
  export default withRouter(connect(mapStateToProps, {  })(Network));