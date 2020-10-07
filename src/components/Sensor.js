import React, { useState, useEffect } from "react";
import SensorDataService from "../services/sensorService";

const Sensor = (props) => {
  const defaultSensorState = {
    id: null,
    name: "",
    deviceID: "",
    published: false,
  };

  const [currentSensor, setCurrentSensor] = useState(defaultSensorState);
  const [message, setMessage] = useState("");

  const getSensor = (id) => {
    SensorDataService.get(id)
      .then((response) => {
        setCurrentSensor(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getSensor(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentSensor({ ...currentSensor, [name]: value });
  };

  const updatePublished = (status) => {
    var data = {
      id: currentSensor.id,
      name: currentSensor.name,
      deviceID: currentSensor.deviceID,
      published: status,
    };

    SensorDataService.update(currentSensor.id, data)
      .then((response) => {
        setCurrentSensor({ ...currentSensor, published: status });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateSensor = () => {
    SensorDataService.update(currentSensor.id, currentSensor)
      .then((response) => {
        console.log(response.data);
        setMessage("The sensor was updated!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteSensor = () => {
    SensorDataService.remove(currentSensor.id)
      .then((response) => {
        console.log(response.data);
        props.history.push("/sensors");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentSensor ? (
        <div className="edit-form">
          <h4>Sensor</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentSensor.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="deviceID">Belongs to Device</label>
              <input
                type="text"
                className="form-control"
                id="deviceID"
                name="deviceID"
                value={currentSensor.deviceID}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentSensor.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentSensor.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteSensor}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateSensor}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a sensor...</p>
        </div>
      )}
    </div>
  );
};

export default Sensor;
