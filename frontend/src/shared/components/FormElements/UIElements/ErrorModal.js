import React from "react";

function ErrorModal(props) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Error</h2>
        <p>{props.errorMessage}</p>
        <button onClick={props.onClose}>Close</button>
      </div>
    </div>
  );
}

export default ErrorModal;
