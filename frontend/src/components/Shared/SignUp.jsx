import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "sonner"

const SignUp = () => {

    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [profilePicture, setProfilePicture] = useState('')

    const navigate = useNavigate()


    const uploadImage = async (imageFile) => {
        const formData = new FormData();
        formData.append('image', imageFile);      //image comes from backend

        try {
            const res = await axios.post("http://localhost:5555/api/v1/user/imageUpload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return res.data.imageURl;  // Notice the corrected field name here
        } catch (error) {
            console.log(error);
        }
    };



    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            let imageURl = '';
            if (profilePicture) {
                imageURl = await uploadImage(profilePicture);
            }

            const res = await axios.post("http://localhost:5555/api/v1/user/register", {
                fullname,
                email,
                phoneNumber,
                password,
                role,
                profilePicture: imageURl
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/login')
                console.log("Response", res.data);
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
            console.log(error);
        }
    };


    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-semibold text-center mb-6">Create Account</h1>
                <form className="space-y-4" onSubmit={submitHandler}>
                    {/* Full Name */}
                    <div>
                        <Label htmlFor="full-name">Full Name</Label>
                        <Input
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            type="text"
                            id="full-name"
                            placeholder="John Doe"
                            className="w-full"
                        />
                    </div>


                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            placeholder="johndoe@gmail.com"
                            className="w-full"
                        />
                    </div>


                    <div>
                        <Label htmlFor="phone-number">Phone Number</Label>
                        <Input
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            type="text"
                            id="phone-number"
                            placeholder="123-456-7890"
                            className="w-full"
                        />
                    </div>


                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            placeholder="********"
                            className="w-full"
                        />
                    </div>


                    <div className='flex '>

                        <RadioGroup
                            className="flex space-x-1 items-center">
                            <Input
                                type="radio"
                                id="student"
                                name="role"
                                value="student"
                                checked={role === 'student'}
                                onChange={(e) => setRole(e.target.value)}
                                className="cursor-pointer w-3.5"
                            />
                            <Label htmlFor="student">Student</Label>

                            <Input
                                checked={role === 'recruiter'}
                                onChange={(e) => setRole(e.target.value)}
                                type="radio"
                                id="recruiter"
                                name="role"
                                value="recruiter"
                                className="cursor-pointer w-3.5"
                            />
                            <Label htmlFor="recruiter">Recruiter</Label>
                        </RadioGroup>
                    </div>


                    <div>
                        <Label htmlFor="profile-pic">Profile Picture</Label>
                        <Input
                            accept="image/*"
                            type="file"
                            id="profile-pic"
                            onChange={(e) => setProfilePicture(e.target.files?.[0])}
                            className="w-full cursor-pointer"
                        />
                    </div>

                    <div className="flex justify-center mt-6 flex-col gap-3">
                        <Button type="submit" className="w-full py-3  text-white  rounded-md">
                            Submit
                        </Button>
                        <span className='text-sm'>Already have an account? <Link to={'/login'} className='hover:underline'>Login</Link></span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
