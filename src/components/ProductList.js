import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/get_products',{
            headers:{
                authorization: `Bearer ${ JSON.parse(localStorage.getItem('token')) }`
            }
        });
        result = await result.json();
        setProducts(result);
    }

    const deleteProduct = async (id) => {
        // alert(id);
        let result = await fetch(`http://localhost:5000/delete_product/${id}`, {
            method: "Delete",
            headers:{
                authorization: `Bearer ${ JSON.parse(localStorage.getItem('token')) }`
            }
        });

        result = await result.json();
        if (result) {
            alert('Product Deleted Successfully!!');
            getProducts();
        }
    }

    const searchHandle = async (event) => {
        // console.warn(event.target.value);
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers:{
                    authorization: `Bearer ${ JSON.parse(localStorage.getItem('token')) }`
                }
            });
            result = await result.json();
            if (result) {
                setProducts(result);
            }
        } else {
            getProducts();
        }
    }
    return (
        <div className='product-list'>
            <h2>Product List</h2>
            <input type="text" className="search-product" onChange={searchHandle} placeholder="Search Product..........." />
            <ul>
                <li>S.No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Action</li>
            </ul>
            {
                products.length>0 ? products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li>
                            <Link to={"/update/" + item._id}><button>Edit</button></Link>
                            <button onClick={() => deleteProduct(item._id)}>Delete</button>
                        </li>
                    </ul>
                )
                :
                <h1>No data found !!</h1>
            }
        </div>
    );
}

export default ProductList;