import React, {Component, useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import {Avatar} from 'antd' ;
// import ProfileEdit from '../userprofile/UpdateProfile';
import { Row, Col, Container } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Switch, Link, Route } from 'react-router-dom'
import { RiHomeWifiFill } from 'react-icons/ri';
import { VscPreview, VscOpenPreview } from 'react-icons/vsc';
import { FaListAlt } from 'react-icons/fa'
import MainHome from '../reviews/MainHome';
import AllReviews from '../reviews/AllReviews';
import { Button } from 'reactstrap';
import ProfilePicChanger from './ProfilePicChanger';
import Pic1 from "./assets/1.jpg";
import Pic2 from "./assets/2.jpg";
import ProfileBioChanger from './ProfileBioChanger';



const SideBar = (props) => {
    const [profileImage, setprofileImage] = useState('')
    const handleImageChange = (profileImage) => {

        setprofileImage(profileImage)
    }








    return (
        <div id='mainWrapper'>
            <Row className='headerBar g-0'>
                <Col>
                    <h3>Movie Reviews</h3>
                </Col>
            </Row>
            <Row className='sidebarWrapper g-0'>
                <div className='sidebarContent'>
                    <Col className='userInfo'>
                        <div> User Image</div>
                        <Avatar size={64}  icon="user" src={profileImage} className='avatar' />
                        <ProfilePicChanger handleImageChange={handleImageChange} pic1={Pic1} pic2={Pic2}/>
                        <div>User Bio</div>
                        <div> I am a movie buff</div>
                        <ProfileBioChanger/>
                    </Col>
                    <Col className='userOperations'>
                        <ul className='operationsList'>
                            <li><Link to='/'><RiHomeWifiFill /> Home</Link></li>
                            <li><Link to='/myreviews'><VscPreview /> My Reviews</Link></li>
                            <li><Link to='/alluserreviews'><VscOpenPreview /> All User Reviews</Link></li>
                            <li><Link to='/watchlist'><FaListAlt /> Watch List</Link></li>
                        </ul>
                        <Button onClick={props.logout}>Logout</Button>
                    </Col>
                </div>
                <div className='sidebarRoute'>
                    <Switch>
                        <Route exact path='/'><MainHome token={props.token}/></Route>
                        <Route exact path='/myreviews'>My Reviews</Route>
                        <Route exact path='/alluserreviews'><AllReviews token={props.token}/></Route>
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