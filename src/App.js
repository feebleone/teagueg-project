import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.scss";

import AddDevice from "./components/AddDevice";
import Device from "./components/Device";
import DeviceList from "./components/DevicesList";

import AddSensor from "./components/AddSensor";
import Sensor from "./components/Sensor";
import SensorList from "./components/SensorsList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/devices" className="navbar-brand">
          Coop Keeper
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/devices"} className="nav-link">
              Devices
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/adddevice"} className="nav-link">
              Add Device
            </Link>
          </li>

          <li className="nav-item">&emsp;</li>

          <li className="nav-item">
            <Link to={"/sensors"} className="nav-link">
              Sensors
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/addsensor"} className="nav-link">
              Add Sensor
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/devices"]} component={DeviceList} />
          <Route exact path="/adddevice" component={AddDevice} />
          <Route path="/devices/:id" component={Device} />
          <Route exact path={["/", "/sensors"]} component={SensorList} />
          <Route exact path="/addsensor" component={AddSensor} />
          <Route path="/sensors/:id" component={Sensor} />
        </Switch>
      </div>
    </div>
  );
}

// function App() {
//   const [data, setData] = useState({});

//   const getData = async () => {
//     const res = await fetch("/device");
//     const data = await res.json();
//     setData(data);
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   return <div>{data}</div>;
//   // return (
//   //   <div className="App">
//   //     <header className="App-header">
//   //       <img src={logo} className="App-logo" alt="logo" />
//   //       <p>
//   //         Edit <code>src/App.js</code> and save to reload.
//   //       </p>
//   //       <a
//   //         className="App-link"
//   //         href="https://reactjs.org"
//   //         target="_blank"
//   //         rel="noopener noreferrer"
//   //       >
//   //         Learn React
//   //       </a>
//   //     </header>
//   //   </div>
//   // );
// }

// class Device extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: null,
//     };
//   }

//   render() {
//     return (

//     )
//   }

// }

export default App;
