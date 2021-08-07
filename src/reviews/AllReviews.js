import React, { useState } from 'react';
import { Row, Col, Container } from 'reactstrap'
import { Button, Form, FormGroup, Input } from 'reactstrap';
import APIURL from '../helpers/environment'

const AllReviews = (props) => {
    const [reviewsData, setReviewsData] = useState([])
    const [value, setValue] = useState('')


    const fetchMovies = async (e) => {
        e.preventDefault()

        await fetch(`${APIURL}reviews/search/${value}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.token}`
            })
        })
            .then(res => res.json())
            .then(data => setReviewsData(data))
        console.log(reviewsData)
    }

    return (
        <Container id='homeWrapper'>
            <Row className='searchField g-0'>
                <Col className='searchCol'>
                    <Form onSubmit={fetchMovies}>
                        <FormGroup className='searchGroup'>
                            <Input id="standard-search" value={value} label="Search field" type="text" onChange={(e) => setValue(e.target.value)} />
                            <Button type='submit'>Search</Button>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
            {reviewsData.length >= 1 ?
                <div className='reviewsDataWrapper'>
                    <Row className='resultsWrapper g-0'>
                        <Col>
                            {reviewsData[0].imageURL != null ? <img className='searchedMoviePoster' src={`https://image.tmdb.org/t/p/w300${reviewsData[0].imageURL}`} />
                                : <div className='reviewsAltPoster'><h2>No Poster Available</h2></div>}
                            <h2>{reviewsData[0].title.toUpperCase()}</h2>
                            <h5 className='reviewsHeader'>Reviews</h5>
                        </Col>
                    </Row>

                    <Row className='allReviewsWrapper g-0'>
                        {reviewsData.map(review => {
                            return (
                                <Col className='userReviewsWrapper'>
                                    <p>{review.review}</p>
                                </Col>
                            )
                        })
                        }
                    </Row>
                </div>
                :
                <Row className=' g-0'>
                    <Col className='noResultsWrapper'>
                        <h1> Search for a movie and see what people are saying!</h1>
                    </Col>
                </Row>
            }
        </Container>
    )
}

export default AllReviews