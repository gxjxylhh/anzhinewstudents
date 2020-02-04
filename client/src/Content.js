import React from "react";

export default ({ close }) => (
    <div className="modal">
        <a className="close" onClick={close}>
            &times;
        </a>
        <div className="header"> Hi </div>
        <div className="content">
            {" "}
            Have a nice day!
            <br />
            :)
        </div>
    </div>
);