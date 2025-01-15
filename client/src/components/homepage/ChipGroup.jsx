import { Chip } from "@nextui-org/react";

import PropTypes from 'prop-types';
import SingleChip from "./SingleChip";
import { PlusIcon } from "../icons/PlusIcon";

export default function ChipGroup({ categories }) {

    return (
        <div className="flex gap-2 justify-center mt-5">
            {categories.map(r => <SingleChip key={r['_id']} data={r} />)}
            <Chip
                size="lg"
                //color="success"
                radius='sm'
                variant="flat"
                onClick={(e) => {
                    console.log("cliiiiii");
                    
                }}
                className="cursor-pointer"
            ><PlusIcon /></Chip>
        </div>

    )
}


ChipGroup.propTypes = {
    categories: PropTypes.array.isRequired
}