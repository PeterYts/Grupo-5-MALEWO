import React, { useEffect, useState } from "react";
import './styles-categories.css';

function Categories() {

    let [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3050/products/list')
            .then(response => response.json())
            .then(data => {
                setCategories(data);
            })
            .catch(err => console.log(err));
    }, []);
    return (
        <div className="categories">
        <section>
            <h2 className="title">Categorías</h2>
            <h4 className="totalTitle">Total: {categories.countCategories}</h4>
            <ul className="list">
                <li>EXTERIOR<i class="fas fa-chevron-down arrow"></i></li>
                <p className="">cant. productos:{categories.countByCategory.exterior}</p>
                <li>INTERIOR <i class="fas fa-chevron-down arrow"></i></li>
                <p className="">cant. productos: y</p>
                <li>ACCESORIOS <i class="fas fa-chevron-down arrow"></i></li>
                <p className="">cant. productos: z</p>
            </ul>
        </section>
        </div>
    );
}

export default Categories