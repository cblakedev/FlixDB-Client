import React, {useState, useEffect} from 'react';
import { Container, Row, Col } from 'reactstrap';
import ProfileCreate from './CreateProfile';
import ProfileEdit from './UpdateProfile';

const ProfileIndex = (props) => {
    const [UserData, setUserData] = useState([]);
    const [updateActive, setUpdateActive] = useState(false);
    const [ProfileToUpdate, setProfileToUpdate] = useState({})
    const fetchUserData = () => {
        fetch(`http://localhost:5000/${props.id}`, {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then( (res) => res.json())
          .then((UserData) => {
              setUserData(UserData)
              console.log(UserData)
          })
    }

    const ProfileToUpdate = (UserData) => {
        setProfileToUpdate(UserData);
        console.log(UserData)
    }
    }

    const updateOn = () => {
        setUpdateActive(true);
    }

    const updateOff = () => {
        setUpdateActive(false);
    }

    useEffect(() => {
        fetchUserData();
    }, /*[]*/)

    return(
        <Container>
            <Row>
                <Col md="3">
                    <ProfileCreate fetchUserData={fetchUserData} token={props.token}/>
                </Col>
                <Col md="9">
                    <WorkoutTable workouts={workouts} editUpdateWorkout={editUpdateWorkout}
                    updateOn={updateOn} fetchUserData={fetchUserData}
                    token={props.token}/>
                </Col>
                {updateActive ? <WorkoutEdit workoutToUpdate={workoutToUpdate}
                updateOff={updateOff} token={props.token} fetchWorkouts={fetchWorkouts}/> : <></>}
            </Row>
        </Container>
    )
}

export default ProfileIndex