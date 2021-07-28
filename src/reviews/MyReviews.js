import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import CreateReview from './CreateReview';
import EditReview from './EditReview';

const MyReviews = (props) => {
    const [ newReview, setNewReview ] = useState('');
    const [ updateActive, setUpdateActive ] = useState(false);
    const [ reviewToUpdate, setReviewToUpdate ] = useState({});

    // let userID = props.
    const fetchMyReviews = () => {
        fetch(`https://cb-movie-reviews-server.herokuapp.com/review/`, {
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
        fetchMyReviews();
    })

    return(
        <Container>
           
        </Container>
    )
}

export default MyReviews;