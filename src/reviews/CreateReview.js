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

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
    },
    paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
    },
}));

const CreateReview = (props) => {
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ review, setReview ] = useState('');
    const [ imageURL, setImageURL ] = useState('');
    const classes = useStyles();

    setTitle(props.dataResults.title)
    setDescription(props.dataResults.overview)
    setImageURL(props.dataResults.poster_path)

    const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://cb-movie-reviews-server.herokuapp.com/reviews/create', {
        method: 'POST',
        body: JSON.stringify({review: {
            title: title,
            description: description,
            review: review,
            imageURL: imageURL
        }}),
        headers: new Headers({
            'Content-Type': "application/json",
            'Authorization': `Bearer ${props.token}`
        })
    }).then((res) => res.json())
    .then((logData) => {
        console.log(logData);
        setTitle('');
        setDescription('');
        setReview('');
        setImageURL('');
        props.fetchMovies();
    })
}   

        return (
            <div className={classes.root}>
                <Form onSubmit={handleSubmit}>
                <Paper className={classes.paper}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Avatar>{imageURL}</Avatar>
                        </Grid>
                    <Grid item xs>
                        <Typography>
                            <h4>{title}</h4>
                            <p>{description}</p>
                            <FormGroup>
                                <Label htmlFor='review'/>
                                <Input name='review' value={review} onChange={(e) => setReview(e.target.value)}/>
                            </FormGroup>
                        </Typography>
                    </Grid>
                    </Grid>
                </Paper>
                <Button type='submit'>Click to Submit</Button>
                </Form>
            </div>
        );
    }

export default CreateReview;