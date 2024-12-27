//import React from 'react'

import ChipGroup from '../components/homepage/ChipGroup'
import Heading from '../components/homepage/Heading'
import NavBarTop from '../components/NavBarTop'
import data from '../utils/sample_data';

import {useSelector} from "react-redux";


// import {Chip} from '../components/homepage/Chip'


export default function HomePage() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <>
      <NavBarTop></NavBarTop>
      <div className='mt-20'>
        <Heading count={9}></Heading>
        <ChipGroup topics={data}></ChipGroup>
      </div>
    </>
  )
}
