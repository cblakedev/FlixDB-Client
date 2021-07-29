import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {Modal, Button} from 'antd';

class ProfileBioChanger extends Component {
    constructor(props){
        super(props);
        this.state={
            visible: false
        };  
      }
  
      showModal = () => {
          this.setState({
              visible: true,
          });
      };
  
      handleOk = e => {
          console.log(e);
          this.setState({
              visible: false,
          });
      };
  
      handleCancel = e => {
          console.log(e);
          this.setState({
              visible: false,
          });
      };
    render(){
    return (
        <div className="ProfileBioChanger">
<Button type="primary" onClick={this.showModal}>
        Update User Bio
        </Button>
        <Modal
            title="Basic Modal"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            >
                <p>Some content....</p>
          </Modal>      
        </div>
    )    
    }
}

export default ProfileBioChanger