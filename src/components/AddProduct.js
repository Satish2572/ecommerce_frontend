import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error,setError] = useState(false);
    const navigate = useNavigate();

    const addProduct = async () => {

        if(!name || !price || !category || !company){
            setError(true);
            return false;
        }
        // console.log(name, price, category, company);

        const userId = JSON.parse(localStorage.getItem('user'))._id;

        let result = await fetch('http://localhost:5000/add_product', {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        result = await result.json();

        if (result) {
            alert('Product Added Successfully!!');
            navigate('/');
        }
        console.warn(result);
    }

    return (
        <div className="product">
            <h2>Add Product</h2>
            <input onChange={(e) => setName(e.target.value)} value={name} className="inputBox" type="text" placeholder="Enter Product Name" />
            {error && !name && <span className="invalid-input">Enter Valid Name</span>}
            <input onChange={(e) => setPrice(e.target.value)} value={price} className="inputBox" type="text" placeholder="Enter Product Price" />
            {error && !price && <span className="invalid-input">Enter Valid Price</span>}
            <input onChange={(e) => { setCategory(e.target.value) }} value={category} className="inputBox" type="text" placeholder="Enter Product Category" />
            {error && !category && <span className="invalid-input">Enter Valid Category</span>}
            <input onChange={(e) => { setCompany(e.target.value) }} value={company} className="inputBox" type="text" placeholder="Enter Product Company" />
            {error && !company && <span className="invalid-input">Enter Valid Company</span>}
            <button onClick={addProduct} className="appButtom" type="button">Add Product</button>
        </div>
    );
}

export default AddProduct;