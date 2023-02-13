import React, { useEffect, useState } from 'react';
import axios from 'axios';


function CartItem({data}) {
    const API_URL = process.env.REACT_APP_API_URL;

    const [items, setItems] = useState([]);    
    const [cartSub, setCartSub] = useState();
    const [cartTotal, setCartTotal] = useState();
    const [countItems, setCountItems] = useState(0);

    useEffect(() => {
        getLocalStorageData();
    }, []);

    async function getLocalStorageData(){
        const itemsFromLocal = JSON.parse(localStorage.getItem('list_ids_cart'))
        getItems(itemsFromLocal)
    } 

    async function getItems(itemsFromLocal) {
        try {
            const api_response = await axios.get(`${API_URL}/cart/items/${itemsFromLocal}`)
            if (api_response.data){
                setItems(api_response.data)
                calcSubTotal(api_response.data)
            }
        } catch (e) {
            console.log(e)
        }
    }

    function updateQuantity(operation, cart_id, quantity) {
        console.log(operation, cart_id, quantity)
   
        if (operation === 'add'){
            const updated_qty = parseInt(quantity) + 1
            postNewQuantity(cart_id, updated_qty)
        } else {
            const updated_qty = parseInt(quantity) - 1   
            postNewQuantity(cart_id, updated_qty)
        }
    }

    async function postNewQuantity(cart_id, updated_qty){
        const payload = { 'quantity': updated_qty }
    
        try{
            await axios.post(`${API_URL}/cart/update/${cart_id}`, payload)
            getLocalStorageData()
        } catch (e) {
            console.log(e)
        }
    }

    function calcSubTotal(items) {
        const cartSub = (items.reduce((a,v) =>  a = a + v.subtotal , 0))
        setCartSub(cartSub)
        calcTotal(items)
    }

    function calcTotal(items) {
        const cartTotal = (items.reduce((a,v) =>  a = a + v.total , 0))
        setCartTotal(cartTotal)
        itemsOnCart(items)
    }

    function itemsOnCart(items) {
        const numItems = (items.reduce((a,v) =>  a = a + v.quantity , 0))
        setCountItems(numItems)
    }

    

    return (
        <>
            <div className='container top-80'>
                {
                    items.map((item) => (
                        <div className="row white-rounded" key={item.key}>
                            <div className='col-lg-2'>
                            </div>
                            
                            <div className='col-lg-10'>
                                <div className='row'>
                                    <div className='col-lg-5'>
                                        <h1 className='cart-product'>{item.product_name}</h1>
                                        <p>R$: {item.product_price.toFixed(2)}</p>
                                        <p>Frete: R$ {item.total - item.subtotal }</p>
                                    </div>

                                    <div className='col-lg-3'>
                                        <div className='input-number'>
                                            <button className='decrease' onClick={() => { updateQuantity('remove', `${item.id}`, `${item.quantity}`) }}>
                                                -
                                            </button>
                                            
                                            <div className='quantity'>
                                                {item.quantity}
                                            </div>
                                            
                                            <button className='increase' onClick={() => { updateQuantity('add', `${item.id}`, `${item.quantity}`) }}>
                                                +
                                            </button>
                                       </div>
                                    </div>
                                        <div className='col-lg-4 top-15'>
                                            <p className='subtotal text-end block'>Produtos R$: &nbsp; { item.subtotal} </p>
                                            <p className='total text-end block'>Frete R$: &nbsp; { item.total }</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                ))}
            </div>

            <div className='container top-30'>
                <div className='row white-rounded'>
                    <div className='col-lg-2'>
                    </div>

                    <div className='col-lg-6'>
                        {cartTotal > 250 ? (
                            <p className='subtotal text-end green'>Seu Frete é <strong>Grátis</strong></p>
                        ) : (
                            <p  className='subtotal text-end'>Nas compras acima de R$ 250, 00 o frete é grátis</p>
                        )}  
                    </div>

                    <div className='col-lg-4'>
                        {cartTotal > 250 ? (
                            <p  className='subtotal text-end'>Total R${cartSub}</p>
                        ) : (
                            <>  
                                <p className='subtotal text-end'>SubTotal R$: {cartSub}</p>
                                <p className='total text-end'>Total R$: {cartTotal}</p>
                            </>
                        )}
                    </div>

                    <div className='col-lg-12 text-end'>
                        <button type='submit' className='text-end'>Concluir Compra</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CartItem;