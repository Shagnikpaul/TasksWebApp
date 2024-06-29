import { PropTypes } from 'prop-types';

function Heading({count}) {
  
    return (
    <h1 className='text-center text-2xl lg:text-5xl font-medium text-olive-text'>You have <span className='underline-offset-auto decoration-solid underline'>{count}</span>  {count === 1 ? "task":"tasks"} remaining for today.</h1>
  )
}

Heading.propTypes = {
    count: PropTypes.number.isRequired
  }

export default Heading