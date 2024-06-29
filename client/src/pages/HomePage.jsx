//import React from 'react'
import ChipGroup from '../components/homepage/ChipGroup'
import Heading from '../components/homepage/Heading'
import NavBarTop from '../components/NavBarTop'
import data from '../utils/sample_data';
import {Chip} from '../components/homepage/Chip'
export default function HomePage() {
  
  return (
    <>
      <NavBarTop></NavBarTop>
      <div className='mt-20'>
        <Heading count={9}></Heading>
        <ChipGroup topics={data}></ChipGroup>
        <Chip content={"hello"}></Chip>
      </div>

    </>
  )
}
