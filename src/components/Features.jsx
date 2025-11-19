import React from 'react'
import { Wand2, Palette, Timer, Settings2 } from 'lucide-react'

const Feature = ({ icon: Icon, title, desc }) => (
  <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
    <Icon className="w-6 h-6 text-blue-400" />
    <h3 className="mt-3 text-white font-semibold">{title}</h3>
    <p className="mt-1 text-blue-100/80 text-sm">{desc}</p>
  </div>
)

const Features = () => {
  return (
    <section className="py-16 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-white">Designed for creators</h2>
          <p className="text-blue-100/80 mt-2">A modern, minimalist interface with pro features you actually use.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Feature icon={Settings2} title="Full manual" desc="Dial in exposure, white balance, and tint for consistent looks." />
          <Feature icon={Timer} title="True 24 fps" desc="Cinematic cadence that feels natural and timeless." />
          <Feature icon={Palette} title="Wedding Palace" desc="Warm, romantic color with soft highlights and gentle skin tones." />
          <Feature icon={Wand2} title="One-tap presets" desc="Switch between curated looks without losing manual control." />
        </div>
      </div>
    </section>
  )
}

export default Features
