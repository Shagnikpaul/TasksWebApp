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

import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem
 } from "@nextui-org/dropdown";

import { addTask } from '../../api/calls';

export default function NewTaskModal({ updateFunction, userId, userEmail }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [taskTitle, setTaskTitle] = useState("");
    const [taskPriority, setTaskPriority] = useState(0)
    const [taskColor, setTaskColor] = useState("gray");

    const [taskDescription, setTaskDescription] = useState("");






    const submitTask = function (e) {
        console.log("Task sumbmission initiated ... ");
        console.log(`Task Title : ${taskTitle} Task Description : ${taskDescription} Task Priority :${taskPriority}`);
        addTask({ email: userEmail, id: userId }, { title: taskTitle, body: taskDescription, priority: taskPriority, color: taskColor }).then((r) => {
            console.log("Added a task with response : ", r);
            onOpenChange()
            updateFunction(userId, userEmail)
        })

    }

    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Set Priority"]));

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
        [selectedKeys],
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
                                    validate={(value) => {
                                        if (value.length === 0) {
                                          return "Task title cannot be empty";
                                        }
                              
                                        return value === "admin" ? "Nice try!" : null;
                                      }}
                                    value={taskTitle}
                                    onChange={(e) => {

                                        setTaskTitle(e.target.value)
                                    }}
                                    className='font-inter'
                                />
                                <Textarea isRequired className="font-inter" label="Task Description" placeholder="Gotta do something broo 🤯🤯🤯🤯" variant='bordered'
                                    value={taskDescription}
                                    isInvalid={(taskDescription === "" ? true : false)}
                                    errorMessage={"Task description cannot be empty !!"}
                                    onChange={(e) => { setTaskDescription(e.target.value) }}
                                />

                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button className="capitalize" variant="bordered">
                                        {selectedValue}
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="Dynamic Actions" 
                                        disallowEmptySelection
                                        // aria-label="Single selection example"
                                        selectedKeys={selectedKeys}
                                        selectionMode="single"
                                        variant="flat"
                                        onSelectionChange={setSelectedKeys}
                                    >
                                    
                                    <DropdownItem key="Study"
                                     onClick={(e) => { setTaskPriority(1) }}
                                    >
                                        Study
                                    </DropdownItem>
                                    
                                    <DropdownItem key="Play"
                                    onClick={(e) => { setTaskPriority(2) }}
                                    >
                                        Play
                                    </DropdownItem>
                                    
                                    <DropdownItem key="Important"
                                    onClick={(e) => { setTaskPriority(0) }}
                                    >
                                    Important
                                    </DropdownItem>
                                    
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





