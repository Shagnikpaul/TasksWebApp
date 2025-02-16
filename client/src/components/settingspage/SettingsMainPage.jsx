import React, { useEffect, useRef, useState } from 'react'

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
    Avatar,
    CardHeader,
} from "@heroui/react";

import ImageKit from "imagekit";
import { IKImage, IKVideo, IKContext, IKUpload } from 'imagekitio-react'



import { getImageKitAuth, getSettings } from '../../api/calls';
import { UploadIcons } from '../icons/UploadIcon';
function SettingsMainPage({ isOpen, onOpen, onOpenChange }) {
    //const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [userName, setUserName] = useState(sessionStorage.getItem("u_name"));
    const [userEmail, setUserEmail] = useState(sessionStorage.getItem("email"));
    const [avatarURL, setavatarURL] = useState("https://ik.imagekit.io/kanchen/my-upload_EYf3kxEFL");
    const [saveButtonStatus, setSaveButtonStatus] = useState(true);
    const [fallBackData, setFallBackData] = useState({}); // to store previous data for undo function
    const inputFile = useRef(null);
    const authURL = `http://localhost:8000/api/img/auth/`;
    const onError = err => {
        console.log("Error", err);
    };


    const authenticator = async () => {
        try {
            const response = await fetch(authURL);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            const { signature, expire, token } = data;
            return { signature, expire, token };
        } catch (error) {
            throw new Error(`Authentication request failed: ${error.message}`);
        }
    };

    useEffect(() => {


        getSettings(sessionStorage.getItem("id")).then((r) => {
            if (r['settings']) {
                //console.log(("settings init"));
                setUserName(r['settings']['user_name'])
                setUserEmail(sessionStorage.getItem("email"))
                setavatarURL(r['settings']['avatar_link'])

                const fallBack = {
                    user_name: r['settings']['user_name'],
                    email: sessionStorage.getItem("email"),
                    avatar_link: r['settings']['avatar_link']
                }
                setFallBackData(fallBack)
            }
        })
    }, [])



    return (
        <div>
            {/* <Button onPress={onOpen}>Open Modal</Button> */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='4xl' className='h-5/6 overflow-y-scroll'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="font-inter ">Settings</ModalHeader>
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

                                                    </CardHeader>
                                                    <CardBody className=''>
                                                        <div className='flex '>

                                                            <Avatar
                                                                name="Joe"
                                                                isBordered

                                                                radius='lg'
                                                                className="transition-transform w-20 h-20 text-large"
                                                                src={avatarURL}
                                                            />

                                                            <div className='ml-7 flex flex-col justify-center '>
                                                                <p className='text-2xl font-bold'>
                                                                    {userName}
                                                                </p>
                                                                <p className='text-lg'>
                                                                    {userEmail}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className='mt-10 settings-section'>
                                                            <h1 className='font-medium text-md text-foreground-500 text-right mb-6'>Edit Account Details</h1>
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
                                                                <h1 className='mt-10 font-medium text-md text-foreground-500 text-right mb-6'>Edit Profile Picture</h1>


                                                                {/* <h1 className='font-medium text-sm text-foreground-500 text-right'>OR</h1> */}


                                                                <div className="flex gap-4">
                                                                    <Input type='url' label='Image File URL'
                                                                        value={avatarURL}
                                                                        onValueChange={(v) => {
                                                                            setavatarURL(v)
                                                                            setSaveButtonStatus(false)
                                                                        }}
                                                                    ></Input>
                                                                    <IKContext
                                                                        publicKey="public_AmFN2iM/FsbFD3nPumcDF4SXty4="
                                                                        urlEndpoint="https://ik.imagekit.io/kanchen"
                                                                        transformationPosition="path"
                                                                        authenticationEndpoint={authURL}
                                                                        authenticator={authenticator}>
                                                                        <IKUpload
                                                                            fileName="my-upload"
                                                                            onError={onError}
                                                                            onSuccess={(s) => {
                                                                                console.log("uploaded status", s);
                                                                                setavatarURL(s['url'])
                                                                            }}
                                                                            className='hidden'
                                                                            ref={inputFile}
                                                                        />

                                                                    </IKContext>
                                                                    {/* <Input type='file' label='Upload a Picture'
                                                                        variant='bordered'
                                                                        accept='.jpg, .jpeg, .png .gif .avif'
                                                                        className='hidden'
                                                                        ref={inputFile}
                                                                        onChange={(e) => {
                                                                            //console.log(e.target);
                                                                            setavatarURL(URL.createObjectURL(e.target.files[0]))
                                                                            setSaveButtonStatus(false)
                                                                        }}
                                                                    ></Input> */}
                                                                    <div className='flex flex-col justify-center'>
                                                                        <Button size='lg' isIconOnly color='primary' startContent={<UploadIcons />} className='' variant='shadow'
                                                                            onPress={() => {
                                                                                inputFile.current.click();
                                                                            }}></Button>
                                                                    </div>

                                                                </div>

                                                                <div className="flex gap-2 justify-end mt-10">
                                                                    <Button color="primary" isDisabled={saveButtonStatus}
                                                                        onPress={(e) => {
                                                                            setSaveButtonStatus(true)
                                                                        }}>
                                                                        Save
                                                                    </Button>
                                                                    <Button color="danger" variant='flat' isDisabled={saveButtonStatus}
                                                                        onPress={(e) => {
                                                                            setUserEmail(sessionStorage.getItem("email"))
                                                                            setUserName(sessionStorage.getItem("u_name"))
                                                                            setavatarURL(fallBackData['avatar_link'])
                                                                            setSaveButtonStatus(true)
                                                                        }}>
                                                                        Reset
                                                                    </Button>
                                                                </div>
                                                            </form>

                                                            <form action="">

                                                            </form>
                                                        </div>
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