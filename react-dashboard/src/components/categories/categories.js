import React from "react";
import './styles-categories.css';

function categories() {
    return (
        <div className="categories">
        <section>
            <h2 className="title">Categorías</h2>
            <h4 className="totalTitle">Total: x</h4>
            <ul className="list">
                <li>categoría1 <i class="fas fa-chevron-down arrow"></i></li>
                <p className="">cant. productos: x</p>
                <li>categoría2 <i class="fas fa-chevron-down arrow"></i></li>
                <p className="">cant. productos: y</p>
                <li>categoría3 <i class="fas fa-chevron-down arrow"></i></li>
                <p className="">cant. productos: z</p>
            </ul>
        </section>
        </div>
    );
}

export default categories