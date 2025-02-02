import React from 'react'
import { Button } from '../ui/button'
import { SignInButton } from '@clerk/nextjs'
import Link from 'next/link'
import HeroText from './components/HeroText'

const Hero = () => {
    return (
        <section className='w-full flex flex-col gap-6 mt-2 border-2 border-black'>

            {/* header */}
            <header className='w-full flex items-center justify-between'>
                <p>Logo</p>
                <Button>Dashboard</Button>
            </header>

            {/* hero section */}

            <div className='w-full mt-10 flex items-center justify-center gap-8 h-[500px]'>

                <div className='w-[49%] border border-black h-full flex flex-col gap-6 items-start justify-center'>
                    <h1 className='text-5xl font-bold'>
                        Ace your interviews with <br /> Interview Saathi
                    </h1>
                    <HeroText />

                    <p>

                    </p>

                    <div className='flex gap-4'>
                        <Button>
                            Dashboard
                        </Button>

                        <Button>
                            Pricing
                        </Button>
                    </div>
                </div>

                <div className='w-[49%] border border-black h-full flex'>
                    <img src="https://cdn.prod.website-files.com/5b5729421aca332c60585f78/60db2de02afb469bde69a54a_template-saas-landing-page.png" alt="product image" className="rounded-xl" />
                </div>

            </div>


        </section>
    )
}

export default Hero
