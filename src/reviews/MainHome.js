import React, {useState, useEffect, useRef} from 'react';
import {Row, Col, Container} from 'reactstrap'
import {Button, Form, FormGroup, Input} from 'reactstrap';


const SearchBar = () => {
    const [value, setValue] = useState('');
    const [search, setSearch] = useState({});
    const [pageNumber, setPageNumber] = useState(1);
    const [searchPageNumber, setSearchPageNumber] = useState(1);
    const isMounted = useRef(false);

    let dataResults = search.results

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${window.env.API_KEY}&language=en-US&page=${pageNumber}&include_adult=false`)
            .then((res) => res.json())
            .then((data) => setSearch(data))
    }, [pageNumber])


    useEffect(() => {
        if (isMounted.current) {
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${window.env.API_KEY}&language=en-US&query=${value}&page=${searchPageNumber}&include_adult=false`)
                .then((res) => res.json())
                .then((data) => {
                    setSearch(data)
                    console.log(search.page)
                })
        } else {
            isMounted.current = true;
        }

    }, [searchPageNumber])


    const fetchMovies = (e) => {
        e.preventDefault()

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${window.env.API_KEY}&language=en-US&query=${value}&page=${searchPageNumber}&include_adult=false`)
            .then((res) => res.json())
            .then((data) => {
                setSearch(data)
                console.log(search.page)
            })
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
            <Row className='resultsWrapper g-0'>
                {dataResults !== undefined ? dataResults.map(result => {
                    return (
                        <Col className='resultsCol'>
                            {result.poster_path != null ? <img src={`https://image.tmdb.org/t/p/w154${result.poster_path}`} alt='No poster available' /> :
                                <h2 className='altBackground'>No poster available</h2>}
                            <h5>{result.title}</h5>
                            <Button>Review Me</Button>
                        </Col>
                    )
                })
                    :
                    <Col className='noResultsCol'>
                        <h1>Search for an available movie!</h1>
                    </Col>
                }
            </Row>
            {
                value !== '' ?
                    <Row className='g-0'>
                        <Col className='paginationBtns'>
                            {searchPageNumber > 1 ? <Button className='previousBtn' onClick={() => setSearchPageNumber(searchPageNumber - 1)}>Previous</Button> : undefined}
                            {searchPageNumber < search.total_pages ? <Button className='nextBtn' onClick={() => setSearchPageNumber(searchPageNumber + 1)}>Next</Button> : undefined}
                        </Col>
                    </Row>
                    :
                    <Row className=' g-0'>
                        <Col>
                            {pageNumber > 1 ? <Button className='previousBtn' onClick={() => setPageNumber(pageNumber - 1)}>Previous</Button> : undefined}
                            {pageNumber < search.total_pages ? <Button className='nextBtn' onClick={() => setPageNumber(pageNumber + 1)}>Next</Button> : undefined}
                        </Col>
                    </Row>
            }
        </Container>
    )
}

export default SearchBar

