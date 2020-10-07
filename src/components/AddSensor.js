import React, { useState } from "react";
import sensorDataService from "../services/sensorService";

const Addsensor = () => {
  const defaultsensorState = {
    id: "",
    name: "",
    deviceID: "",
    published: false,
  };

  const [sensor, setsensor] = useState(defaultsensorState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setsensor({ ...sensor, [name]: value });
  };

  const savesensor = () => {
    var data = {
      name: sensor.name,
      deviceID: sensor.deviceID,
    };

    sensorDataService.add(data).then((response) => {
      setsensor({
        id: response.data.id,
        name: response.data.name,
        deviceID: response.data.deviceID,
      });
      setSubmitted(true);
      console.log(response.data);
    });
  };

  const newsensor = () => {
    setsensor(defaultsensorState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newsensor}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={sensor.name || ""}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="deviceID">Belongs to Device</label>
            <input
              type="text"
              className="form-control"
              id="deviceID"
              required
              value={sensor.deviceID || ""}
              onChange={handleInputChange}
              name="deviceID"
            />
          </div>

          <button onClick={savesensor} className="btn btn-success">
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default Addsensor;
