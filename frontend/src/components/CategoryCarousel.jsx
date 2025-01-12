import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/store/jobSlice'

const CategoryCarousel = () => {

    const category = [
        "Frontend Devloper",
        "Backend Devloper",
        "Devops Devloper",
        "Data Science",
        "Frontend Devloper",
        "Backend Devloper",
    ]
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const searchHandler = (query) => {
        navigate('/browse')
        dispatch(setSearchQuery(query))

    }

    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent className="text-center w-[200px]">
                    {
                        category?.map((item, index) => {
                            return <CarouselItem key={index} className="">
                                <Button
                                    onClick={() => searchHandler(item)}
                                    className="bg-[#2b2b2b] focus:outline-none hover:bg-[#2b2b2b]">{item}</Button>
                            </CarouselItem>
                        })
                    }
                </CarouselContent>
                <CarouselNext />
                <CarouselPrevious />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel