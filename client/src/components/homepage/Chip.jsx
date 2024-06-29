import React from 'react'
import PropTypes from 'prop-types';


function Chip({content, emoji, color}) {

    return (
    <div className={`flex p-2 ${color}`}>
        <div className='mr-2'>{emoji}</div>
        <div>{content}</div>
    </div>
  )
}

export default Chip



Chip.propTypes = {
    content: PropTypes.string.isRequired,
    emoji: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
}