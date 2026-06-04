import './App.css'

const profile = {
  name: "Kevin Lopez",
  bio: "Software Engineer",
  location: "Salinas, CA",
  avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=linktree", // swap with your image
}

const links = [
  { label: "Leetcode Profile", sub: "yourwebsite.com", url: "https://yourwebsite.com", icon: "🎨" },
  { label: "GitHub", sub: "github.com/yourusername", url: "https://github.com/yourusername", icon: "🐙" },
  { label: "LinkedIn", sub: "linkedin.com/in/yourprofile", url: "https://linkedin.com/in/yourprofile", icon: "💼" },
  { label: "Résumé", sub: "yourwebsite.com/resume", url: "https://yourwebsite.com/resume", icon: "📄" },
]

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "☀️ Good morning"
  if (hour < 18) return "👋 Good afternoon"
  return "🌙 Good evening"
}

function App() {
  return (
    <main className="container">
      <div className="banner">
        {getGreeting()}, welcome to my page!
      </div>
      <div className="profile">
        <img src={profile.avatar} alt="avatar" className="avatar" />
        <h1 className="name">{profile.name}</h1>
        <p className="bio">{profile.bio}</p>
        <p className="location">{profile.location}</p>
      </div>

      <ul className="links">
        {links.map((link) => (
          <li key={link.url}>
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="link-btn">
              <span className="link-icon">{link.icon}</span>
              <span className="link-text">
                <span className="link-label">{link.label}</span>
                <span className="link-sub">{link.sub}</span>
              </span>
              <span className="link-arrow">→</span>
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App