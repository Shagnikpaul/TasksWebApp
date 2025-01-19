import PropTypes, { func } from 'prop-types'
import { PlusIcon } from '../icons/PlusIcon';
import EmojiPicker from 'emoji-picker-react';
import { Theme } from 'emoji-picker-react';
import {
    Chip,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Select,
    SelectItem,
    Input,
} from "@heroui/react";
import { colorList } from '../../utils/colors';
import { useEffect, useState } from 'react';
import converter from 'number-to-words'
import { addNewCategory } from '../../api/calls';




export const AddCategoryModal = ({ existingCategories, updateCategoriesCallback }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedColor, setSelectedColor] = useState(new Set(["gray"]));
    const [selectedEmoji, setSelectedEmoji] = useState("none")
    const [categoryName, setCategoryName] = useState("")
    const [priorityList, setPriorityList] = useState([{
        key: 0,
        word: "Zero"
    }])

    const [selectedPriority, setSelectedPriority] = useState(new Set([(existingCategories.length + 1)]))



    const submitCategory = function () {
        console.log("Selected color : ", selectedColor.keys().next().value);
        console.log("Selected priority : ", selectedPriority.keys().next().value);
        addNewCategory(sessionStorage.getItem("id"),
            {
                category_name: categoryName,
                category_color: selectedColor.keys().next().value,
                category_emoji: selectedEmoji,
                priority: selectedPriority.keys().next().value
            }
        ).then((r) => {
            console.log("New category added : ", r);
            updateCategoriesCallback(sessionStorage.getItem("id"))
            onOpenChange();
        })
    }

    function capitalizeFirstLetter(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }
    useEffect(() => {
        //console.log("Recieved categories : ", existingCategories);
        const temp = []
        for (var i = 0; i <= (existingCategories.length); i++) {
            temp.push({
                key: (i + 1),
                word: capitalizeFirstLetter(converter.toWords((i + 1)))
            })
        }
        console.log('prior array : ', temp);
        setPriorityList(temp)
        setSelectedPriority(new Set([(existingCategories.length + 1)]))
    }, [existingCategories.length])
    return (
        <div>
            <Chip
                size="lg"
                color='primary'
                radius='sm'
                variant="flat"
                onClick={onOpen}
                className="cursor-pointer">
                <PlusIcon />
            </Chip>
            <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange} className='font-inter'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Add a new Category</ModalHeader>
                            <ModalBody>
                                <Input
                                    type='search'
                                    label="Category Name"
                                    value={categoryName}
                                    isInvalid={categoryName.length === 0}
                                    errorMessage="Category name cannot be empty."
                                    onValueChange={setCategoryName}
                                    placeholder="Example : Play"
                                    variant="bordered"
                                />




                                <Select
                                    selectedKeys={selectedPriority}
                                    items={priorityList}
                                    label="Category Priority"
                                    variant='flat'
                                    onSelectionChange={setSelectedPriority}
                                    description="Default is last priority"
                                >
                                    {
                                        (priority) =>
                                            <SelectItem key={priority.key} textValue={priority.word}>

                                                <div className={`flex justify-between font-inter`}>
                                                    <div className='flex flex-row justify-center'>
                                                        <p className=' rounded-lg'>{priority.key}</p>

                                                    </div>
                                                    <div className='flex flex-col justify-center'>
                                                        <p className={`text-md`}>{priority.word}</p>
                                                    </div>

                                                </div>


                                            </SelectItem>
                                    }
                                </Select>












                                <Select
                                    items={colorList}
                                    label="Category Color"
                                    variant='flat'
                                    description="Default is gray"
                                    selectedKeys={selectedColor}
                                    className='mb-6'
                                    onSelectionChange={setSelectedColor}
                                    renderValue={(items) => {
                                        return items.map((item) => (
                                            <div key={item.key} className={`flex justify-between font-inter`}>
                                                <div className='flex flex-col justify-center'>
                                                    <p className={`text-center ${item.data.text_color} text-md`}>{item.data.color_name}</p>
                                                </div>
                                            </div>
                                        ));
                                    }}
                                >
                                    {
                                        (color) =>
                                            <SelectItem key={color.key} textValue={color.color_name}>

                                                <div className={`flex justify-between font-inter`}>
                                                    <div className='flex flex-col justify-center'>
                                                        <p className={`text-center ${color.text_color} text-md`}>{color.color_name}</p>
                                                    </div>
                                                </div>


                                            </SelectItem>
                                    }
                                </Select>
                                <p>Pick an emoji for Category</p>
                                <div className='flex bg-white/10 rounded-lg justify-between p-1'>
                                    <div className='flex flex-col justify-center'>
                                        <p className='ml-3'>Selected Emoji</p>
                                    </div>
                                    <p className='p-1 mr-2 text-2xl'>{selectedEmoji === "none" ? "🤓" : selectedEmoji}</p>
                                </div>
                                <EmojiPicker
                                    width="100%"
                                    height="20em"
                                    reactionsDefaultOpen={true}
                                    previewConfig={{
                                        showPreview: false // defaults to: true
                                    }}
                                    theme={Theme.AUTO}
                                    onEmojiClick={(emoji) => {
                                        //console.log('Emoji selected : ', emoji.emoji, emoji.unified);
                                        setSelectedEmoji(emoji.emoji)

                                    }}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button isDisabled={categoryName.length === 0} color="primary" onPress={submitCategory}>
                                    Continue
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

AddCategoryModal.propTypes = {
    existingCategories: PropTypes.array.isRequired,
    updateCategoriesCallback: PropTypes.func.isRequired
}


