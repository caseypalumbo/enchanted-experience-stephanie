
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function App(){
  return (
    <BrowserRouter>
      <nav className="nav">
        <h1>✨ Enchanted Experience Travel</h1>
        <div>
          <Link to="/">Home</Link>
          <Link to="/facebook">Facebook</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/reviews">Reviews</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/facebook" element={<Facebook />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
      </Routes>

      <footer className="footer">
        © 2025 Enchanted Experience Travel by Stephanie • 
        <a href="mailto:enchantedexperiencetravel@gmail.com"> enchantedexperiencetravel@gmail.com</a>
      </footer>
    </BrowserRouter>
  )
}

function Home(){
  const navigate = useNavigate()
  return (
    <section className="hero">
      <motion.div
        initial={{opacity:0, scale:0.9}}
        animate={{opacity:1, scale:1}}
        transition={{duration:1}}
      >
        <h2>Where every vacation begins with magic ✨</h2>
        <p>Disney • Cruises • All-Inclusive Resorts</p>
        <button className="btn" onClick={()=>navigate('/contact')}>
          Start Planning
        </button>
      </motion.div>
    </section>
  )
}

function Facebook(){
  return (
    <section className="magic">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
        className="sparkle"
      />
      <a
        href="https://www.facebook.com/EnchantedExperienceTravelByStephanie"
        target="_blank"
      >
        ✨ Visit Our Facebook ✨
      </a>
    </section>
  )
}

function Contact(){
  const navigate = useNavigate()
  const [paid, setPaid] = useState(false)

  function fakePay(){
    localStorage.setItem('depositPaid','yes')
    setPaid(true)
    setTimeout(()=>navigate('/questionnaire'), 1200)
  }

  return (
    <section className="contact">
      <h2>Contact Me</h2>
      <p>Email me directly:</p>
      <a href="mailto:enchantedexperiencetravel@gmail.com">
        enchantedexperiencetravel@gmail.com
      </a>

      <div className="deposit">
        <h3>Secure Planning Appointment</h3>
        <p>$50 refundable deposit (PayPal-ready)</p>
        <button className="btn" onClick={fakePay}>
          Pay $50 & Continue ✨
        </button>
        {paid && <p className="success">Payment confirmed! Preparing questionnaire…</p>}
      </div>
    </section>
  )
}

function Questionnaire(){
  return (
    <section className="questionnaire">
      <h2>Pre‑Appointment Questionnaire</h2>
      <p>This helps me plan the perfect trip for you ✨</p>
      <form>
        <input placeholder="Traveler Name(s)" />
        <input placeholder="Preferred Destination(s)" />
        <input placeholder="Travel Dates / Flexibility" />
        <textarea placeholder="Must‑do experiences or notes" />
        <button className="btn">Submit Questionnaire</button>
      </form>
    </section>
  )
}

function Reviews(){
  const [reviews, setReviews] = useState([])
  const [name, setName] = useState('')
  const [text, setText] = useState('')

  useEffect(()=>{
    const saved = JSON.parse(localStorage.getItem('reviews') || '[]')
    setReviews(saved)
  },[])

  function add(){
    if(!name || !text) return
    const next = [{name,text}, ...reviews]
    setReviews(next)
    localStorage.setItem('reviews', JSON.stringify(next))
    setName(''); setText('')
  }

  return (
    <section className="reviews">
      <h2>Client Experiences ✨</h2>
      <input placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />
      <textarea placeholder="Share your experience" value={text} onChange={e=>setText(e.target.value)} />
      <button className="btn" onClick={add}>Submit Review</button>

      {reviews.map((r,i)=>(
        <div key={i} className="review-card">
          <strong>{r.name}</strong>
          <p>{r.text}</p>
        </div>
      ))}
    </section>
  )
}
