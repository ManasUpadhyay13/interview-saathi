import React from 'react'

const Testimonials = () => {
    return (
        <div className='w-full   my-6 flex items-center justify-center gap-10 flex-col'>
            <h1 className='text-6xl font-bold'>What our customers say</h1>
            <p>**TODO: add a anmiation on hover, and make the cards animated</p>
            <div className='  px-10 flex flex-wrap items-center justify-center gap-14'>
                {
                    testimonailsData.map((item, idx) => (
                        <div key={idx} className='border  flex gap-6 flex-col p-4 rounded-xl shadow-xl cursor-pointer'>

                            <div className='flex gap-4 items-center'>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPnE_fy9lLMRP5DLYLnGN0LRLzZOiEpMrU4g&s" alt="john doe"
                                    className='rounded-full w-[50px] h-auto'
                                />
                                <p>{item.name}</p>
                            </div>

                            <p className='text-gray-600 text-sm max-w-[20rem]'>{item.message}</p>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Testimonials

const testimonailsData = [
    {
        name: "John Doe",
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magnam doloribus qui ex aut nemo ad velit architecto sequi sed. Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magnam doloribus qui ex aut nemo ad velit architecto sequi sed Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magnam doloribus qui ex aut nemo ad velit architecto sequi sed"
    },
    {
        name: "John Doe",
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magnam doloribus qui ex aut nemo ad velit architecto sequi sed. Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magnam doloribus qui ex aut nemo ad velit architecto sequi sed Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magnam doloribus qui ex aut nemo ad velit architecto sequi sed"
    },
    {
        name: "John Doe",
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magnam doloribus qui ex aut nemo ad velit architecto sequi sed. Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magnam doloribus qui ex aut nemo ad velit architecto sequi sed Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magnam doloribus qui ex aut nemo ad velit architecto sequi sed"
    },
    {
        name: "John Doe",
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magnam doloribus qui ex aut nemo ad velit architecto sequi sed. Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magnam doloribus qui ex aut nemo ad velit architecto sequi sed Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magnam doloribus qui ex aut nemo ad velit architecto sequi sed"
    },
    {
        name: "John Doe",
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magnam doloribus qui ex aut nemo ad velit architecto sequi sed. Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magnam doloribus qui ex aut nemo ad velit architecto sequi sed Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magnam doloribus qui ex aut nemo ad velit architecto sequi sed"
    },
    {
        name: "John Doe",
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magnam doloribus qui ex aut nemo ad velit architecto sequi sed. Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magnam doloribus qui ex aut nemo ad velit architecto sequi sed Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magnam doloribus qui ex aut nemo ad velit architecto sequi sed"
    },
]