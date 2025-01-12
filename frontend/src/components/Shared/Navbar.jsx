import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import React from 'react';
import axios from 'axios';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Button } from "@/components/ui/button";
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { setLogout } from '@/store/userSlice';

const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(store => store.user)
  



    const logoutHandler = async () => {
        try {
            const res = await axios.post('http://localhost:5555/api/v1/user/logout', {}, {
                headers: {
                    'Content-Type': "application/json"
                }, withCredentials: true
            })
            if (res.data.success) {
                navigate('/')
                dispatch(setLogout())
                toast.success(res.data.message)
                console.log(res.data.message);

            }

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='flex justify-between bg-[#2b2b2b] text-white p-[18px] items-center'>
            {/* Logo */}
            <div className='font-semibold text-xl'>
                LuckyJob
            </div>

            {/* Navigation Links */}
            <div>
                <ul className='flex font-medium gap-5'>
                    {
                        user?.role === "recruiter" ? (
                            <>
                                <li><Link to={'/admin/company'}>Company</Link></li>
                                <li><Link to={'/admin/jobs'}>Jobs</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to={'/'}>Home </Link></li>
                                <li><Link to={'/jobs'}>Jobs</Link></li>
                              
                            </>
                        )
                    }


                </ul>
            </div>
            {
                user ? (<div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Avatar className='w-10 h-10 cursor-pointer'>
                                <AvatarImage
                                    className="w-8 h-8 rounded-full object-cover"
                                    src={user?.profile?.profilePicture}
                                    alt="@shadcn"
                                />
                                <AvatarFallback>Profile</AvatarFallback>
                            </Avatar>
                        </PopoverTrigger>

                        <PopoverContent className='w-80 p-4 bg-white text-black rounded-lg shadow-lg'>
                            <div className="flex items-center gap-3">
                                <div className='flex'>
                                    <Avatar className='w-10 h-10'>
                                        <AvatarImage
                                            className="w-10 h-10 rounded-full object-cover"
                                            src={user?.profile?.profilePicture}
                                            alt="@shadcn"
                                        />
                                        <AvatarFallback>Profile</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div>
                                    <h1 className='font-medium'>{user?.fullname}</h1>
                                    <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                </div>
                            </div>
                            <div className='mt-4'>
                                <Link to={"/profile"}>
                                    <div className="flex items-center gap-3">
                                        <User2 className="text-gray-600" />
                                        <Button
                                            variant="link"
                                            className="text-blue-600 hover:text-blue-800 focus:outline-none"
                                        >
                                            View Profile
                                        </Button>
                                    </div>
                                </Link>
                                <div
                                    onClick={logoutHandler}
                                    className="flex items-center gap-3 mt-2">
                                    <LogOut className="text-gray-600" />
                                    <Button
                                        variant="link"
                                        className="text-red-600 hover:text-red-800 focus:outline-none"
                                    >
                                        Logout
                                    </Button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>) : (<div className='flex'>
                    <div className='bg-[#1561f0] rounded-md'>
                        <Link to={'/login'}>
                            <Button
                                variant="link"
                                className="text-white  focus:outline-none">
                                Login
                            </Button>
                        </Link>
                    </div>
                    <div>
                        <Link to="/signup">
                            <Button
                                variant="link"
                                className="text-white focus:outline-none"
                            >
                                Signup
                            </Button>
                        </Link>
                    </div>
                </div>)
            }


        </div>
    );
}

export default Navbar;
