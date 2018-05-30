import React from 'react';
import MDHome from 'react-icons/lib/md/home';
import MDChat from 'react-icons/lib/md/chat';
import MDPeople from 'react-icons/lib/md/people';
import MDSchool from 'react-icons/lib/md/store';
import MDNote from 'react-icons/lib/md/notifications-active';
import MDNoteNone from 'react-icons/lib/md/notifications-none';
import MDProfile from 'react-icons/lib/md/account-circle';
import { CLIENT_RENEG_LIMIT } from 'tls';

export default function NavbarIcons(props){
    console.log(props)

    const selectedBar = () => {
            return <div className="navbar-selected-bar"></div>
    }

    switch(props.icon){
        case 'home':
            if(props.currentPage === props.icon){
                console.log('true')
                return(
                    <div className="navbar-icons-selected">
                        <MDHome 
                            size={25}/>
                        <div className='navbar-icon-text'>Home</div>
                        {selectedBar()}
                    </div>
                )
            }
            return(
                <div className="navbar-icons">
                    <MDHome 
                        size={25}/>
                    <div className='navbar-icon-text'>Home</div>
                </div>
            )

        case 'network':
            if(props.currentPage === props.icon){
                console.log('true')
                return(
                    <div className="navbar-icons-selected">
                        <MDPeople
                            size={25}/>
                        <div className='navbar-icon-text'>Network</div>
                        {selectedBar()}
                    </div>
                )
            }
            return(
                <div className="navbar-icons">
                    <MDPeople
                        size={25}/>
                    <div className='navbar-icon-text'>Network</div>
                </div>
            )
        
        case 'schools':
            if(props.currentPage === props.icon){
                console.log('true')
                return(
                    <div className="navbar-icons-selected">
                        <MDSchool
                            size={25}/>
                        <div className='navbar-icon-text'>Schools</div>
                        {selectedBar()}
                    </div>
                )
            }
            return(
                <div className="navbar-icons">
                    <MDSchool
                        size={25}/>
                    <div className='navbar-icon-text'>Schools</div>
                </div>
            )
        
        case 'messaging':
            if(props.currentPage === props.icon){
                console.log('true')
                return(
                    <div className="navbar-icons-selected">
                        <MDChat
                            size={25}/>
                        <div className='navbar-icon-text'>Messaging</div>
                        {selectedBar()}
                    </div>
                )
            }
            return(
                <div className="navbar-icons">
                    <MDChat
                        size={25}/>
                    <div className='navbar-icon-text'>Messaging</div>
                </div>
            )
        
        case 'notifications':
            if(props.currentPage === props.icon){
                console.log('true')
                return(
                    <div className="navbar-icons-selected">
                        <MDNote
                            size={25}/>
                        <div className='navbar-icon-text'>Notifications</div>
                        {selectedBar()}
                    </div>
                )
            }
            return(
                <div className="navbar-icons">
                    <MDNote
                        size={25}/>
                    <div className='navbar-icon-text'>Notifications</div>
                </div>
            )
        
        case 'profile':
            if(props.currentPage === props.icon){
                console.log('true')
                return(
                    <div className="navbar-icons-selected">
                        <MDProfile
                            size={25}/>
                        <div className='navbar-icon-text'>Profile</div>
                        {selectedBar()}
                    </div>
                )
            }
            return(
                <div className="navbar-icons">
                    <MDProfile
                        size={25}/>
                    <div className='navbar-icon-text'>Profile</div>
                </div>
            )
        
        default:
            return null;
    }
    
}