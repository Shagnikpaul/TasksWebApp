import React, { useEffect, useState } from 'react'

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Tabs, Tab, Card, CardBody, Switch,
    Input, Link,
    useDisclosure,
    Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,
    Avatar,
    CardHeader,
} from "@heroui/react";


import { EditIcon } from '../icons/EditIcon';
import { IconDelete } from '../icons/DeleteIcon';
import { EditIcon_2 } from '../icons/EditIcon_2';
import { getSettings } from '../../api/calls';
function SettingsMainPage({ isOpen, onOpen, onOpenChange }) {
    //const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [userName, setUserName] = useState("username");
    const [userEmail, setUserEmail] = useState("username@some.com");
    const [avatarURL, setavatarURL] = useState("https://cdn.7tv.app/emote/01F6MXJD8R000F76KNAAV5HDGD/3x.avif");
    const [saveButtonStatus, setSaveButtonStatus] = useState(true);

    useEffect(() => {
        

        getSettings(sessionStorage.getItem("id")).then((r) => {
            if (r['settings']) {
                //console.log(("settings init"));
                setUserName(r['settings']['user_name'])
                setUserEmail(sessionStorage.getItem("email"))
            }
        })
    }, [])



    return (
        <div>
            {/* <Button onPress={onOpen}>Open Modal</Button> */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='4xl' className='h-5/6'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="font-inter">Settings</ModalHeader>
                            <ModalBody className='font-inter'>
                                <div className="flex flex-col px-4 justify-center">

                                    <div className="flex w-full flex-col justify-center ">

                                        <Tabs aria-label="Options"
                                            isVertical={true}

                                            size='lg'>
                                            <Tab key="account" title="Account Settings" className='w-full'>
                                                <Card className='p-7'>
                                                    <CardHeader className='block'>
                                                        <h1 className='text-2xl font-semibold'>Account Settings</h1>
                                                        <div className='flex mt-10 '>
                                                            <Dropdown placement="bottom-end">
                                                                <DropdownTrigger>
                                                                    <Avatar
                                                                        name="Joe"
                                                                        isBordered
                                                                        as="button"
                                                                        radius='lg'
                                                                        className="transition-transform w-20 h-20 text-large"
                                                                        src={avatarURL}
                                                                    />
                                                                </DropdownTrigger>
                                                                <DropdownMenu aria-label="Profile Actions" variant="flat">

                                                                    <DropdownItem startContent={<EditIcon_2 />} key="analytics">Change Profile Image</DropdownItem>
                                                                    <DropdownItem startContent={<IconDelete />} key="system" className="text-danger" color='danger'>Reset Image</DropdownItem>


                                                                </DropdownMenu>
                                                            </Dropdown>
                                                            <div className='ml-7 flex flex-col justify-center'>
                                                                <p className='text-2xl font-bold'>
                                                                    {userName}
                                                                </p>
                                                                <p className='text-lg'>
                                                                    {userEmail}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className='mt-10 settings-section'>
                                                            <h1 className='font-semibold text-lg text-foreground-500 text-center mb-6'>Edit Account Details</h1>
                                                            <form className="flex flex-col gap-4  ">
                                                                <Input
                                                                    isRequired
                                                                    label="Edit Username"
                                                                    placeholder="Enter your username"
                                                                    value={userName}
                                                                    onValueChange={(value) => {
                                                                        setUserName(value)
                                                                        setSaveButtonStatus(false)
                                                                    }}
                                                                    type="text" />

                                                                <Input
                                                                    isRequired
                                                                    label="Edit Email"
                                                                    placeholder="Enter your email"
                                                                    value={userEmail}
                                                                    onValueChange={(value) => {
                                                                        setUserEmail(value)
                                                                        setSaveButtonStatus(false)
                                                                    }}
                                                                    type="email"
                                                                />

                                                                <div className="flex gap-2 justify-end">
                                                                    <Button color="primary" isDisabled={saveButtonStatus}
                                                                        onPress={(e) => {
                                                                            setSaveButtonStatus(true)
                                                                        }}>
                                                                        Save
                                                                    </Button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </CardHeader>
                                                    <CardBody>

                                                    </CardBody>
                                                </Card>
                                            </Tab>
                                            <Tab key="theme" title="Theme Settings" className='w-full'>
                                                <Card className='p-7'>
                                                    <CardHeader>
                                                        <h1 className='text-2xl font-semibold'>Theme Settings</h1>
                                                    </CardHeader>
                                                </Card>
                                            </Tab>
                                        </Tabs>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter className='font-inter'>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
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