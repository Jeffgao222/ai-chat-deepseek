import { useState, useEffect } from 'react'
import ApiKeySetup from './components/ApiKeySetup'
import ChatApp from './components/ChatApp'

function App() {
  const [apiKey, setApiKey] = useState('')
  const [isSetup, setIsSetup] = useState(false)

  useEffect(() => {
    // 从 localStorage 读取 API Key
    const savedApiKey = localStorage.getItem('deepseek_api_key')
    if (savedApiKey) {
      setApiKey(savedApiKey)
      setIsSetup(true)
    }
  }, [])

  const handleApiKeySubmit = (key) => {
    // 保存 API Key 到 localStorage
    localStorage.setItem('deepseek_api_key', key)
    setApiKey(key)
    setIsSetup(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('deepseek_api_key')
    setApiKey('')
    setIsSetup(false)
  }

  return (
    <div className="h-screen w-screen bg-white">
      {!isSetup ? (
        <ApiKeySetup onSubmit={handleApiKeySubmit} />
      ) : (
        <ChatApp apiKey={apiKey} onLogout={handleLogout} />
      )}
    </div>
  )
}

export default App
