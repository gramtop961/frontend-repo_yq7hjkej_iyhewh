import React from 'react'
import Spline from '@splinetool/react-spline'

const Hero = () => {
  const scrollToStudio = () => {
    const el = document.getElementById('studio')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/xzUirwcZB9SOxUWt/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient overlay to improve text contrast */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900/10 via-slate-900/40 to-slate-950"></div>

      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-white drop-shadow-sm">
            Manual Camera. Effortless Color. 24 fps.
          </h1>
          <p className="mt-4 text-lg md:text-xl text-blue-100/90">
            Craft cinematic moments with tactile controls and signature presets like Wedding Palace — inspired by modern color on the Mac.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <button onClick={scrollToStudio} className="px-5 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-medium shadow-lg shadow-blue-500/30 transition">
              Open Camera
            </button>
            <a href="#presets" className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium backdrop-blur border border-white/15 transition">
              Explore Presets
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
