let APIURL = '';

switch (window.location.hostname) {

    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:5000/';
        break;

    case 'cb-movie-reviews-client.herokuapp.com/' :
        APIURL = 'https://cb-movie-reviews-server.herokuapp.com/'
      
}

export default APIURL;