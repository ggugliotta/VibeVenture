// src/App.js

import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";
import { useEffect, useState } from "react";
import { extractLocations, getEvents } from "./api";
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';
import CityEventsChart from './components/CityEventsChart';

import "./App.css";

const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

const fetchData = async () => {
  const allEvents = await getEvents();
  const filteredEvents = currentCity === "See all cities" ?
    allEvents : 
    allEvents.filter(event => event.location === currentCity)
  setEvents(filteredEvents.slice(0, currentNOE));
  setAllLocations(extractLocations(allEvents));
}

useEffect(() => {
  if (navigator.onLine) {
    // set the warning alert message to an empty string ""
  } else {
    // set the warning alert message to a non-empty string
  }
  fetchData();
  }, [ currentCity, currentNOE ]);


return (
    <div className="App">
      <h1>VibeVenture App</h1>
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text ={infoAlert}/> : null}
        {errorAlert.length ? <ErrorAlert text ={errorAlert}/> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert}/> : null}
      </div>
      <CitySearch allLocations={allLocations} setCurrentCity = {setCurrentCity} setInfoAlert={setInfoAlert}/>
      <NumberOfEvents setCurrentNOE ={setCurrentNOE} setErrorAlert={setErrorAlert} />
      <CityEventsChart allLocations={allLocations} events={events} />
      <EventList events={events}/>
    </div>
  );
};

export default App;
