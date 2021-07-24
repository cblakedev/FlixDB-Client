import React, {
    useState,
} from 'react';
import {
    Row,
    Col,
    Container
} from 'reactstrap'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


const SearchBar = () => {
    const [value, setValue] = useState('');
    const [search, setSearch] = useState({});
    const dataResults = search.results

    const fetchMovies = async (e) => {
        e.preventDefault()

        await fetch(`https://api.themoviedb.org/3/search/movie?api_key=29b70d95a85cb998fa335f41be3c2bc0&language=en-US&query=${value}&page=1&include_adult=false`)
            .then((res) => res.json())
            .then((data) => setSearch(data))
    }

    console.log(search.results)

    return (
        <Container id='homeWrapper'>
            <Row className='searchField'>
                <Col>
                    <Form onSubmit={fetchMovies}>
                        <FormGroup>
                            <input id="standard-search" value={value} label="Search field" type="text" onChange={(e) => setValue(e.target.value)} />
                        </FormGroup>
                        <button type='submit' >Submit</button>
                    </Form>
                </Col>

            </Row>
            <Row>

                {dataResults != undefined ? dataResults.map(result => {
                    return (
                        <Col>
                            <h3>{result.title}</h3>
                            <img src={`https://image.tmdb.org/t/p/w185${result.poster_path}`} alt='No poster available'/>
                            <p>{result.overview}</p>
                        </Col>
                    )
                })
                    : <p>Search for a movie!</p>
                }

            </Row>
        </Container>






    )
}

export default SearchBar