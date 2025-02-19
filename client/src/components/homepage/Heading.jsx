import { PropTypes } from 'prop-types';

function Heading({ count }) {

  return (
    <h1 className='p-5 md:p-0 lg:p-0 text-center text-3xl md:text-4xl lg:text-5xl font-medium light:text-olive dark:text-olive-light'>You have <span className='underline-offset-auto decoration-solid underline'>{count}</span>  {count === 1 ? "task" : "tasks"} remaining for today.</h1>
  )
}

Heading.propTypes = {
  count: PropTypes.number.isRequired
}

export default Heading