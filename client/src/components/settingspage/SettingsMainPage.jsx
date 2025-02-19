import React, { useEffect, useRef, useState } from 'react'

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Tabs, Tab, Card, CardBody, Progress,
    Input, Link,
    useDisclosure,
    Avatar,
    CardHeader,
} from "@heroui/react";


import { IKContext, IKUpload } from 'imagekitio-react'



import { updateAvatarURL, updateUserName, updateUserTheme } from '../../api/calls';
import { UploadIcons } from '../icons/UploadIcon';
import { current } from '@reduxjs/toolkit';
import ThemeSettingsPage from './ThemeSettingsPage';
function SettingsMainPage({ isOpen, onOpen, onOpenChange, settingsData, settingsUpdateFunction }) {
    const [userName, setUserName] = useState(sessionStorage.getItem("u_name"));
    const [userEmail, setUserEmail] = useState(sessionStorage.getItem("email"));
    const [userTheme, setUserTheme] = useState("dark")
    const [avatarURL, setavatarURL] = useState("https://ik.imagekit.io/kanchen/my-upload_EYf3kxEFL");
    const [saveButtonStatus, setSaveButtonStatus] = useState(true);
    const [fallBackData, setFallBackData] = useState({}); // to store previous data for undo function
    const inputFile = useRef(null);
    const authURL = `https://tasks-web-app-backend.vercel.app/api/img/auth/`;
    const [progressBarData, setProgressBarData] = useState({
        show: false,
        current: 0,
        max: 100
    })




    const onError = err => {
        console.log("Error", err);
    };



    const onUploadProgress = progress => {
        //console.log("Progress", progress);
        setProgressBarData({
            ...progressBarData,
            current: progress.loaded,
            max: progress.total,
            show: true
        })
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
        //console.log('update settings data in settings page');

        const fallBack = {
            user_name: settingsData.user_name,
            email: sessionStorage.getItem("email"),
            avatar_link: settingsData.avatar_link,
            user_theme: settingsData.theme
        }
        setFallBackData(fallBack)
        setUserName(settingsData.user_name)
        setUserEmail(sessionStorage.getItem("email"))
        setavatarURL(settingsData.avatar_link)
        setUserTheme(settingsData.theme)
    }, [settingsData])


    function updateSettingsData(new_username, new_theme, new_avatar) {
        const userId = sessionStorage.getItem("id");
        // console.log('new_username is ', new_username);
        // console.log('new_theme is ', new_theme);
        // console.log('new_avatar is ', new_avatar);

        if (new_username !== fallBackData['user_name']) {
            updateUserName(userId, new_username).then((r) => {
                if (r['message'] && r['message'] === 'username updated successfully') {
                    sessionStorage.setItem('u_name', new_username);
                    setFallBackData({ ...fallBackData, user_name: new_username });
                    settingsUpdateFunction({
                        new_username: new_username,
                        new_theme: new_theme,
                        new_avatarlink: new_avatar
                    })
                }
            });
        }

        if (new_avatar !== fallBackData['avatar_link']) {
            updateAvatarURL(userId, new_avatar).then((r) => {
                if (r['message'] && r['message'] === "avatar updated successfully") {
                    setFallBackData({ ...fallBackData, avatar_link: new_avatar });
                    settingsUpdateFunction({
                        new_username: new_username,
                        new_theme: new_theme,
                        new_avatarlink: new_avatar
                    })
                }

            });
        }

        if (new_theme != fallBackData['user_theme']) {
            updateUserTheme(userId, new_theme).then((r) => {
                if (r['message'] && r['message'] === "theme updated successfully") {
                    setFallBackData({ ...fallBackData, user_theme: new_theme });
                    settingsUpdateFunction({
                        new_username: new_username,
                        new_theme: new_theme,
                        new_avatarlink: new_avatar
                    })
                }
            });
        }



    }


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
                                            className='flex-wrap'


                                            size='lg'>
                                            <Tab key="account" title="Account Settings" className='w-full'>
                                                <Card className='p-2 lg:p-7'>
                                                    <CardHeader className='block'>
                                                        <h1 className='text-2xl font-semibold'>Account Settings</h1>

                                                    </CardHeader>
                                                    <CardBody className=''>
                                                        <div className='flex p-5 pl-0 flex-wrap'>

                                                            <Avatar
                                                                name={userName}
                                                                isBordered

                                                                radius='lg'
                                                                className="transition-transform w-20 h-20 text-large mb-5 mr-5"
                                                                src={avatarURL}
                                                            />

                                                            <div className='flex flex-col justify-center '>
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
                                                                    isInvalid={(userName.length === 0)}
                                                                    errorMessage={"User name can't be empty."}
                                                                    value={userName}
                                                                    onValueChange={(value) => {
                                                                        setUserName(value)

                                                                    }}
                                                                    type="text" />

                                                                <Input
                                                                    isRequired
                                                                    isDisabled
                                                                    label="Edit Email"
                                                                    placeholder="Enter your email"
                                                                    description="Editing email is not allowed for now."
                                                                    value={userEmail}
                                                                    onValueChange={(value) => {
                                                                        setUserEmail(value)

                                                                    }}
                                                                    type="email"
                                                                />
                                                                <h1 className='mt-10 font-medium text-md text-foreground-500 text-right mb-6'>Edit Profile Picture</h1>


                                                                {/* <h1 className='font-medium text-sm text-foreground-500 text-right'>OR</h1> */}


                                                                <div className="flex gap-4">
                                                                    <Input type='url' label='Image File URL'
                                                                        value={avatarURL}
                                                                        description="Paste image URL or upload a local image file."
                                                                        isInvalid={avatarURL.length === 0}
                                                                        errorMessage={"Image URL cannot be kept empty."}
                                                                        onValueChange={(v) => {
                                                                            setavatarURL(v)

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
                                                                                //console.log("uploaded status", s);
                                                                                setProgressBarData({
                                                                                    ...progressBarData,
                                                                                    show: false
                                                                                })
                                                                                setavatarURL(s['url'])
                                                                            }}
                                                                            onUploadProgress={onUploadProgress}
                                                                            onUploadStart={() => {
                                                                                setProgressBarData({ ...progressBarData, show: true })
                                                                            }}
                                                                            className='hidden'
                                                                            ref={inputFile}

                                                                            validateFile={(file) => {
                                                                                console.log(file);
                                                                                if (file.size > 100000)
                                                                                    window.alert('file size exceeds 9mb');
                                                                                return (file.size < 90000);
                                                                            }}
                                                                        />

                                                                    </IKContext>

                                                                    <div className='flex flex-col mt-1'>
                                                                        <Button size='lg' isIconOnly color='primary' startContent={<UploadIcons />} className='' variant='shadow'
                                                                            onPress={() => {
                                                                                inputFile.current.click();
                                                                            }}></Button>
                                                                    </div>

                                                                </div>
                                                                <Progress
                                                                    label="Uploading..."
                                                                    color="primary"
                                                                    className={(progressBarData.show) ? "" : "hidden"}
                                                                    size="md"
                                                                    showValueLabel
                                                                    maxValue={progressBarData.max}
                                                                    value={progressBarData.current}
                                                                />
                                                                <div className="flex gap-2 justify-end mt-10">
                                                                    <Button color="primary" isDisabled={
                                                                        !((userName !== fallBackData['user_name']) || (avatarURL !== fallBackData['avatar_link']))
                                                                    }
                                                                        onPress={(e) => {
                                                                            updateSettingsData(userName, userTheme, avatarURL);
                                                                        }}>
                                                                        Save
                                                                    </Button>
                                                                    <Button color="danger" variant='flat' isDisabled={
                                                                        !((userName !== fallBackData['user_name']) || (avatarURL !== fallBackData['avatar_link']))
                                                                    }
                                                                        onPress={(e) => {
                                                                            setUserEmail(sessionStorage.getItem("email"))
                                                                            setUserName(sessionStorage.getItem("u_name"))
                                                                            setavatarURL(fallBackData['avatar_link'])

                                                                        }}>
                                                                        Reset
                                                                    </Button>
                                                                </div>
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
                                                    <CardBody>
                                                        <ThemeSettingsPage />
                                                    </CardBody>
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