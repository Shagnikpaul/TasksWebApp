import React, { useState } from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Textarea,
    Button,
    useDisclosure,
    Input,
} from "@nextui-org/react";
import { Alert } from "@nextui-org/alert";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem
} from "@nextui-org/dropdown";
import PropTypes from 'prop-types';
import { addTask } from '../../api/calls';
import { IconDelete } from '../icons/DeleteIcon';
import { chiptxtColors } from '../../utils/colors';


export default function NewTaskModal({ updateFunction, userId, userEmail, currentCategories }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [taskTitle, setTaskTitle] = useState("");
    const [chosenCategory, setChosenCategory] = useState({ category_name: "Select Task Category", category_emoji: "➕" })
    const [taskDescription, setTaskDescription] = useState("");
    const [selectedKey, setSelectedKey] = React.useState(new Set([""]));





    const submitTask = function (e) {
        console.log("Task sumbmission initiated ... ");
        console.log(`Task Title : ${taskTitle} Task Description : ${taskDescription} Task Category :${chosenCategory}`);
        addTask({ email: userEmail, id: userId }, { title: taskTitle, body: taskDescription, category_id: chosenCategory['_id'], }).then((r) => {
            console.log("Added a task with response : ", r);

            updateFunction(userId, userEmail)
            onOpenChange()
        })

    }



    const selectedValue = React.useMemo(
        () => Array.from(selectedKey).join(", ").replace(/_/g, ""),
        [selectedKey],
    );

    return (
        <>
            <Button color="primary" onPress={onOpen} className='font-inter'>
                <p className='font-semibold font-inter'>Add a Task</p>
            </Button>
            <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 dark"><p className='font-inter'>Enter new task details.</p></ModalHeader>
                            <ModalBody>
                                <Input
                                    isRequired
                                    label="Task Title"
                                    placeholder="Do something 🤓"
                                    variant="bordered"
                                    type='text'
                                    // isInvalid={(taskTitle === "" ? true : false)}
                                    // errorMessage={"Task title cannot be empty !!"}
                                    isInvalid={taskTitle.length === 0}
                                    errorMessage="Task title cannot be empty."
                                    value={taskTitle}

                                    onValueChange={setTaskTitle}
                                    className='font-inter'
                                />
                                <Textarea isRequired className="font-inter" label="Task Description" placeholder="Gotta do something broo 🤯🤯🤯🤯" variant='bordered'
                                    value={taskDescription}
                                    // isInvalid={(taskDescription === "" ? true : false)}
                                    // errorMessage={"Task description cannot be empty !!"}
                                    isInvalid={taskDescription.length === 0}
                                    errorMessage="Task description cannot be empty."
                                    onValueChange={setTaskDescription}
                                />

                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button startContent={<p>{chosenCategory['category_emoji']}</p>} className="capitalize" variant="bordered">
                                            {chosenCategory['category_name']}
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="Dynamic Actions"
                                        disallowEmptySelection
                                        // aria-label="Single selection example"
                                        selectedKeys={selectedKey}
                                        selectionMode="single"
                                        variant="flat"
                                        onAction={(key) => {
                                            console.log("Category : ",key);
                                            

                                        }}
                                        onSelectionChange={setSelectedKey}
                                    >

                                        {/* study - 1
                                    play - 2
                                    important - 3 */}

                                        {currentCategories.map(c => <DropdownItem onPress={() => {
                                            setChosenCategory(c)
                                        }} className={chiptxtColors[c.category_color]} endContent={<p>{c['category_emoji']}</p>} key={c['_id']}>{c['category_name']}</DropdownItem>)}

                                    </DropdownMenu>
                                </Dropdown>
                            </ModalBody>
                            <ModalFooter className='font-inter'>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>


                                <Button color="primary" onPress={submitTask} isDisabled={(taskTitle === "" || taskDescription === "")}>
                                    Continue
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}





NewTaskModal.propTypes = {
    updateFunction: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    userEmail: PropTypes.string.isRequired,
    currentCategories: PropTypes.array.isRequired
}