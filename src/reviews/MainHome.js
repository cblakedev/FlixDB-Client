import React, {
    useState,
    useEffect
} from 'react';
import {
    Row,
    Col,
    Container
} from 'reactstrap'
import TextField from '@material-ui/core/TextField';


const SearchBar = () => {
    const [value, setValue] = useState(0);
    const [search, setSearch] = useState('');

    const fetchMovies = (e) => {
        e.preventDefault()

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=29b70d95a85cb998fa335f41be3c2bc0&language=en-US&query=${search}&page=1&include_adult=false`)
            .then((res) => res.json())
            .then((data) => console.log(data))
    }

    return (
        <Container id='mainWrapper'>
            <Row>
                <Col>
                    <form>
                        <TextField id="standard-search" label="Search field" type="search" onChange={(e) => setValue(e.target.value)} />
                    </form>
                </Col>
            </Row>
            <Row>
                <Col>
                    {/* put all movie data here */}
                </Col>
            </Row>

        </Container>






    )
}

export default SearchBar