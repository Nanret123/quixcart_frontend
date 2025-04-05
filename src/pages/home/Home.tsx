import React from 'react'
import Banner from './Banner'
import Categories from './Categories'
import Hero from './Hero'
import TrendingProducts from '../shop/TrendingProducts'
import Deals from './Deals'
import Services from './Services'
import Blog from '../blog/Blog'

const Home = () => {
  return (
    <>
    <Banner />
    <Categories />
    <Hero />
    <TrendingProducts />
    <Deals />
    <Services />
    <Blog />
    </>
  )
}

export default Home 