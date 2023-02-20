import React, { useEffect, useState } from "react";
import axios from "axios";

const EditUserModel = ({ data, selectedUser, handleClose, getUser }) => {

  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const handleName = (e) => {
    setName(e.target.value);
  }
  const handleEmail = (e) => {
    setEmail(e.target.value);
  }
  useEffect(() => {
    setName(selectedUser.name)
    setEmail(selectedUser.email)
  }, [selectedUser]);

  const handleSubmit = () => {
    let data = {
      "name": name,
      "email": email,
      "user_id": selectedUser._id

    }
    axios({
      method: "POST",
      url: "http://localhost:5000/user/update_user",
      data: data
    })
      .then(res => {
        //  console.log(res.data)
        getUser();
        handleClose();
      })
      .catch(err => {
        console.log(err)
      })
  }
  console.log(name, email)
  console.log(selectedUser)

  return (
    <div>
      <div className="modal d-block" tabindex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit User</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
            </div>
            <div className="modal-body">
              <input className="form-control " placeholder="Enter your name" value={name} onChange={(e) => handleName(e)} />
              <input className="form-control mt-2" placeholder="Enter your email" value={email} onChange={(e) => handleEmail(e)} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={() => handleSubmit(data)}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default EditUserModel;