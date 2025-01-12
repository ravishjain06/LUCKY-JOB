import React, { useEffect } from 'react'
import Navbar from './Shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAllJobs from './hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Testimonial from './Shared/Testimonial'


const Home = () => {
  useGetAllJobs()
  const navigate = useNavigate()
  const { user } = useSelector(store => store.user)

  useEffect(() => {               //Useeffect will run first
    if (user?.role === 'recruiter') {
      navigate('/admin/company')
    }
  }, [])


  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Testimonial/>
      <Footer />
    </div>
  )
}

export default Home