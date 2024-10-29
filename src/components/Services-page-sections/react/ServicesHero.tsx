import React from 'react'

function ServicesHero() {
  return (
    <div className="h-screen w-full dark-blue-2 dark:bg-white dark:bg-grid-black/[0.2] bg-grid-white/[0.2] relative flex items-center justify-start ">
    <div className="absolute pointer-events-none inset-0 flex flex-col items-center justify-center bg-black dark:bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)]"></div>
    <div className='z-20 max-w-6xl mx-auto'>
      <span className="text-xl sm:text-2xl font-bold relative  bg-clip-text text-[#ff2121]/70 my-4 ">Branding</span>
      <p className="text-4xl sm:text-7xl font-bold relative  bg-clip-text text-white my-4 ">
    Find your niche
    </p>
    <p className='text-xl text-white/80 my-4'>
    Risus commodo id odio turpis pharetra elementum. Pulvinar porta porta feugiat scelerisque in elit. Morbi rhoncus, tellus, eros Risus commodo id odio turpis pharetra elementum. Pulvinar porta porta feugiat scelerisque in elit. Morbi rhoncus, tellus, eros 
    </p>
    <button className="bg-[#ff2121]/50 text-white py-3 px-6 rounded-full font-semibold shadow-md hover:bg-[#ff2121] transition duration-300 mt-4">Build my brand</button>
    </div>
    
  </div>
  )
}

export default ServicesHero