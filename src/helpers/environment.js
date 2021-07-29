let APIURL = '';

switch (window.location.hostname) {

    case 'localhost' || '127.0.0.1':
        APIURL = 'https://cb-movie-reviews-server.herokuapp.com/';
        break;

    default :
        APIURL = 'https://cb-movie-reviews-server.herokuapp.com/'
      
}

export default APIURL;