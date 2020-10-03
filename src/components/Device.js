import React, { useState, useEffect } from "react";
import DeviceDataService from "../services/deviceService";

const Device = (props) => {
  const defaultDeviceState = {
    id: null,
    name: "",
    description: "",
    path: "",
    published: false,
  };

  const [currentDevice, setCurrentDevice] = useState(defaultDeviceState);
  const [message, setMessage] = useState("");

  const getDevice = (id) => {
    DeviceDataService.get(id)
      .then((response) => {
        setCurrentDevice(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getDevice(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentDevice({ ...currentDevice, [name]: value });
  };

  const updatePublished = (status) => {
    var data = {
      id: currentDevice.id,
      name: currentDevice.name,
      description: currentDevice.description,
      path: currentDevice.path,
      published: status,
    };

    DeviceDataService.update(currentDevice.id, data)
      .then((response) => {
        setCurrentDevice({ ...currentDevice, published: status });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateDevice = () => {
    DeviceDataService.update(currentDevice.id, currentDevice)
      .then((response) => {
        console.log(response.data);
        setMessage("The device was updated!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteDevice = () => {
    DeviceDataService.remove(currentDevice.id)
      .then((response) => {
        console.log(response.data);
        props.history.push("/devices");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentDevice ? (
        <div className="edit-form">
          <h4>Device</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentDevice.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentDevice.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="path">Path</label>
              <input
                type="text"
                className="form-control"
                id="path"
                name="path"
                value={currentDevice.path}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentDevice.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentDevice.published ? (
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

          <button className="badge badge-danger mr-2" onClick={deleteDevice}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateDevice}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a device...</p>
        </div>
      )}
    </div>
  );
};

export default Device;
