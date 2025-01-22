import React from 'react'

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Tabs, Tab, Card, CardBody, Switch,
    useDisclosure,
} from "@heroui/react";
function SettingsMainPage({ isOpen, onOpen, onOpenChange }) {
    //const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <div>
            {/* <Button onPress={onOpen}>Open Modal</Button> */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='4xl'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="">Settings</ModalHeader>
                            <ModalBody className='h-[500px]'>
                                <div className="flex flex-col px-4 justify-center">
                                    <div className="flex w-full flex-col justify-center">
                                        <Tabs aria-label="Options" isVertical={true}>
                                            <Tab key="account" title="Account Settings">
                                                <Card>
                                                    <CardBody>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                                    </CardBody>
                                                </Card>
                                            </Tab>
                                            <Tab key="theme" title="Theme Settings">
                                                <Card>
                                                    <CardBody>
                                                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                                                        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                                                        esse cillum dolore eu fugiat nulla pariatur.
                                                    </CardBody>
                                                </Card>
                                            </Tab>
                                            
                                        </Tabs>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default SettingsMainPage