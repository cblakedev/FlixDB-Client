import React, {
    useState
} from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap'

const CreateReview = (props) => {
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ review, setReview ] = useState('');
    const [ imageURL, setImageURL ] = useState('');

    setTitle(props.selected.title)
    setDescription(props.selected.overview)
    setImageURL(props.selected.poster_path)

    const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://cb-movie-reviews-server.herokuapp.com/review/create', {
        method: 'POST',
        body: JSON.stringify({review: {
            title: title,
            description: description,
            review: review,
            imageURL: imageURL
        }}),
        headers: new Headers({
            'Content-Type': "application/json",
            'Authorization': props.token
        })
    }).then((res) => res.json())
    .then((logData) => {
        console.log(logData);
        props.fetchMovies();
    })
}   

        return (
            <div>{`Review for ${props.dataResults.title} has been saved.`}</div>
        );
    }

export default CreateReview;