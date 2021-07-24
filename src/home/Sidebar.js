import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Switch, Link, Route } from 'react-router-dom'
import { RiHomeWifiFill } from 'react-icons/ri';
import { VscPreview, VscOpenPreview } from 'react-icons/vsc';
import { FaListAlt } from 'react-icons/fa'
import MainHome from '../reviews/MainHome';


const SideBar = (props) => {








    return (
        <div id='mainWrapper'>
            <Row className='headerBar g-0'>
                <Col>
                    Movie Reviews
                </Col>
            </Row>
            <Row className='sidebarWrapper g-0'>
                <div className='sidebarContent'>
                    <Col className='userInfo'>
                        <div>User Image</div>
                        <div>User Bio</div>
                    </Col>
                    <Col className='userOperations'>
                        <ul className='operationsList'>
                            <li><Link to='/'><RiHomeWifiFill /> Home</Link></li>
                            <li><Link to='/myreviews'><VscPreview /> My Reviews</Link></li>
                            <li><Link to='/alluserreviews'><VscOpenPreview /> All User Reviews</Link></li>
                            <li><Link to='/watchlist'><FaListAlt /> Watch List</Link></li>
                        </ul>
                    </Col>
                </div>
                <div className='sidebarRoute'>
                    <Switch>
                        <Route exact path='/'><MainHome /></Route>
                        <Route exact path='/myreviews'>My Reviews</Route>
                        <Route exact path='/alluserreviews'>All User Reviews</Route>
                        <Route exact path='/watchlist'>Watch List</Route>
                    </Switch>
                </div>
            </Row>



            <div>

            </div>
        </div>
    )
}

export default SideBar