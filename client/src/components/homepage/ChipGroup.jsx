
import PropTypes from 'prop-types';
import SingleChip from "./SingleChip";
import { PlusIcon } from "../icons/PlusIcon";
import { AddCategoryModal } from "./AddCategoryModal";
import EditCategoryDrawer from "./EditCategoryDrawer";

export default function ChipGroup({ categories, updateCategoriesCallback }) {

    return (
        <div className="flex gap-2 justify-center lg:mt-5 flex-wrap p-7 lg:p-0">
            {categories.map(r => <SingleChip key={r['_id']} data={r} />)}
            <AddCategoryModal updateCategoriesCallback={updateCategoriesCallback} existingCategories={categories} />
            <EditCategoryDrawer currentCategories={categories} />
        </div>

    )
}


ChipGroup.propTypes = {
    categories: PropTypes.array.isRequired,
    updateCategoriesCallback: PropTypes.func.isRequired
}