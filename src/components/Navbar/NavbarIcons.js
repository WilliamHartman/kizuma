import React from 'react';
import MDHome from 'react-icons/lib/md/home';
import MDChat from 'react-icons/lib/md/chat';
import MDPeople from 'react-icons/lib/md/people';
import MDSchool from 'react-icons/lib/md/store';
import MDNote from 'react-icons/lib/md/notifications-active';
import MDNoteNone from 'react-icons/lib/md/notifications-none';
import MDProfile from 'react-icons/lib/md/account-circle';

export default function NavbarIcons(props){
    console.log(props)

    const selectedBar = (option) => {
        if(props.currentPage === option){
            return <div className="navbar-selected-bar"></div>
        }
        else {
            return null;
        }
    }

    switch(props.currentPage){
        case 'home':
            return(
                <div className="navbar-home navbar-icons">
                    <MDHome 
                        size={25}/>
                    <div className='navbar-icon-text'>Home</div>
                    {selectedBar('home')}
                </div>
            )
    }
    
}