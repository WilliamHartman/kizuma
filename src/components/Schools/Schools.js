import React, { Component } from 'react';
import './Schools.css';
import { connect } from 'react-redux';
import {  } from './../../redux/reducer';
import { withRouter } from 'react-router';

class Schools extends Component {
    constructor(){
      super();
  
    }
  
    render() {
      return (
        <div className="Schools">
          Schools
        </div>
      );
    }
  }
  
  function mapStateToProps(state){
    return {
        
    }
  }
  
  export default withRouter(connect(mapStateToProps, {  })(Schools));