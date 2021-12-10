import React from "react";
import './styles-products.css';

function products() {
    return (
        <div className="products">
        <section>
            <h2 className="title">Productos</h2>
            <h4 className="totalTitle">Total: x</h4>
            <p className="productsDrop">Productos <i class="fas fa-chevron-down arrow"></i></p>
        </section>
        </div>
    );
}

export default products