import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Switch, Link, Route } from 'react-router-dom'
import { RiHomeWifiFill } from 'react-icons/ri';
import { VscPreview, VscOpenPreview } from 'react-icons/vsc';
import { FaListAlt } from 'react-icons/fa'
import MainHome from '../reviews/MainHome';
import AllReviews from '../reviews/AllReviews';
import { Button } from 'reactstrap';
import { Avatar } from '@material-ui/core';
import MyReviews from '../reviews/MyReviews';
import Watchlist from '../reviews/WatchList';


const SideBar = (props) => {


    return (
        <div id='mainWrapper'>
            <Row className='headerBar g-0'>
                <Col>
                    <h2>Movie Reviews</h2>
                </Col>
            </Row>
            <Row className='sidebarWrapper g-0'>
                <div className='sidebarContent'>
                    <Col className='userInfo'>
                        <div>User Image</div>
                        <Avatar size={128} icon='user' className='avatar' />
                        <div>User Bio</div>
                    </Col>
                    <Col className='userOperations'>
                        <ul className='operationsList'>
                            <li><Link to='/'><RiHomeWifiFill /> Home</Link></li>
                            <li><Link to='/myreviews'><VscPreview /> My Reviews</Link></li>
                            <li><Link to='/alluserreviews'><VscOpenPreview /> Movie Reviews</Link></li>
                            <li><Link to='/watchlist'><FaListAlt /> Watch List</Link></li>
                        </ul>
                        <Button onClick={props.logout}>Logout</Button>
                    </Col>
                </div>
                <div className='sidebarRoute'>
                    <Switch>
                        <Route exact path='/'><MainHome token={props.token} /></Route>
                        <Route exact path='/myreviews'><MyReviews token={props.token} /></Route>
                        <Route exact path='/alluserreviews'><AllReviews token={props.token}  /></Route>
                        <Route exact path='/watchlist'><Watchlist token={props.token} /></Route>

                    </Switch>
                </div>
            </Row>



            <div>

            </div>
        </div>
    )
}

export default SideBar;