import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import store from '../../store'
import { toggleModal } from '../../actions/ui'
import BtnMain from '../buttons/btn_main.js'

class MainModal extends Component {
    closeModal = () => {
        store.dispatch(toggleModal(false, this.props.keyModal))
    }
    
    render() {
        const { className, show, size, title, body } = this.props
        return (
            <Modal
                className={className}
                show={show} 
                onHide={this.closeModal}
                bsSize={size} >
                <Modal.Header bsClass={' modal-header'} closeButton>
                    <h3 className="modal-title title">
                        <i className="fas fa-address-card"></i>
                        &nbsp;{title}
                    </h3>
                </Modal.Header>
                <Modal.Body>{body}</Modal.Body>
            </Modal>
        );
    }
}

export default MainModal