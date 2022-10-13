import React, { useEffect, useState } from "react";
import { getAlluser } from "../../api";
import IdCheckModal from "../../component/IdCheckModal/IdCheckModal"
import UserUpdateModal from "../../component/UserUpdateModal/UserUpdateModal";
import ConfirmDeleteUser from "../../component/ConfirmDeleteUser/ConfirmDeleteUser";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import "./style.css"

const Admin = () => {
    const initvalue =
        {
            "_id": "",
            "name": "",
            "full_name": "",
            "email": "",
            "phoneNumber": "",
            "password": "",
            "address": "",
            "city": "",
            "country": "",
            "region": "",
            "zip_code": "",
            "id_front_image": "",
            "id_back_image": "",
            "real_photo": "",
            "date": "",
            "image": ""
        };
    const [users, setUsers] = useState([]);
    const [showIdCheckModal, setShowIdCheckModal] = useState(false);
    const [showUserUpdateModal, setShowUserUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [permission, setPermission] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    const success = () => toast.success("Success Update Permission.");
    const updateSuccess = () => toast.success("Success Update User.");
    const deleteSuccess = () => toast.success("Success Delete User.");
    const error = () => toast.error("Network Error.");

    const getUsers = () => {
        console.log("here");
        const data = {
            page:parseInt(page),
            limit:limit,
            searchValue:searchValue,
            permission:permission
        };
        getAlluser(data)
        .then((res) => {
            if(!res.data){
                setUsers(initvalue);
            }
            else setUsers(res.data);
            console.log(res.data, "res");
        })
        .catch((res) => {
            console.log(res, 'res');
        })
    }

    const check = (index) => {
        setSelectedIndex(index);
        setShowIdCheckModal(true);
    }

    const update = (index) => {
        setSelectedIndex(index);
        setShowUserUpdateModal(true);
    }

    const deleteUser = (index) => {
        setSelectedIndex(index);
        setShowDeleteModal(true);
    }

    const pageChange = (e) => {
        setPage(e.target.value);
    }

    const limitChange = (e) => {
        setLimit(e.target.value);
    }

    const permissionChange = (e) => {
        setPermission(e.target.value);
    }

    const prevPage = () => {
        if(page === 1)
            setPage(1);
        else setPage(page - 1);
    }

    const nextPage = () => {
        setPage(page + 1);
    }

    useEffect(() => {
        if(localStorage.getItem("admin") === "this user is admin")
            getUsers();
        else navigate("/login");
    },[])

    useEffect(() => {
        getUsers();
    },[limit, page, searchValue, permission])

    console.log(selectedIndex, 'selectedIndex');
    return(
        <div className="admin">
            <ToastContainer limit={3} autoClose={3000} hideProgressBar={true} theme="colored" />
            <div className="admin_inner">
                <h1>Admin Panel</h1>
                
                <div className="tool_bar">
                    {/* <label>Id Check</label> */}
                    <div className="select_wrap">
                    <div className="admin_permission_select">
                        <select onChange={permissionChange} value={permission}>
                            <option value={0} selected>Waiting Users</option>
                            <option value={1} >Allowed Users</option>
                            <option value={2}>Disabled Users</option>
                            <option value={3}>All Users</option>
                        </select>
                    </div>
                    <div className="admin_limit_select">
                        <select onChange={limitChange} value={limit}>
                            <option value={5}>Show 5</option>
                            <option value={10} selected>Show 10</option>
                            <option value={20}>Show 20</option>
                            <option value={30}>Show 30</option>
                            <option value={40}>Show 40</option>
                            <option value={50}>Show 50</option>
                        </select>
                    </div>
                    </div>
                    <div className="search_input_wrap">
                        <img alt="" className="search-left" src="image/search-left.svg" />
                        <input placeholder="Search User Name" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                        <img alt="" className="search-right" src="image/search-right.svg" />
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th className="no">No </th>
                            <th className="name">User Name</th>
                            <th className="country">Country</th>
                            <th className="city"> City</th>
                            <th className="address">Address</th>
                            <th className="action">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !users?<div>loading...</div>:!users[0]?<div></div>:users.map((item, index) =>
                                <tr key={index} >
                                    <td className="no">{index + 1}</td>
                                    <td className="name"><img alt="" src={!item.image ? "/image/user.jpg" : `${process.env.REACT_APP_SERVER_IMAGE_URL}${item.image}`} /><div className="name_inner"><h5>{item.full_name}</h5><p>{item.name}</p></div></td>
                                    <td className="country">{item.country}</td>
                                    <td className="city">{item.city}</td>
                                    <td className="address">{item.address}</td>
                                    <td className="action" ><button onClick={() => check(index)} className="btn_check">Id check</button><button onClick={() => update(index)} className=" btn_update">Update</button><button onClick={() => deleteUser(index)} className="btn_delete" >Delete</button></td>
                                </tr>)
                        }
                    </tbody>
                </table>
                <div className="table_footer_wrap">
                    <div className="total_user_count_wrap">
                        <p>{(page - 1) * limit +1}-{(page - 1) * limit + users.length} of {!users?0:!users[0]?0:users[0].count} assets</p>
                    </div>
                    <div className="pagination_button_wrap">
                        <button onClick={prevPage}>{'<'}</button>
                        <p><label>Page</label> :<input type="text" value={page} onChange={pageChange}  /></p>
                        <button onClick={nextPage}>{`>`}</button>
                    </div>
                </div>
            </div>
            <IdCheckModal showModal={showIdCheckModal} setShowModal = {setShowIdCheckModal} user={!users[0]?initvalue:users[selectedIndex]} success={success} error={error} getUsers={getUsers} setSelectedIndex={setSelectedIndex} /> 
            <UserUpdateModal showModal={showUserUpdateModal} setShowModal={setShowUserUpdateModal} user={!users[0]?initvalue:users[selectedIndex]} success={updateSuccess} error={error} getUsers={getUsers} setSelectedIndex={setSelectedIndex} />
            <ConfirmDeleteUser showModal={showDeleteModal} setShowModal={setShowDeleteModal} user={!users[0]?initvalue:users[selectedIndex]} success={deleteSuccess} error={error} getUsers={getUsers} setSelectedIndex={setSelectedIndex} />
        </div>
    )
}

export default Admin;