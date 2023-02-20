import React from "react";
import axios from "axios";
 
const DeleteUserModal=({ getUser,userData,handleClose})=>{
    const handleDeleteUser=()=>{
        axios.delete("http://localhost:5000/user/users/"+userData._id)
        .then(res=>{

            getUser();
            alert("User deleted successfully")
            handleClose();
        })
        .catch(err=>{
            console.log(err)
        })
    }
    console.log( userData)
    return(
        <div className="container">
             <div className="modal d-block" tabindex="-1">
            <div className="modal-dialog">
                <div className="modal-content bg-secondary ">
                    <div className="modal-header">
                        <h5 className="modal-title">Delete user</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body bg-warning">
                        <h3 className="text-danger">Are you sure want to delete?</h3>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" onClick={handleDeleteUser}>Yes</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal"onClick={handleClose}>No</button>
                    </div>
                </div>
             </div>
             </div>
        </div>
    )
}
export default DeleteUserModal;