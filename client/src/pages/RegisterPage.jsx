
import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../components/signinpage/passicon";
import { Link } from "wouter";
function RegisterPage() {

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);




    const registerAction = function () {
        console.log("Clicked on register Button !!");
    }

    return (
        <div className="main flex flex-row justify-center">
            <div className="flex flex-row gap-5 justify-items-center p-52">
                <div className='flex flex-col  gap-5'>
                    <Input isRequired label="Email" className="min-w-96" placeholder="Enter your email" size="lg" variant="faded" type="email" />
                    <Input isRequired label="User Name" className="min-w-96" placeholder="Enter your username" size="lg" variant="faded" type="username" />
                    <Input
                        endContent={
                            <button
                                aria-label="toggle password visibility"
                                className="focus:outline-none"
                                type="button"
                                onClick={toggleVisibility}
                            >
                                {isVisible ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        label="Password"
                        size="lg"
                        placeholder="Enter your password"
                        type={isVisible ? "text" : "password"}
                        variant="faded"
                    />
                    <div className="button-group flex flex-row gap-10 justify-center">
                        <Link href='/home'>
                            <Button className="bg-green-400" onClick={registerAction}>Register</Button>
                        </Link>

                    </div>
                </div>
            </div>
        </div>


    )
}

export default RegisterPage