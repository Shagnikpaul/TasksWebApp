import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
    useDisclosure,
    Form, Input, Accordion, AccordionItem
} from "@heroui/react";
import PropTypes from 'prop-types';
import { EditIcon_2 } from "../icons/EditIcon_2";
import { chiptxtColors } from "../../utils/colors";
import { useState } from "react";
import { SaveIcon } from "../icons/SaveIcon";
export default function EditCategoryDrawer({ currentCategories, updateCategoryList }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [action, setAction] = useState(null);
    const [message, setMessage] = useState("");
    return (
        <>
            <Button onPress={onOpen} isIconOnly color="primary" size="sm">
                <EditIcon_2 />
            </Button>
            <Drawer isOpen={isOpen} onOpenChange={onOpenChange} className="font-inter">
                <DrawerContent>
                    {(onClose) => (
                        <>
                            <DrawerHeader className="flex flex-col gap-1">Edit / Delete Categories.</DrawerHeader>
                            <DrawerBody>
                                <div className="category-list">
                                    <Accordion variant="splitted">
                                        {
                                            currentCategories.map((c) => {
                                                return (
                                                    <AccordionItem key={c['_id']} title={<p className={`${chiptxtColors[c['category_color']]} text-md`}>{c['category_name']}</p>} subtitle={<p>Has {c['tasks'].length} {(c['tasks'].length === 1) ? "task" : "tasks"} in it.</p>} startContent={<p className="text-2xl p-2">{c['category_emoji']}</p>}>
                                                        <div className="">
                                                            <p className="mb-5 text-center font-medium">Edit details of {c['category_name']}</p>
                                                            <Form
                                                                className="w-full  flex flex-col gap-4"
                                                                validationBehavior="native"
                                                                onReset={() => setAction("reset")}
                                                                onSubmit={(e) => {
                                                                    e.preventDefault();
                                                                    let data = Object.fromEntries(new FormData(e.currentTarget));

                                                                    setAction(`submit ${JSON.stringify(data)}`);
                                                                }}
                                                            >
                                                                <Input
                                                                    isRequired
                                                                    errorMessage="Category name cannot be empty"
                                                                    label="Category Name"
                                                                    labelPlacement="outside"
                                                                    name="category_name"
                                                                    placeholder="Enter category name"
                                                                    type="text"
                                                                />


                                                                <div className="flex gap-2">
                                                                    <Button color="primary" type="submit" startContent={<SaveIcon />}>
                                                                        Save Changes
                                                                    </Button>
                                                                    <Button type="reset" variant="light" color="danger">
                                                                        Reset
                                                                    </Button>
                                                                </div>
                                                                {action && (
                                                                    <div className="text-small text-default-500">
                                                                        Action: <code>{action}</code>
                                                                    </div>
                                                                )}
                                                            </Form>
                                                        </div>
                                                    </AccordionItem>
                                                )
                                            })
                                        }
                                    </Accordion>

                                </div>
                            </DrawerBody>
                            <DrawerFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                
                            </DrawerFooter>
                        </>
                    )}
                </DrawerContent>
            </Drawer>



            
        </>
    );
}



EditCategoryDrawer.propTypes = {
    currentCategories: PropTypes.array.isRequired,
    updateCategoryList: PropTypes.func
}