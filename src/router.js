import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Network from './components/Network/Network';
import Schools from './components/Schools/Schools';
import Messaging from './components/Messaging/Messaging';
import Notifications from './components/Notifications/Notifications';
import Profile from './components/Profile/Profile';

export default (
    <Switch>
        <Route path='/' exact component={ Home }/>
        <Route path='/network' exact component={ Network }/>
        <Route path='/schools' exact component={ Schools }/>
        <Route path='/messaging' exact component={ Messaging }/>
        <Route path='/notifications' exact component={ Notifications }/>
        <Route path='/profile' exact component={ Profile }/>
    </Switch>
)