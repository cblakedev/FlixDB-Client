import React, {
    useState
} from 'react';
import {
    Row,
    Col,
    Container
} from 'reactstrap'
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";

const CreateReview = (props) => {
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ rating, setRating ] = useState('');
    const [ review, setReview ] = useState('');
    const [ imageURL, setImageURL ] = useState('');
    const [ genre, setGenre ] = useState('');
    const [ cast, setCast ] = useState('');
    
    const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/review/create', {
        method: 'POST',
        body: JSON.stringify({review: {
            title: title,
            description: description,
            rating: rating,
            review: review,
            imageURL: imageURL,
            genre: genre,
            cast: cast
        }}),
        headers: new Headers({
            'Content-Type': "application/json",
            'Authorization': props.token
        })
    }).then((res) => res.json())
    .then((logData) => {
        console.log(logData);
        setTitle('');
        setDescription('');
        setRating('');
        setReview('');
        setImageURL('');
        setGenre('');
        setCast('');
        props.fetchMovies()
    })
}
    
    return (
        <Container id='homeWrapper'>
            <Row className='searchField'>
                <h4>Create a Review</h4>
                <Col>
                    {<img src={`https://image.tmdb.org/t/p/w154${props.dataResults.poster_path}` alt='No poster available'}/>}
                </Col>
            </Row>
        </Container>
    )
    }

    export default CreateReview;