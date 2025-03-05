import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from '../ui/button';
import { Toaster } from "@/components/ui/sonner"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/userSlice';

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler =async (e) => {
        e.preventDefault()
        console.log("Cliked");
        try {
            const res = await axios.post("lucky-job.vercel.app/api/v1/user/login", {
                email,
                password,
                role
            }, {
                headers: {
                    'Content-Type': "application/json"
                },
                withCredentials: true
            })
            if (res.data.success) {
                navigate('/')
                dispatch(setUser(res.data.user))
                toast.success(res.data.message)
            }
            console.log(res.data);

        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-semibold text-center mb-6">Login </h1>

                <form className="space-y-4" onSubmit={submitHandler}>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            placeholder="johndoe@gmail.com"
                            className="w-full"
                        />
                    </div>


                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            placeholder="********"
                            className="w-full"
                        />
                    </div>

                    <div>
                        <RadioGroup className="flex space-x-1 items-center">
                            <Input
                                id="student"
                                name="role"
                                type="radio"
                                value="student"
                                className="cursor-pointer  w-3.5"
                                checked={role === 'student'}
                                onChange={(e) => setRole(e.target.value)}
                            />
                            <Label htmlFor="student">Student</Label>

                            <Input
                                id="recruiter"
                                name="role"
                                type="radio"
                                value="recruiter"
                                className="cursor-pointer  w-3.5"
                                checked={role === 'recruiter'}
                                onChange={(e) => setRole(e.target.value)}
                            />
                            <Label htmlFor="recruiter">Recruiter</Label>
                        </RadioGroup>
                    </div>

                    <div className="flex justify-center mt-6 flex-col gap-3">
                        <Button type="submit" className="w-full py-3  text-white  rounded-md">
                            Login
                        </Button>
                        <span className='text-sm'>Don't have an account? <Link to={'/signup'} className='hover:underline'>Register</Link></span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
