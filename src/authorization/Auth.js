import React, {
    useEffect,
    useState
} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Login from './Login';
import Register from './Register';
import '../App.css'


const AuthorizationTabs = () => {
    const [value, setValue] = useState(0);
    const [sessionToken, setSessionToken] = useState('');

    const updateToken = (newToken) => {
        localStorage.setItem('token', newToken);
        setSessionToken(newToken);
        console.log(sessionToken);
    }

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    return (
        <div id='mainAuthWrapper'>
            <div id='authWrapper'>
                <AppBar position="static">
                    <Tabs className='authTabs' value={value} onChange={handleChange}>
                        <Tab className='loginTab' label="Login" />
                        <Tab className='signupTab' label="Register" />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <Login updatetoken={updateToken} handleChange={handleChange} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Register updatetoken={updateToken} handleChange={handleChange} />
                </TabPanel>
            </div>
        </div>

    );
}

function TabPanel(props) {
    const { children, value, index } = props;

    return (
        <div role="tabpanel">
            {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export default AuthorizationTabs