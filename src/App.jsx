import React from 'react'
import Hero from './components/Hero'
import Features from './components/Features'
import CameraStudio from './components/CameraStudio'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-blue-50">
      {/* Background accents */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(600px_300px_at_10%_10%,rgba(59,130,246,0.12),transparent),radial-gradient(600px_300px_at_90%_20%,rgba(168,85,247,0.08),transparent)]"></div>

      <Hero />
      <CameraStudio />
      <Features />
      <Footer />
    </div>
  )
}

export default App
