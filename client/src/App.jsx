import { useState } from "react";
import Smartcar from "@smartcar/auth";
import axios from "axios";
import Connect from "./components/Connect";

import "./App.css";

function App() {
  const [vehicle, setVehicle] = useState();

  // Vite environment variables
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_REDIRECT_URI;
  const serverUrl = import.meta.env.VITE_SERVER;

  const onComplete = async (err, code, state) => {
    return await axios
      .get(`${serverUrl}/exchange?code=${code}`)
      .then((_) => {
        return axios.get(`${serverUrl}/vehicle`);
      })
      .then((res) => {
        setVehicle(res.data);
      });
  };

  const smartCar = new Smartcar({
    clientId: clientId,
    redirectUri: redirectUri,
    scope: ["read_vehicle_info"],
    mode: "simulated",
    onComplete,
  });

  const authorize = () => {
    smartCar.openDialog({ forcePrompt: true });
  };

  return (
    <>
      <div>
        <Connect onClick={authorize} />
      </div>
    </>
  );
}

export default App;
