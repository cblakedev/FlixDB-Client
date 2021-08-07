import React, { useState, useEffect } from 'react';
import { Row, Col, Button} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Switch, Link, Route } from 'react-router-dom'
import { RiHomeWifiFill } from 'react-icons/ri';
import { VscPreview, VscOpenPreview } from 'react-icons/vsc';
import { FaListAlt } from 'react-icons/fa'
import MainHome from '../reviews/MainHome';
import AllReviews from '../reviews/AllReviews';
import { Avatar } from '@material-ui/core';
import MyReviews from '../reviews/MyReviews';
import Watchlist from '../reviews/WatchList';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


const SideBar = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = async () => {
        setOpen(true);
        await fetch('profileImg.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(imgData => console.log(imgData))
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                        <div>
                            <Avatar size={400} icon='user' className='avatar' />
                            {/*  
                            <div>User Bio</div> */}

                        </div>
                        <Button type="button" onClick={handleOpen}>
                            Change Profile Image
                        </Button>
                        {/* <FormGroup className='sidebarFormGroup'>
                            <Label for='bioInput'>Profile Bio</Label>
                            <Input id="bioInput" label="Search field" type="textarea" />
                        </FormGroup> */}
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={open}
                            onClose={handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={open}>
                                <div className={classes.paper}>
                                    
                                    <Button>Submit</Button>
                                </div>
                            </Fade>
                        </Modal>

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
                        <Route exact path='/alluserreviews'><AllReviews token={props.token} /></Route>
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