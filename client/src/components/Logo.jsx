
import { PropTypes } from 'prop-types';

export default function Logo({size}) {
    return (
        <svg width={size} height={size} viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M49.875 16.625L21.375 45.125L8.3125 32.0625L11.6612 28.7137L21.375 38.4037L46.5263 13.2762L49.875 16.625Z" fill="#B9FFD5" />
        </svg>
    )
}


Logo.propTypes = {
    size: PropTypes.number.isRequired
}