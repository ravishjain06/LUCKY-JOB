import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from '@/store/userSlice';
import { toast } from 'sonner';

const UserEditDialog = ({ open, setOpen }) => {
    const { user } = useSelector(store => store.user);

    // Separate state for each field
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [bio, setBio] = useState('');
    const [skills, setSkills] = useState('');
    const [file, setFile] = useState(null);
    const dispatch = useDispatch()

    // Pre-fill form data when the `user` data becomes available
    useEffect(() => {
        if (open && user) {
            setFullname(user.fullname || '');
            setEmail(user.email || '');
            setPhoneNumber(user.phoneNumber || '');
            setBio(user.profile?.bio || '');
            setSkills(user.profile?.skills?.join(', ') || ''); // Join skills array into a string
            setFile(user.profile?.resume || null);
        }
    }, [user, open]);

    const imageUpload = async (imageFile) => {
        const formData = new FormData();
        formData.append('image', imageFile)

        try {
            const res = await axios.post("lucky-job.vercel.app/api/v1/user/imageUpload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log("Image Url",res.data.imageURl);
            return res.data.imageURl
            
        } catch (error) {
            console.log(error);
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            let imageURl = ''
            if (file) {
                imageURl = await imageUpload(file)
            }
            const res = await axios.post("lucky-job.vercel.app/api/v1/user/edit/profile", {
                fullname,
                email,
                phoneNumber,
                bio,
                skills,
                resume: imageURl
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            setOpen(false)
            if (res.data.success) {
                toast.success(res.data.message)
                dispatch(setUser(res.data.user))
            }
            console.log(res.data);

        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px] mx-auto p-6">
                <form onSubmit={submitHandler}>
                    <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        {/* Full Name */}
                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                            <Label htmlFor="fullname" className="text-right md:text-left">
                                Full Name
                            </Label>
                            <Input
                                id="fullname"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                                className="col-span-3"
                            />
                        </div>

                        {/* Email */}
                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right md:text-left">
                                Email
                            </Label>
                            <Input
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="col-span-3"
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                            <Label htmlFor="phoneNumber" className="text-right md:text-left">
                                Phone Number
                            </Label>
                            <Input
                                id="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="col-span-3"
                            />
                        </div>

                        {/* Bio */}
                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                            <Label htmlFor="bio" className="text-right md:text-left">
                                Bio
                            </Label>
                            <Input
                                id="bio"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className="col-span-3"
                            />
                        </div>

                        {/* Skills */}
                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                            <Label htmlFor="skills" className="text-right md:text-left">
                                Skills
                            </Label>
                            <Input
                                id="skills"
                                value={skills}
                                onChange={(e) => setSkills(e.target.value)}
                                className="col-span-3"
                            />
                        </div>

                        {/* File Upload */}
                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                            <Label htmlFor="file" className="text-right md:text-left">
                                Upload File
                            </Label>
                            <Input
                                id="file"
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="w-full md:w-auto">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UserEditDialog;
