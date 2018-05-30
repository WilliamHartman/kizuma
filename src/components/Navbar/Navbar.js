import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUserData } from "../../redux/reducer";
import "./Navbar.css";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import MDSearch from 'react-icons/lib/md/search.js';
import MDHome from 'react-icons/lib/md/home';
import MDChat from 'react-icons/lib/md/chat';
import MDPeople from 'react-icons/lib/md/people';
import MDSchool from 'react-icons/lib/md/store';
import MDNote from 'react-icons/lib/md/notifications-active';
import MDNoteNone from 'react-icons/lib/md/notifications-none';
import MDProfile from 'react-icons/lib/md/account-circle';
import logo from '../../assets/kizuma-logo-eng.svg';
import { withRouter } from "react-router";

import NavbarIcons from './NavbarIcons';

class Navbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchTerm: '',
            open: false
        }

    this.handleInput = this.handleInput.bind(this);
    //this.handleSearchClick = this.handleSearchClick.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
    }

    handleToggle = () => this.setState({ open: !this.state.open });

    handleClose = () => this.setState({ open: false });

    componentDidMount() {
        this.props.getUserData();
    }

    handleInput(e) {
        this.setState({ searchTerm: e.target.value });
    }

    checkEnter = (e) => {
        if(e.keyCode === 13){
            this.handleSearchClick();
            this.props.history.push('/results');
        }
    }

    searchBoxClick = () => {
        this.setState({searchTerm: ''});
    }

    selectedBar = (option) => {
        if(this.props.currentPage === option){
            return <div className="navbar-selected-bar"></div>
        }
        else {
            return null;
        }
    }

    render() {
        return (
            <div className="navbar">
                <div className="navbar-left">
                    <Link to="/" className='navbar-logo-wrapper'>
                        <img src={logo} className="navbar-logo" alt='logo'/>
                    </Link>
                    <div className='navbar-search-wrapper'>
                        <div className='navbar-search-whitebox'>
                            <input
                                className="navbar-search-input"
                                placeholder="Search"
                                onClick={this.searchBoxClick.bind(this)}
                                onChange={e => this.updateSearchTerm(e)}
                                onKeyDown={e => this.checkEnter(e)}
                                value={this.state.searchTerm}
                            />
                            <Link to='/results'>                        
                                <div onClick={this.handleSearchClick} className='navbar-search-button'>
                                    <MDSearch 
                                    size={30}/>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="navbar-right">
                    {/* <div className="navbar-home navbar-icons">
                        <MDHome 
                        size={25}/>
                        <div className='navbar-icon-text'>Home</div>
                        {this.selectedBar('home')}
                    </div> */}
                    <NavbarIcons currentPage={this.props.currentPage} icon={'home'} />
                    <NavbarIcons currentPage={this.props.currentPage} icon={'network'} />
                    <NavbarIcons currentPage={this.props.currentPage} icon={'schools'} />
                    <NavbarIcons currentPage={this.props.currentPage} icon={'messaging'} />
                    <NavbarIcons currentPage={this.props.currentPage} icon={'notifications'} />
                    <NavbarIcons currentPage={this.props.currentPage} icon={'profile'} />
                </div>
                {/* <a href={'http://localhost:8084/auth'} className="login-text">
                    <p className="login nav-button">LOGIN</p>
                </a> */}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      state,
      user: state.reducer.user,
      currentPage: state.reducer.currentPage
    };
  };
  
  export default withRouter(
    connect(mapStateToProps, { getUserData })(Navbar)
  );