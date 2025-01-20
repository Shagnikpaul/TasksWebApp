import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
    useDisclosure,
    Card, CardBody, Accordion, AccordionItem
} from "@heroui/react";
import { EditIcon_2 } from "../icons/EditIcon_2";
import { chiptxtColors } from "../../utils/colors";

export default function EditCategoryDrawer({ currentCategories }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
                                                        <div>
                                                            Its joever
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
                                <Button color="primary" onPress={onClose}>
                                    Save
                                </Button>
                            </DrawerFooter>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </>
    );
}



