import React from "react";
import { Modal } from "react-bootstrap";
import "./style.css"

const BuySellModal = ({showModal, onCloseModal}) => {
    return(
        <>
            <Modal 
                show={showModal}
                onHide={onCloseModal}
                className='buy_sell_modal'
            >
                <Modal.Header>
                    <Modal.Title>Buy and Sell Crypto</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal_body">
                    <iframe src="https://guardarian.com/calculator/v1?partner_api_token=1a5301d3-f098-4d5c-b60e-e17c2679e524&theme=light&type=narrow"></iframe>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default BuySellModal;
