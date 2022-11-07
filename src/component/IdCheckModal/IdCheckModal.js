import React, {useState, useCallback, useEffect} from "react";
import { Modal } from "react-bootstrap";
import { setPermission } from "../../api";
import ImageZoom from "react-medium-image-zoom";

import 'react-medium-image-zoom/dist/styles.css'
import "./style.css"

const IdCheckModal = ({showModal, setShowModal, user, success, error, getUsers, setSelectedIndex}) => {

    const onCloseModal = () => {
        setShowModal(false);
    }


    const allow = () => {
        const data = {
            userName:user.name,
            permission:"1"
        }
        setPermission(data)
        .then((res) => {
            success();
            setSelectedIndex(0);
            getUsers();
            setShowModal(false);
            console.log(res, "res");
        })
        .catch((res) => {
            error();
            setSelectedIndex(0);
            getUsers();
            setShowModal(false);
            console.log(res, "res");
        });
    }

    const disable = () => {
        const data = {
            userName:user.name,
            permission:"2"
        }
        setPermission(data)
        .then((res) => {
            success();
            setSelectedIndex(0);
            getUsers();
            setShowModal(false);
            console.log(res, "res");
        })
        .catch((res) => {
            error();
            setSelectedIndex(0);
            getUsers();
            setShowModal(false);
            console.log(res, "res");
        });
    }

    const onZoom = () => {
        const background = document.getElementsByClassName("modal-backdrop");
        for(let i = 0; i < background.length; i++){
            background[i].style.zIndex = "90";
        }
        const modal = document.getElementsByClassName("id_check_modal");
        for(let i = 0; i < modal.length; i++){
            modal[i].style.zIndex = "100";
        }
    }

    const onUnzoom = () => {
        const background = document.getElementsByClassName("modal-backdrop");
        for(let i = 0; i < background.length; i++){
            background[i].style.zIndex = "1050";
        }
        const modal = document.getElementsByClassName("id_check_modal");
        for(let i = 0; i < modal.length; i++){
            modal[i].style.zIndex = "1055";
        }
    }
    return(
            <Modal 
                show={showModal}
                onHide={onCloseModal}
                className='id_check_modal'
            >
                <Modal.Header>
                <Modal.Title id='ModalHeader'>Check User's Id</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal_body">
                    <h3>Real Photo</h3>
                    
                    <div className="real_photo_wrap">
                        <div className="real_photo_wrap_inner">
                            <ImageZoom 
                                image={{
                                    src:`${process.env.REACT_APP_SERVER_IMAGE_URL}${user.real_photo}`,
                                    class:"img"
                                }}
                                zoomImage={{
                                    src:`${process.env.REACT_APP_SERVER_IMAGE_URL}${user.real_photo}`,
                                    class:"img--zoomed"
                                }}
                                onZoom={onZoom}
                                onUnzoom={onUnzoom}
                            />
                        </div>
                    </div>
                    <h3>Id Card</h3>
                    <div className="image_wrap">
                        <div className="image_wrap_inner">
                            <label>Front</label>
                            <ImageZoom 
                                image={{
                                    src:`${process.env.REACT_APP_SERVER_IMAGE_URL}${user.id_front_image}`,
                                    class:"img"
                                }}
                                zoomImage={{
                                    src:`${process.env.REACT_APP_SERVER_IMAGE_URL}${user.id_front_image}`,
                                    class:"img--zoomed"
                                }}
                                onZoom={onZoom}
                                onUnzoom={onUnzoom}
                            />
                        </div>
                        <div className="image_wrap_inner">
                            <label>Back</label>
                            <ImageZoom 
                                image={{
                                    src:`${process.env.REACT_APP_SERVER_IMAGE_URL}${user.id_back_image}`,
                                    class:"img"
                                }}
                                zoomImage={{
                                    src:`${process.env.REACT_APP_SERVER_IMAGE_URL}${user.id_back_image}`,
                                    class:"img--zoomed"
                                }}
                                onZoom={onZoom}
                                onUnzoom={onUnzoom}
                            />
                        </div>
                    </div>
                    <h3>User's Info</h3>
                    <div className="person_info">
                        <div className="person_info_inner">
                            <div className="single_info_wrap">
                                <label>Full Name :</label>
                                <p>{user.full_name}</p>
                            </div>
                            <div className="single_info_wrap">
                                <label>Nationality :</label>
                                <p>{user.nationality}</p>
                            </div>
                        </div>
                        <div className="person_info_inner">
                            <div className="single_info_wrap">
                                <label>Birthday :</label>
                                <p>{user.birthday}</p>
                            </div>
                            <div className="single_info_wrap">
                                <label>ZipCode :</label>
                                <p>{user.zip_code}</p>
                            </div>
                        </div>
                        <div className="person_info_inner">
                            <div className="single_info_wrap">
                                <label>Country :</label>
                                <p>{user.country}</p>
                            </div>
                            <div className="single_info_wrap">
                                <label>State :</label>
                                <p>{user.region}</p>
                            </div>
                        </div>
                        <div className="person_info_inner">
                            <div className="single_info_wrap">
                                <label>City :</label>
                                <p>{user.city}</p>
                            </div>
                            <div className="single_info_wrap">
                                <label>Address :</label>
                                <p>{user.address}</p>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal_footer">
                    <button onClick={allow} className="allow_button">Allow</button>
                    <button onClick={disable} className="disable_button">Disable</button>
                </Modal.Footer>
            </Modal>
    )
}

export default IdCheckModal;