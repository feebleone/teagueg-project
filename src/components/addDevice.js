import React, { useState } from "react";
import DeviceDataService from "../services/deviceService";

const AddDevice = () => {
  const defaultDeviceState = {
    id: "",
    name: "",
    path: "",
    description: "",
    published: false,
  };

  const [device, setDevice] = useState(defaultDeviceState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDevice({ ...device, [name]: value });
  };

  const saveDevice = () => {
    var data = {
      name: device.name,
      description: device.description,
      path: device.path,
    };

    DeviceDataService.add(data).then((response) => {
      setDevice({
        id: response.data.id,
        name: response.data.name,
        description: response.data.description,
        path: response.data.path,
      });
      setSubmitted(true);
      console.log(response.data);
    });
  };

  const newDevice = () => {
    setDevice(defaultDeviceState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newDevice}>
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
              value={device.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={device.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="path">Path</label>
            <input
              type="text"
              className="form-control"
              id="path"
              required
              value={device.path}
              onChange={handleInputChange}
              name="path"
            />
          </div>

          <button onClick={saveDevice} className="btn btn-success">
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default AddDevice;
