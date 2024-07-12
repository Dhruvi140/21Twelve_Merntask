import React from 'react'
import "./newnavbar.css"

function Newnav() {
  return (
    <div className='new_nav'>
      <div className='nav_data'>
        <div className='left_data'>
              <p>All</p>
              <p>Mobile</p>
              <p>Fashion</p>
              <p>Castomer Service</p> 
              <p>Prime</p>
              <p>Today's deal</p>  
        </div>
        <div className='right_data'>
                 <img src='nav.jpg'></img>
                 </div>
      </div>

    </div>
  )
}

export default Newnav