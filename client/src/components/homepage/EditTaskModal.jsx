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
    Textarea,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@nextui-org/react";
import { EditIcon } from "../icons/EditIcon";
import { useEffect, useState, useMemo } from "react";
import { updateTask } from "../../api/calls";
import { chiptxtColors } from "../../utils/colors";


export default function EditTaskModal({ customStyle, taskData, setIconInvisible, updateFunction, currentCategories, taskCategory }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [taskTitle, setTaskTitle] = useState(`${taskData.title}`)
    const [taskDescription, setTaskDescription] = useState(`${taskData.body}`)
    const [selectedKey, setSelectedKey] = useState(new Set([""]));
    const [chosenCategory, setChosenCategory] = useState({ _id: taskCategory['_id'], category_name: taskCategory['category_name'], category_emoji: taskCategory['category_emoji'] })
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
        console.log("UPDATE !!!");

        updateTask({ email: sessionStorage.getItem("email") }, { id: taskData._id, title: taskTitle, body: taskDescription, category_id: chosenCategory['_id'] }).then((r) => {
            console.log("task was updated with status : ", r);
            updateFunction(taskTitle, taskDescription, taskData._id)
            onOpenChange()
            setTaskDescription(taskDescription)
            setTaskTitle(taskTitle)
        })

    }
    const selectedValue = useMemo(
        () => Array.from(selectedKey).join(", ").replace(/_/g, ""),
        [selectedKey],
    );
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
                            <DrawerHeader className="flex flex-col gap-1">Edit Task</DrawerHeader>
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
                                            console.log("Category : ", key);
                                        }}
                                        onSelectionChange={setSelectedKey}
                                    >
                                        {currentCategories.map(c => <DropdownItem onPress={() => {
                                            setChosenCategory(c)
                                        }} className={chiptxtColors[c.category_color]} endContent={<p>{c['category_emoji']}</p>} key={c['_id']}>{c['category_name']}</DropdownItem>)}

                                    </DropdownMenu>
                                </Dropdown>
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
