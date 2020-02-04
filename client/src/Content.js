import React from "react";

export default ({ close }) => (
    <div className="modal">
        <a className="close" onClick={close}>
            &times;
        </a>
        <div className="header"> Modal Title </div>
        <div className="content">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
            Dolorem
            <br />
            Lorem ipsum
        </div>
    </div>
);