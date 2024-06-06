import './Home.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleTopClick = () => {
    navigate('/uen')
  };

  const handleBottomClick = () => {
    navigate('/weather')
  };

  return (
    <Container fluid className="vh-100">
      <Row className="h-50 top-half clickable" onClick={handleTopClick}>
        <Col className="d-flex justify-content-center align-items-center">
          <h1>Check Validity of UEN</h1>
        </Col>
      </Row>
      <Row className="divider"></Row>
      <Row className="h-50 bottom-half clickable" onClick={handleBottomClick}>
        <Col className="d-flex justify-content-center align-items-center">
          <h1>Get Next 2 Hour's Weather Data</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
