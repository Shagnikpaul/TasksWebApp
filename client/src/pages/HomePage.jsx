//import React from 'react'
import ChipGroup from '../components/homepage/ChipGroup'
import Heading from '../components/homepage/Heading'
import NavBarTop from '../components/NavBarTop'
import data from '../utils/sample_data';
<<<<<<< HEAD

=======
// import {Chip} from '../components/homepage/Chip'
>>>>>>> 8683f323146435ccb5ce5fe03462f810d3499b42
export default function HomePage() {
  
  return (
    <>
      <NavBarTop></NavBarTop>
      <div className='mt-20'>
        <Heading count={9}></Heading>
        <ChipGroup topics={data}></ChipGroup>
<<<<<<< HEAD
     
=======
>>>>>>> 8683f323146435ccb5ce5fe03462f810d3499b42
      </div>

    </>
  )
}
