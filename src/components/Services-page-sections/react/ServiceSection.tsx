import React from 'react'
import { ThreeDeeCard } from '../../react/ThreeDeeCard'

function ServicesSection({services , lang}) {
  return (
    <section className="max-w-6xl  mx-auto p-4">
      <h2 className="text-2xl md:text-2xl font-bold text-black mb-4">Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  md:gap-5">
        {
      services.map((service, i) => (
          <ThreeDeeCard
            key={i}
            lang={lang}
            url={service.url}
            title={service.title}
            icon={`/${service.icon}`}
            description={service.description}
          />
        ))
    }
      </div>
      
    </section>
  )
}

export default ServicesSection