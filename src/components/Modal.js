import React from 'react';
import './Modal.css'
import {AiFillCloseCircle} from 'react-icons/ai'
const Modal = props => {
    if(!props.show)
        return null

    return(
        <div className="modal" onClick={props.onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">
                        Raw JSON from API
                    </h4>
                    <AiFillCloseCircle onClick={props.onClose} className="closeIcon" />
                </div>
                <div className="modal-body">
                    <pre>{JSON.stringify(props.data, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                    <p>Data Fetched from : https://randomuser.me/api/</p>
                </div>
            </div>
        </div>
    )
}

export default Modal