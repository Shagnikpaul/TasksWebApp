import { Chip } from "@heroui/react";

import PropTypes from 'prop-types';
import SingleChip from "./SingleChip";
import { PlusIcon } from "../icons/PlusIcon";
import { AddCategoryModal } from "./AddCategoryModal";

export default function ChipGroup({ categories, updateCategoriesCallback }) {

    return (
        <div className="flex gap-2 justify-center mt-5">
            {categories.map(r => <SingleChip key={r['_id']} data={r} />)}
            <AddCategoryModal updateCategoriesCallback={updateCategoriesCallback} existingCategories={categories} />
        </div>

    )
}


ChipGroup.propTypes = {
    categories: PropTypes.array.isRequired,
    updateCategoriesCallback: PropTypes.func.isRequired
}