import React, { useState, useEffect } from 'react'
import { FaHandPointUp } from "react-icons/fa";
import { FaHandPointDown } from "react-icons/fa";

function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        (async function (){
            const resp = await fetch(`https://fakestoreapi.com/products`)
            const productData = await resp.json();
            // productData.forEach((elem)=>
            //  console.log(elem.title));
            setProducts(productData); 
        })()
    },[]);

    let filterArr = products;
    if(searchTerm != ""){
        filterArr = filterArr.filter((products)=> {
            let lowerSearchTerm = searchTerm.toLocaleLowerCase();
            let lowerTitle = products.title.toLowerCase();
            return lowerTitle.includes(lowerSearchTerm);
        })
    }

    return(
        <>
        <header className='nav_wrapper'>
            <div className='search_sortWrapper'>
            <input 
            className='search_input'
            type='text'
            value={searchTerm}
            onChange={(e)=>{ setSearchTerm(e.target.value)}} />
            <div className='icons_container'>
                 <FaHandPointUp style={{color: "#38cc0f",}}  fontSize="large"/>
                 <FaHandPointDown style={{color: "#ea430b",}}  fontSize="large"/>
            </div>
            </div>
        </header>
        <main className='product_wrapper'>
            {filterArr == null ?  <h2>Loading....</h2>:
            filterArr.map((product)=>{
                return(<div className='product'>
                    <img src={product.image} alt='product_img'
                    className='product_image' />
                    <div className='product_meta'>
                        <p className='product_meta'>{product.title}</p>
                        <p className='price'>{product.price}</p>
                    </div>
                </div>)
            })}
        </main>
        </>
    )
}
export default Home