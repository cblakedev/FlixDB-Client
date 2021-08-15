import React, {
    useState
} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Login from './Login';
import Register from './Register';
import '../App.css'


const AuthorizationTabs = (props) => {
    const [value, setValue] = useState(0);

    
    const handleChange = (e, newValue) => { //handles the change between tabs by setting a new value to a tab
        setValue(newValue);
    };

    return (        
        <div id='mainAuthWrapper'> 
            <div id='authWrapper'>
                <AppBar position="static"> {/* the bar that controls the tabs at the top of the container */}
                    <Tabs className='authTabs' value={value} onChange={handleChange}>
                        <Tab className='loginTab' label="Login" />
                        <Tab className='signupTab' label="Register" />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}> {/* each TabPanel displays the corresponding child components(Login, Register) */}
                    <Login updatetoken={props.updateToken} handleChange={handleChange} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Register updatetoken={props.updateToken} handleChange={handleChange} />
                </TabPanel>
            </div>
        </div>
    );
}

function TabPanel(props) { //functional component that assists with the set up of the tab schema
    const { children, value, index } = props;

    return (
        <div role="tabpanel">
            {value === index && ( //for each TabPanel, only display the children element when value and index are equal.
                <Box>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = { //allows the definition of props being used within the TabPanel functional component.
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export default AuthorizationTabs