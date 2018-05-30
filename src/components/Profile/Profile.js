import React, { Component } from 'react';
import './Profile.css';
import { connect } from 'react-redux';
import {  } from './../../redux/reducer';
import { withRouter } from 'react-router';

class Profile extends Component {
    constructor(){
      super();
  
    }
  
    render() {
      return (
        <div className="Profile">
          Profile
        </div>
      );
    }
  }
  
  function mapStateToProps(state){
    return {
        
    }
  }
  
  export default withRouter(connect(mapStateToProps, {  })(Profile));