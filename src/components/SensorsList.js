import React, { useState, useEffect } from "react";
import SensorDataService from "../services/sensorService";
import { Link } from "react-router-dom";

const SensorsList = () => {
  const [sensors, setSensors] = useState([]);
  const [currentSensor, setCurrentSensor] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(-1);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    retrieveSensors();
  }, []);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveSensors = () => {
    SensorDataService.getAll()
      .then((response) => {
        setSensors(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveSensors();
    setCurrentSensor(null);
    setCurrentIdx(-1);
  };

  const setActiveSensor = (sensor, idx) => {
    setCurrentSensor(sensor);
    setCurrentIdx(idx);
  };

  const removeAllSensors = () => {
    SensorDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    SensorDataService.findByName(searchName)
      .then((response) => {
        setSensors(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Name..."
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Sensor List</h4>

        <ul className="list-group">
          {sensors &&
            sensors.map((sensor, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIdx ? "active" : "")
                }
                onClick={() => setActiveSensor(sensor, index)}
                key={index}
              >
                {sensor.name}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllSensors}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentSensor ? (
          <div>
            <h4>Sensor</h4>
            <div>
              <label>
                <strong>ID:</strong>
              </label>{" "}
              {currentSensor.id}
            </div>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentSensor.name}
            </div>
            <div>
              <label>
                <strong>Parent Device:</strong>
              </label>{" "}
              {currentSensor.deviceID}
            </div>

            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentSensor.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/sensors/" + currentSensor.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Sensor...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SensorsList;
