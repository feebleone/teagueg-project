import React, { useEffect, useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.svg";
import "./App.css";

import AddDevice from "./components/AddDevice";
import Device from "./components/Device";
import DeviceList from "./components/DeviceList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/devices" className="navbar-brand">
          Cook Keeper
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/devices"} className="nav-link">
              Devices
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/devices"]} component={DeviceList} />
          <Route exact path="/add" component={AddDevice} />
          <Route path="/devices/:id" component={Device} />
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
