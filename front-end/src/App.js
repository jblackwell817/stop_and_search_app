import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState } from 'react';

/**
 * Present the user with stop and search data for a police force of their choice.
 */
function App() {
  const [force, setForce] = useState([]);
  const [month, setMonth] = useState([]);
  const [data, setData] = useState([]);

  // check that the form has been completed and fetch the data from the back-end
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (force === "nothing" || month === "nothing") {
      const {emptyData} = "";
      setData(emptyData);
    } else {
      const url = "http://127.0.0.1:8000/force/" + force + "/2022/" + month;
      const {data} = await axios(url);
      setData(data);
    }
  }

  // set the month variable when the form is updated
  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  }
  
  // set the police force variable when the form is updated
  const handleForceChange = (event) => {
    setForce(event.target.value);
  }

  return (
    <html lang="en">
      <head>
        {/* Required meta tags */}
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        {/* Bootstrap css */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"/>
      </head>
      <h1 class="display-3 text-center">Stop and search analyser</h1>
      <div class="form-group d-flex align-items-center justify-content-center">
          <form onSubmit={handleSubmit}>
            <label>Choose a Police Force:
              <select class="form-select form-select-lg mb-3" value={force} onChange={handleForceChange} required={true}>
                <option selected value="nothing">Police Force</option>
                <option value="avon-and-somerset">Avon and Somerset</option>
                <option value="devon-and-cornwall">Devon and Cornwall</option>
                <option value="dorset">Dorset</option>          
              </select>
            </label>
              <select value={month} onChange={handleMonthChange} required={true}>
                <option selected value="nothing">Month</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
              </select>
            <button type="submit" class="btn btn-primary">Go</button>
          </form>
      </div>
      <div><p class="text-center">Data: {data}</p></div>
      <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    </html>
  );
}

export default App;
