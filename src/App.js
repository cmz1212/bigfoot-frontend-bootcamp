import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "./App.css";
import axios from "axios";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import NewSighting from "./NewSighting";


const BACKEND_URL = "http://localhost:3000";

const AllSightingsPage = () => {
  const [AllSightings, setAllSightings] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/sightings`).then((response) => {
      setAllSightings(response.data);
    });
  }, []);

  return (
    <div>
      {Array(2).fill(<br />)}
      <Link to="sightings/new">Click here to Submit a NEW Sighting</Link>
      {Array(2).fill(<br />)}
      {AllSightings.map((sighting, index) => (
        <Link to={`/sightings/${index + 1}`} key={index+1}>
          {Array(3).fill(<br />)}
          <Card bg="dark" border="info" text="light">
            <Card.Body>
              <Card.Title>
                {`Sighting ID: ${sighting.id}`}
              </Card.Title>
              <Card.Text className="small-text">
                Date: {sighting.date}
              </Card.Text>
              <Card.Text className="small-text">
                Location: {sighting.location}
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      ))}
    </div>
  );
};

const Sighting = () => {
  const params = useParams();
  const [SelSighting, setSelSighting] = useState(null);

  useEffect(() => {
    if (params.sightingIndex) {
      axios
        .get(`${BACKEND_URL}/sightings/${params.sightingIndex}`)
        .then((response) => {
          setSelSighting(response.data);
        });
    }
  }, [params.sightingIndex]);

  return (
    <div>
      <Link to="/">Home</Link>
      {Array(2).fill(<br />)}

      {SelSighting ? (
        <div className="div-container">
          <center>
            <Card bg="dark">
              <Card.Body>
                <Card.Title>
                  {`ID: ${SelSighting.id}`}
                </Card.Title>
                <Card.Text className="small-text">
                  Date: {SelSighting.date}
                </Card.Text>
                <Card.Text className="small-text">
                  Location: {SelSighting.location}
                </Card.Text>
                <Card.Text className="small-text">
                  Notes: {SelSighting.notes}
                </Card.Text>
              </Card.Body>
            </Card>
          </center>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AllSightingsPage />} />
            <Route path="sightings/:sightingIndex" element={<Sighting />} />
            <Route path="sightings/new" element={<NewSighting />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}
