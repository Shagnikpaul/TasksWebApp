
import { Input, Button } from "@heroui/react";
import { useState } from "react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../components/signinpage/passicon";
import { Link } from "wouter";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const d_uri = "http://localhost:8000"

function RegisterPage() {
    const nav= useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [inputs, setInputs] = useState({ password: "", email: "" , username:""});

    const registerAction = async(e)=> {
        // console.log("Clicked on register Button !!");
        e.preventDefault();
        console.log("Inputs Object : ", inputs);
        await axios.post(`${d_uri}/api/v1/register`, inputs).then((response) => {
            console.log(response);
            setInputs({
                email: "",
                password: "",
                usernamef:""
            });
            nav(-1);
        }).catch((r) => {
            console.log('Signup Error reason :', r.message);
            alert("Enter valid username,password and email OR user already exists");
        });
    }

    const change = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    return (
        <div className="main flex flex-row justify-center">
            <div className="flex flex-row gap-5 justify-items-center p-52">
                <div className='flex flex-col  gap-5'>
                    <Input isRequired label="Email" className="min-w-96" placeholder="Enter your email" size="lg" variant="faded" type="email"
                    name = "email" 
                    value={inputs.email}
                    onChange={change}
                    />
                    <Input isRequired label="User Name" className="min-w-96" placeholder="Enter your username" size="lg" variant="faded" type="username" 
                    name="username"
                    value={inputs.username}
                    onChange={change}/>
                    <Input
                        endContent={
                            <button
                                aria-label="toggle password visibility"
                                className="focus:outline-none"
                                type="button"
                                onClick={toggleVisibility}>
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
                        name="password"
                        value={inputs.password}
                        onChange={change}
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