import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
    useDisclosure,
    Input,
    Tooltip,
    Textarea
} from "@nextui-org/react";
import { EditIcon } from "../icons/EditIcon";
import { useEffect, useState } from "react";
import { updateTask } from "../../api/calls";


export default function EditTaskModal({ customStyle, taskData, setIconInvisible, updateFunction }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [taskTitle, setTaskTitle] = useState(`${taskData.title}`)
    const [taskDescription, setTaskDescription] = useState(`${taskData.body}`)

    const drawerClose = function () {
        setTaskTitle(taskData.title)
        setTaskDescription(taskData.body)
        onOpenChange()
    }

    const drawerOpen = function () {
        setIconInvisible("invisible")
        onOpenChange()
    }

    const drawerContinue = function () {
        updateTask({ email: sessionStorage.getItem("email") }, { id: taskData._id, title: taskTitle, body: taskDescription }).then((r) => {
            console.log("task was updated with status : ", r);
            updateFunction(taskTitle, taskDescription, taskData._id)
            onOpenChange()
            setTaskDescription(taskDescription)
            setTaskTitle(taskTitle)
        })

    }

    return (
        <>
            <Tooltip content="Edit task" color='primary' className='font-inter text-sm' closeDelay={100} offset={15} placement='left'>
                <Button isIconOnly className={customStyle} variant="flat" onPress={drawerOpen}>
                    <EditIcon />
                </Button>
            </Tooltip>

            <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
                <DrawerContent>
                    {(onClose) => (
                        <>
                            <DrawerHeader className="flex flex-col gap-1">Log in</DrawerHeader>
                            <DrawerBody>
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


                            </DrawerBody>
                            <DrawerFooter>
                                <Button color="danger" variant="flat" onPress={drawerClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={drawerContinue} isDisabled={(taskTitle.length === 0 || taskDescription.length === 0)}>
                                    Continue
                                </Button>
                            </DrawerFooter>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </>
    );
}
