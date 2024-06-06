import './Uen.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import axios from 'axios';
import UenRequest from '../../models/uenRequest';
import { FloatButton } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Uen = () => {
    const navigate = useNavigate();

    const [uen, setUen] = useState("");
    const [respMessage, setRespMessage] = useState("")
    const URL = process.env.REACT_APP_BASE_URL;
    const checkuen = process.env.REACT_APP_CHECK_UEN_SUB_URL;


    const handleOnBackClick = () => {
      navigate('/')
    };


    const handleSubmit = async(event) => {
        event.preventDefault();

        const requestData = new UenRequest(uen);

        try {
            const resp = await axios.post(`${URL}${checkuen}`, JSON.stringify(requestData),
            {
                headers: {
                'Content-Type': 'application/json'
              }
            });
            if (resp.data.error === "") {
                setRespMessage(resp.data.message);
            } else {
                setRespMessage(resp.data.error);
            }
        } catch (error){
            console.error(error);
            alert('An error occurred. Please try again.');
        }
    };


    return (
      <Container fluid className="vh-100 center-box">
        <FloatButton onClick = {handleOnBackClick}className="float-button" type="primary" shape="rectangle" icon={<LeftOutlined />} />
        <Row>
          <Col className="d-flex justify-content-center align-items-center flex-column">
            <h1>Type the UEN you want to check here.</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicUen" className='d-flex'>
                <Form.Control 
                type="text" 
                placeholder="Enter UEN" 
                value = {uen}
                onChange = {(e) => setUen(e.target.value)}
                className="input-box" />
              </Form.Group>
              <div className="d-flex justify-content-center">
              <Button variant="primary" type="submit" className="submit-button" onPress>
              Check
              </Button>
              </div>            
            </Form>
            {respMessage && (
                        <div className="response-message">
                            {respMessage}
                        </div>
            )}
          </Col>
        </Row>
      </Container>
    );
  }

export default Uen;
