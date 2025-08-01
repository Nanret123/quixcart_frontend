import React from 'react'

const RatingStars: React.FC<{rating: number}> = ({rating}) => {
    const stars = []
    for(let i = 1; i <= 5; i++ ){
      stars.push(
      <span key={i} className={`ri-star${i <= rating ? '-fill' : '-line'}`}></span>
    )
    }
    return (
      <div className='product__rating'>
        {stars}
      </div>
    )
}

export default RatingStars