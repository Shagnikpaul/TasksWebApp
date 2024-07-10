import { Chip } from "@nextui-org/react";

import PropTypes from 'prop-types';
export default function ChipGroup({ topics }) {
    const t = topics.map(tp =>
        <Chip
            key={tp.topic_name}
            startContent={<p>{tp.emoji}</p>}
            variant="flat"
            size="lg"
            color="success"
            radius='sm'
            
        >{tp.topic_name}</Chip>
    )
    return (
        <div className="flex gap-2 justify-center mt-5">
            {t} 
        </div>

    )
}


ChipGroup.propTypes = {
    topics: PropTypes.array.isRequired
}