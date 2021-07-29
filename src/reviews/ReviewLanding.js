import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import CreateReview from './CreateReview';
import ReviewTable from './ReviewTable.js';
import EditReview from './EditReview';

const ReviewIndex = (props) => {
    const [ newReview, setNewReview ] = useState('');
    const [ updateActive, setUpdateActive ] = useState(false);
    const [ reviewToUpdate, setReviewToUpdate ] = useState({});

    const fetchReviews = () => {
        fetch('https://cb-movie-reviews-server.herokuapp.com/reviews/', {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then((res) => res.json())
        .then((logData) => {
            setNewReview(logData)
        })
    }

    const editReview = (review) => {
        setReviewToUpdate(review);
    }

    const updateOn = () => {
        setUpdateActive(true);
    }

    const updateOff = () => {
        setUpdateActive(false);
    }

    useEffect(() => {
        fetchReviews();
    })

    return(
        <Container>
            <Row>
                <Col md="3">
                    <CreateReview fetchReviews={fetchReviews} token={props.token}/>
                </Col>
                <Col md="9">
                    <ReviewTable reviews={reviews} editReview={editReview} updateOn={updateOn} fetchReviews={fetchReviews} token={props.token}/>
                </Col>
                {updateActive ? <EditReview reviewToUpdate={reviewToUpdate} updateOff={updateOff} token={props.token} fetchReviews={fetchReviews}/> : <></>}
            </Row>
        </Container>
    )
}