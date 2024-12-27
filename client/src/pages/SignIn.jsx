
import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../components/signinpage/passicon";
import { Link } from "wouter";
import axios from 'axios';
import { replace, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store";

function SignIn() {

    const [isVisible, setIsVisible] = useState(false);
    const [inputs, setInputs] = useState({ password: "", email: "" });
    const toggleVisibility = () => setIsVisible(!isVisible);
    const nav=useNavigate();

    const dispatch = useDispatch();

    const change = (e) => {
        //console.log("e.target is ", e.target)
        setInputs({ ...inputs, [e.target.name]: e.target.value });
        //console.log(e.target.value)//name is undefined 
        // console.log(e.target.value)
    }

    const signInClick = async (e) => {
        e.preventDefault();
        console.log("Inputs Object : ", inputs);
        await axios.post("http://localhost:1000/api/v1/signin", inputs).then((response) => {
            // console.log(response);
            setInputs({
                email: "",
                password: ""
            });
            sessionStorage.setItem("id",response.data.others._id);
            dispatch(authActions.login());
            nav("/home");
        }).catch((r) => {
            console.log('Sign In Error reason :', r.message);
            alert("Incorrect password or email");
        });
    };

    // const signInAction = function () {
    //     console.log("Clicked on Sign In Button !!");

    // }

    // const registerAction = function () {
    //     console.log("Clicked on register Button !!");
    // }

    return (
        <div className="main flex flex-row justify-center">
            <div className="flex flex-row gap-5 justify-items-center p-52">
                <div className='flex flex-col  gap-5'>
                    <Input
                        isRequired label="Email" className="min-w-96" placeholder="Enter your email" size="lg" variant="faded"
                        type="email"
                        isClearable
                        value={inputs.email}
                        name="email"
                        onChange={change}
                    />
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
                        name="password"
                        value={inputs.password}
                        onChange={change}
                    />
                    <div className="button-group flex flex-row gap-10 justify-center">
                        {/* <Link href='/home'>
                            <Button className="bg-green-400" onClick={signInClick}>Sign In</Button>
                        </Link> */}
                        <Button className="bg-green-400" onClick={signInClick}>Sign In</Button>

                        {/* <Link href='/register'>
                            <Button color="secondary" onClick={registerAction}>Register</Button>
                        </Link> */}
                        <Link href='/register'>
                            <Button color="secondary">Register</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default SignIn