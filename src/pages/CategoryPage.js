import React, {useState} from 'react'
import Header from "../components/Header";
import {Link} from 'react-router-dom';
import CategoryProductCard from "../components/Category_ProductCard";
import {useQuery } from "@apollo/client";
import {MASTER_DATA} from "../queries/graphqlQueries";

function CategoryPage() {

  const {data, error,loading} = useQuery(MASTER_DATA);

  const [category, setCategory] = useState('all');

  const productsList = data?.categories.find(cat => cat.name === category);

  if(error) return <h1>Error....</h1>
  if(loading) return <h1>Loading....</h1>

  return (
    <>
        <Header />
        <section className='container background-color-gray'>
          <div className='category_title_list d-flex'>
            {
              data?.categories.map(category => <p onClick={()=>setCategory(category.name)} key={category.name} id={category.name} className="category_title">{category.name}</p>)
            }
          </div>
          <div className='d-flex gap'>
            { productsList.products.map(product => {
               return (product.inStock ?
                        <Link to={`/product/${product.id}`} key={product.name}>
                            <CategoryProductCard id={product.id} brand={product.brand} name={product.name} 
                            inStock={product.inStock} image={product.gallery[0]} price={product.prices[0]} />
                        </Link> 
                      :
                        <CategoryProductCard key={product.name} id={product.id} brand={product.brand} name={product.name} 
                        inStock={product.inStock} image={product.gallery[0]} price={product.prices[0]} />
                      )
              })
            }
          </div>
        </section>
    </>
  )
}

export default CategoryPage

{/*

*/ }