import { Chip } from "@nextui-org/react";

import PropTypes from 'prop-types';
import SingleChip from "./SingleChip";

export default function ChipGroup({ categories }) {

    return (
        <div className="flex gap-2 justify-center mt-5">
            {categories.map(r => <SingleChip key={r['_id']} data={r} />)}
        </div>

    )
}


ChipGroup.propTypes = {
    categories: PropTypes.array.isRequired
}