import React from "react";
import { Modal } from "react-bootstrap";
import {deleteUser} from "../../api/index"
import "./style.css"

const ConfirmDeleteUser = ({showModal, setShowModal, user, success, error, getUsers,setSelectedIndex}) => {

    const onCloseModal = () => {
        setShowModal(false);
    }

    const deleteSelectedUser = () => {
        const data = {
            userName:user.name
        }
        deleteUser(data)
        .then((res) => {
            success();
            setSelectedIndex(0);
            getUsers();
            setShowModal(false);
            console.log(res, 'res');
        })
        .catch((res) => {
            setShowModal(false);
            setSelectedIndex(0);
            getUsers();
            error();
            console.log(res, "res");
        })
    }
    return(
        <>
            <Modal 
                show={showModal}
                onHide={onCloseModal}
                className='confirm_delete_user'
            >
                <Modal.Header>
                <Modal.Title id='ModalHeader'>Confirm Deleting User</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal_body">
                    <h5>{user.name} will be deleted permanently.</h5>
                </Modal.Body>
                <Modal.Footer className="modal_footer">
                    <button onClick={deleteSelectedUser} className="confirm_button">Confrim</button>
                    <button className="cancel_button">Cancel</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ConfirmDeleteUser;