import './Weather.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import axios from 'axios';
import { FloatButton } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const validLocations = "Ang Mo Kio, Bedok, Bishan, Boon Lay, Bukit Batok, Bukit Merah, Bukit Panjang, Bukit Timah, Central Water Catchment, Changi, Choa Chu Kang, Clementi, City, Geylang, Hougang, Jalan Bahar, Jurong East, Jurong Island, Jurong West, Kallang, Lim Chu Kang, Mandai, Marine Parade, Novena, Pasir Ris, Paya Lebar, Pioneer, Pulau Tekong, Pulau Ubin, Punggol, Queenstown, Seletar, Sembawang, Sengkang, Sentosa, Serangoon, Southern Islands, Sungei Kadut, Tampines, Tanglin, Tengah, Toa Payoh, Tuas, Western Islands, Western Water Catchment, Woodlands, Yishun";


const Weather = () => {
    const navigate = useNavigate();
    const [location, setLocation] = useState("");
    const [response, setResponse] = useState({})
    
    const URL = process.env.REACT_APP_BASE_URL;
    const WEATHER = process.env.REACT_APP_CHECK_WEATHER;

    const handleOnBackClick = () => {
        navigate('/')
      };

    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            const resp = await axios.get(`${URL}${WEATHER}`, {
                params: {location: location}
            })
            setResponse(resp.data)
        } catch (error) {
            console.error(error);
        }        
        
    };

    return (
        <Container fluid className="vh-100 center-box">
            <FloatButton onClick = {handleOnBackClick} className="float-button" type="primary" shape="rectangle" icon={<LeftOutlined />} />
            <Row className="justify-content-center align-items-center w-100 h-100">
                <Col xs={12} md={6} className="d-flex flex-column justify-content-center align-items-center">
                    <h1 className="text-center mb-4">Type the location in Singapore you want to check the weather for.</h1>
                    <Form onSubmit={handleSubmit} className="w-100 d-flex flex-column align-items-center">
                        <Form.Group controlId="formBasicWeather" className="w-100 d-flex flex-column align-items-center">
                            <Form.Control 
                                type="text" 
                                placeholder="Enter text" 
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="input-box mb-2" 
                            />
                            <Button variant="primary" type="submit" className="submit-button">
                                Submit
                            </Button>
                        </Form.Group>
                    </Form>
                    {response.valid_loc === false &&  response.valid_loc !== undefined? (
                        <div className="response-message">
                            Not a valid location
                        </div>
                    ) : response.valid_loc ? (
                        <div className="response-message">
                            The weather in <span className="underline">{response.location}</span> is <span className="underline">{response.forecast}</span>, this forecast is valid from <span className="underline">{response.valid_start}</span> to <span className="underline">{response.valid_end}</span>.
                        </div>
                    ) : null}
                </Col>
            </Row>
            <footer className="footer mt-auto py-3 bg-light">
                <Container>
                    <Row>
                        <Col className="text-center">
                            Valid locations include {`${validLocations}`}
                        </Col>
                    </Row>
                </Container>
            </footer>
        </Container>
    );
}

export default Weather;
