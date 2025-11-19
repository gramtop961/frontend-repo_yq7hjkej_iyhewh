import React, { useEffect, useRef, useState } from 'react'
import { Aperture, SlidersHorizontal, Video, Camera, Gauge, Timer, Sun, Droplets, Palette } from 'lucide-react'

const constraintsDefault = {
  video: {
    width: { ideal: 1920 },
    height: { ideal: 1080 },
    frameRate: { ideal: 24 },
    facingMode: 'environment',
  },
  audio: false,
}

const PresetBadge = ({ name, active, onClick, gradient }) => (
  <button
    onClick={onClick}
    className={`group relative overflow-hidden rounded-xl px-4 py-2 text-sm font-medium border transition ${
      active ? 'border-blue-400 bg-blue-500/10 text-white' : 'border-white/10 bg-white/5 text-blue-100 hover:bg-white/10'
    }`}
  >
    <span className="relative z-10">{name}</span>
    <span className={`pointer-events-none absolute inset-0 opacity-60 ${gradient}`}></span>
  </button>
)

const CameraStudio = () => {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)
  const [recording, setRecording] = useState(false)
  const [fps, setFps] = useState(24)
  const [iso, setIso] = useState(100)
  const [wb, setWb] = useState(5600)
  const [exposure, setExposure] = useState(0)
  const [saturation, setSaturation] = useState(1)
  const [temperature, setTemperature] = useState(0)
  const [tint, setTint] = useState(0)
  const [preset, setPreset] = useState('Wedding Palace')

  useEffect(() => {
    const start = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraintsDefault)
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          await videoRef.current.play()
        }
      } catch (e) {
        console.error('Camera error', e)
      }
    }
    start()
    return () => {
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop())
    }
  }, [])

  // Apply CSS filters to simulate color grading
  const filter = `saturate(${saturation}) brightness(${1 + exposure * 0.1}) contrast(${1 + exposure * 0.05}) hue-rotate(${tint}deg) sepia(${Math.max(0, temperature) / 100})` 

  // Preset configurations
  const applyPreset = (name) => {
    setPreset(name)
    switch (name) {
      case 'Wedding Palace':
        setSaturation(1.15)
        setTemperature(20)
        setTint(2)
        break
      case 'Mac Film 24':
        setSaturation(1.05)
        setTemperature(10)
        setTint(-2)
        break
      case 'Classic Mono':
        setSaturation(0)
        setTemperature(0)
        setTint(0)
        break
      default:
        setSaturation(1)
        setTemperature(0)
        setTint(0)
    }
  }

  return (
    <section id="studio" className="relative py-16 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-semibold text-white flex items-center gap-2">
            <Aperture className="w-6 h-6 text-blue-400" /> Pro Camera Studio
          </h2>
          <div className="flex items-center gap-3 text-blue-100/80">
            <Video className="w-5 h-5" /> {fps} fps
          </div>
        </div>

        <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-6 items-start">
          {/* Live preview */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900/40 backdrop-blur">
            <div className="absolute left-4 top-4 z-10 flex items-center gap-2 text-xs text-white/80">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-500/20 text-red-300 border border-red-500/30">
                <Camera className="w-3 h-3" /> {recording ? 'REC' : 'LIVE'}
              </span>
              <span className="px-2 py-1 rounded bg-white/10 text-white/80 border border-white/20">24 fps</span>
              <span className="px-2 py-1 rounded bg-white/10 text-white/80 border border-white/20">Manual</span>
            </div>
            <video ref={videoRef} className="w-full h-[50vh] object-cover" style={{ filter }} muted playsInline />
          </div>

          {/* Controls */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur p-4 md:p-6">
            <div className="flex items-center gap-2 text-blue-100/80 mb-4">
              <SlidersHorizontal className="w-5 h-5" /> Manual Controls
            </div>

            <div className="space-y-5">
              <label className="block">
                <div className="mb-2 flex items-center gap-2 text-sm text-blue-100/80"><Gauge className="w-4 h-4" /> Exposure</div>
                <input type="range" min="-5" max="5" step="0.1" value={exposure} onChange={e => setExposure(parseFloat(e.target.value))} className="w-full accent-blue-500" />
              </label>
              <label className="block">
                <div className="mb-2 flex items-center gap-2 text-sm text-blue-100/80"><Sun className="w-4 h-4" /> White Balance (K)</div>
                <input type="range" min="2000" max="7500" step="100" value={wb} onChange={e => setWb(parseInt(e.target.value))} className="w-full accent-blue-500" />
              </label>
              <label className="block">
                <div className="mb-2 flex items-center gap-2 text-sm text-blue-100/80"><Droplets className="w-4 h-4" /> Saturation</div>
                <input type="range" min="0" max="2" step="0.01" value={saturation} onChange={e => setSaturation(parseFloat(e.target.value))} className="w-full accent-blue-500" />
              </label>
              <label className="block">
                <div className="mb-2 flex items-center gap-2 text-sm text-blue-100/80"><Palette className="w-4 h-4" /> Tint (Hue)</div>
                <input type="range" min="-45" max="45" step="1" value={tint} onChange={e => setTint(parseInt(e.target.value))} className="w-full accent-blue-500" />
              </label>

              <div className="pt-2">
                <div className="mb-3 text-sm text-blue-100/80">Presets</div>
                <div className="flex flex-wrap gap-2" id="presets">
                  <PresetBadge name="Wedding Palace" gradient="bg-gradient-to-r from-rose-400/30 via-amber-300/20 to-rose-400/30" active={preset==='Wedding Palace'} onClick={() => applyPreset('Wedding Palace')} />
                  <PresetBadge name="Mac Film 24" gradient="bg-gradient-to-r from-blue-400/30 via-purple-300/20 to-blue-400/30" active={preset==='Mac Film 24'} onClick={() => applyPreset('Mac Film 24')} />
                  <PresetBadge name="Classic Mono" gradient="bg-gradient-to-r from-slate-400/30 to-slate-700/30" active={preset==='Classic Mono'} onClick={() => applyPreset('Classic Mono')} />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <button onClick={() => setRecording(r => !r)} className={`px-4 py-2 rounded-lg font-medium transition border ${recording ? 'bg-red-500/90 text-white border-red-500' : 'bg-white/10 text-white border-white/20 hover:bg-white/20'}`}>
                  {recording ? 'Stop' : 'Record'}
                </button>
                <button onClick={() => applyPreset('Wedding Palace')} className="px-4 py-2 rounded-lg font-medium transition border bg-rose-500/20 text-rose-100 border-rose-400/40">
                  Wedding Palace
                </button>
              </div>

              <p className="text-xs text-blue-200/70 mt-2">Recording is a visual toggle in this demo. Browser limitations may affect frame rate control; preview targets 24 fps look.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CameraStudio
