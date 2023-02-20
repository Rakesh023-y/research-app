import React, { useEffect, useState } from "react";
import axios from "axios";
import EditUserModel from "./EditUserModel";
import DeleteUserModal from "./DeleteUserModal";

const User_management = () => {
    const [user_list, setUserList] = useState([]);
    const [edit, setEdit] = useState(false);
    const [deleteUser, setDeleteUser] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});

    const handleEdit = (data) => {
        setEdit(true);
        setSelectedUser(data);
    }
    const handleClose = () => {
        setEdit(false);
        setDeleteUser(false)
    }
    const handleDelete = (data) => {
        setDeleteUser(true);
        setSelectedUser(data);
    }

    const getUser = () => {
        axios.get("http://localhost:5000/user/users")
            .then(res => {
                console.log(res.data)
                setUserList(res.data)
                handleClose();
            })
    };
    useEffect(() => {
        getUser();
    }, []);

    return (
        <div className="container ">
            <table className="table border">
                <thead className="bg-danger">
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className="table_body">
                    {
                        user_list.map((data, index) => {
                            return (
                                <tr>
                                    <td>{data._id}</td>
                                    <td>{data.name}</td>
                                    <td>{data.email}</td>
                                    <td>
                                        <span className="edit_modal cursor_pointer" onClick={() => handleEdit(data)}> Edit  </span>
                                        <span className="delete_modal cursor_pointer" onClick={() => handleDelete(data)}> Delete</span>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {edit && <EditUserModel
                data={selectedUser}
                getUser={getUser}
                selectedUser={selectedUser}
                handleClose={handleClose}
            />}
            {deleteUser && <DeleteUserModal
                userData={selectedUser}
                getUser={getUser}
                handleClose={handleClose} />}
        </div>
    )
}
export default User_management;