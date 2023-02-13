import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Home() {
    const API_URL = process.env.REACT_APP_API_URL;
    const [products, setProducts] = useState([]); 
    const cartArray = [];
    const [order, setOrder] = useState();

    useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {
        try {
            const api_response = await axios.get(`${API_URL}/products`)
            if (api_response.data){
                setProducts(api_response.data)
            }
        } catch (e) {
            console.log(e)
        }
    }

    async function getOrderedProducts(param) {
        console.log('get ordere')
        try {
            const api_response = await axios.get(`${API_URL}/products/order/${param}`)
            if (api_response.data){
                setProducts(api_response.data)
                console.log(products)
            }
        } catch (e) {
            console.log(e)
        }
    }

    async function addToCart(product_id, product_name, product_price, qty) {
        const payload = {
            'product_id': product_id,
            'product_name': product_name,
            'product_price': product_price,
            'quantity': qty,
            'status': 0,
        }

        const response = await axios.post(`${API_URL}/cart`, payload)
        if (response.status === 201){       
            cartArray.push(response.data.id)
            localStorage.setItem('list_ids_cart', JSON.stringify(cartArray))   

        }
    }

    const handleChange = (event) => {
        const param = event.target.value
        setOrder(param)
        getOrderedProducts(param)
    }

    return(
        <>
            <Navbar />
            <div className='container top-80'>
                <div className='row'>
                    <div className='col-lg-6'>
                        <h1>Produtos em promoção</h1>
                    </div>
                    <div className='col-lg-6'>

                        <p className='float-end'>
                            <select name='order' className='form-control' value={order} onChange={handleChange}>
                                <option value="">Selecione</option>
                                <option value="name">Nome</option>
                                <option value="score">Popularidade</option>
                                <option value="price">Preço</option>

                            </select>
                        </p>
                    </div>
                </div>

                <div className='row top-50'>
                    {
                        products.map((product) => (
                        <div className='col-lg-3' key={product.id}>
                            <div className='bg-white-rounded'>
                            <Link to={`/product/${product.id}`} className="product-link">{product.name}</Link>
                            <img src="workspace/supera/backend/assets/call-of-duty-wwii.png" />
                                <p>R$ {product.price}</p>
                                <p>Score: {product.score}</p>
                                <button onClick={() => addToCart(product.id, product.name, product.price, 1)} className='btn cart-add'>Adicionar</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;