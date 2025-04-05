import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import products from "../../data/products.json"
import { IProduct } from '../../interfaces'
import ProductsCard from '../shop/ProductsCard'

const Category = () => {
  const { categoryName } = useParams()
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]) 

  useEffect(() => {
    const filtered = products.filter((product) => product.category === categoryName?.toLowerCase())
    
    setFilteredProducts(filtered)
  }, [categoryName]) 

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []); // Runs only once on mount

  return (
    <>
    <section className='section__container bg-primary-light'>
      <h2 className='section__header capitalize'>{categoryName}</h2>
      <p className='section__subheader'>
        Browse a diverse range of categories, from chic dresses to versatile accessories. Elevate your style today!
      </p>
      </section>

      {/* product card */}
      <div className='section__container'>
      <ProductsCard products={filteredProducts} />
      </div>
      </>
  )
}

export default Category