import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, []);

    const getProductDetails = async () => {
        let result = await fetch(`http://localhost:5000/product_detail/${params.id}`,{
            headers:{
                authorization: `Bearer ${ JSON.parse(localStorage.getItem('token')) }`
            }
        })
        result = await result.json();

        setName(result.data.name);
        setPrice(result.data.price);
        setCategory(result.data.category);
        setCompany(result.data.company);
    }

    const updateProduct = async () => {
        console.log(name, price, category, company);
        let result = await fetch(`http://localhost:5000/update_produt/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${ JSON.parse(localStorage.getItem('token')) }`
            }
        });

        result = await result.json();
        navigate('/');
    }

    return (
        <div className="product">
            <h2>Update Product</h2>
            <input className="inputBox" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter Product Name" />
            <input className="inputBox" value={price} onChange={(e) => setPrice(e.target.value)} type="text" placeholder="Enter Product Price" />
            <input className="inputBox" value={category} onChange={(e) => setCategory(e.target.value)} type="text" placeholder="Enter Product Category" />
            <input className="inputBox" value={company} onChange={(e) => setCompany(e.target.value)} type="text" placeholder="Enter Product Company" />
            <button className="appButtom" onClick={updateProduct} type="button">Update Product</button>
        </div>
    );
}

export default UpdateProduct;