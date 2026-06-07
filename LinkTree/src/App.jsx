import { useState, useEffect } from 'react'
import { FaGithub, FaLinkedin, FaFileAlt } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'
import './App.css'

const profile = {
  name: "Kevin Lopez",
  bio: "Software Engineer",
  location: "Salinas, CA",
  avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=linktree", 
}

const links = [
  { label: "Leetcode Profile", sub: "BlockDestroyer", url: "https://leetcode.com/u/BlockDestroyer/", icon: <SiLeetcode/> },
  { label: "GitHub", sub: "Kevinlzs", url: "https://github.com/Kevinlzs", icon: <FaGithub/> },
  { label: "LinkedIn", sub: "Kevinlzs", url: "https://linkedin.com/in/Kevinlzs", icon: <FaLinkedin/> },
  { label: "Résumé", sub: "yourwebsite.com/resume", url: "https://yourwebsite.com/resume", icon: "📄" },
]

function getGreeting() {
  const hour = new Date().getHours()
  console.log(hour)
  if (hour < 12) return "☀️ Good morning"
  if (hour < 18) return "👋 Good afternoon"
  return "🌙 Good evening"
}

function useDarkMode() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('theme')
    if (stored) return stored === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    document.documentElement.classList.toggle('light', !dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return [dark, setDark]
}

function App() {
  const [dark, setDark] = useDarkMode()

  const [counts, setCounts] = useState(() => {
    const stored = localStorage.getItem('linkCounts')
    return stored ? JSON.parse(stored) : {}
  })

  function handleLinkClick(label) {
    setCounts(prev => {
      const updated = { ...prev, [label]: (prev[label] || 0) + 1 }
      localStorage.setItem('linkCounts', JSON.stringify(updated))
      return updated
    })
  }
  return (
    <>
    <div className="banner">
      {getGreeting()}, welcome to my linktree!
    </div>
    <main id="main-content" className="container">
      <button
        className="theme-toggle"
        onClick={() => setDark(d => !d)}
        aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <span className="toggle-label">{dark ? 'Dark' : 'Light'}</span>
        <span className={`toggle-thumb ${dark ? 'right' : 'left'}`}></span>
      </button>
      <div className="profile">
        <img src={profile.avatar} alt="avatar" className="avatar" />
        <h1 className="name">{profile.name}</h1>
        <p className="bio">{profile.bio}</p>
        <p className="location">{profile.location}</p>
      </div>

      <ul className="links" role="list" aria-label="Social and profile links">
        {links.map((link) => (
          <li key={link.url}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-btn"
              aria-label={`${link.label} — ${link.sub}, opens in new tab`}
              onClick={() => handleLinkClick(link.label)}
            >
              <span className="link-icon" aria-hidden="true">{link.icon}</span>
              <span className="link-text">
                <span className="link-label">{link.label}</span>
                <span className="link-sub">{link.sub}</span>
              </span>
              <span className="link-count">
                {counts[link.label] ? `${counts[link.label]} clicks` : ''}
              </span>
              <span className="link-arrow" aria-hidden="true">→</span>
            </a>
          </li>
        ))}
      </ul>
    </main>
    </>
  )
}

export default App