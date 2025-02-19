
import { Input, Button } from "@heroui/react";
import { useEffect, useState } from "react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../components/signinpage/passicon";
import { Link } from "wouter";
import axios from 'axios';
import { replace, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import "../api/calls"
const d_uri = "http://localhost:8000"
// import env from "react-dotenv"
// const d_uri = env.d_uri
// console.log("d_uri",d_uri)

function SignIn() {

    const [isVisible, setIsVisible] = useState(false);
    const [inputs, setInputs] = useState({ password: "", email: "" });
    const toggleVisibility = () => setIsVisible(!isVisible);
    const nav = useNavigate();
    const [statusText, setStatusText] = useState("Sign In");
    const dispatch = useDispatch();


    useEffect(() => {
        console.log("Welcome to Sign In Page !!");
        const k = sessionStorage.getItem("u_name")
        if (k !== null)
            console.log('K is there !!!');
        else
            console.log('K is not there !!!');


    })

    const change = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const signInClick = async (e) => {
        //e.preventDefault();
        setStatusText("Trying to sign in");
        console.log("Inputs Object : ", inputs);
        await axios.post(`${d_uri}/api/v1/signin`, inputs).then((response) => {
            setStatusText("Success");
            setInputs({
                email: "",
                password: ""
            });

            sessionStorage.setItem("id", response.data.others._id);
            sessionStorage.setItem("email", response.data.others.email);
            sessionStorage.setItem("u_name", response.data.others.username);

            dispatch(authActions.login());
            nav("/home");
        }).catch((r) => {
            setStatusText("Error in Logging in." + r);
            console.log('Sign In Error reason :', r.message);
            alert("Incorrect password or email");
        });
    };

    return (
        <div>
            <h1 className="text-center  pt-10">{statusText}</h1>
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

        </div>

    )
}

export default SignIn