import axios from 'axios';
import { useState } from 'react';

/**
 * Present the user with stop and search data for a police force of their choice.
 */
function App() {
  const [force, setForce] = useState([]);
  const [data, setData] = useState([]);

  // check that the form has been completed and fetch the data from the back-end
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (force === "nothing") {
      const {emptyData} = "";
      setData(emptyData);
    } else {
      const url = "http://127.0.0.1:8000/force/" + force;
      const {data} = await axios(url);
      setData(data);
    }
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
                <option value="bedfordshire">Bedfordshire</option>
                <option value="btp">British Transport Police</option>
                <option value="cambridgeshire">Cambridgeshire</option>
                {/* <option value="cheshire">Cheshire</option> */}
                <option value="city-of-london">City of London</option>
                <option value="cleveland">Cleveland</option>
                <option value="cumbria">Cumbria</option>
                <option value="derbyshire">Derbyshire</option>
                <option value="devon-and-cornwall">Devon and Cornwall</option>
                <option value="dorset">Dorset</option>
                <option value="durham">Durham</option>
                <option value="dyfed-powys">Dyfed-Powys</option>
                <option value="essex">Essex</option>
                <option value="gloucestershire">Gloucestershire</option>
                {/* <option value="greater-manchester">Greater Manchester</option> */}
                <option value="gwent">Gwent</option>
                <option value="hampshire">Hampshire</option>
                <option value="hertfordshire">Hertfordshire</option>
                <option value="humberside">Humberside</option>
                <option value="kent">Kent</option>
                <option value="lancashire">Lancashire</option>
                <option value="leicestershire">Leicestershire</option>
                <option value="lincolnshire">Lincolnshire</option>
                <option value="merseyside">Merseyside</option>
                <option value="metropolitan">Metropolitan</option>
                <option value="norfolk">Norfolk</option>
                <option value="north-wales">North Wales</option>
                <option value="north-yorkshire">North Yorkshire</option>
                {/* <option value="northern-ireland">Northern Ireland</option> */}
                <option value="northamptonshire">Northamptonshire</option>
                <option value="northumbria">Northumbria</option>
                <option value="nottinghamshire">Nottinghamshire</option>
                <option value="south-wales">South Wales</option>
                <option value="south-yorkshire">South Yorkshire</option>
                <option value="staffordshire">Staffordshire</option>
                <option value="suffolk">Suffolk</option>
                <option value="surrey">Surrey</option>
                <option value="sussex">Sussex</option>
                <option value="thames-valley">Thames Valley</option>
                <option value="warwickshrie">Warwickshire</option>
                <option value="west-mercia">West Mercia</option>
                <option value="west-midlands">West Midlands</option>
                <option value="west-yorkshire">West Yorkshire</option>
                <option value="wiltshire">Wiltshire</option>
              </select>
            </label>
            <button type="submit" class="btn btn-primary">Go</button>
          </form>
      </div>
      <div><p class="text-center">{data}</p></div>
      <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    </html>
  );
}

export default App;
