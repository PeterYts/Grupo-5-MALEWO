import React from "react";
import './styles-users.css';

function users() {
    return (
        <div className="users">
        <section>
            <h2 className="title">Usuarios</h2>
            <h4 className="totalTitle">Total: x</h4>
            <p className="usersDrop">Ultimo usuario <i class="fas fa-chevron-down arrow"></i></p>
        </section>
        </div>
    );
}

export default users