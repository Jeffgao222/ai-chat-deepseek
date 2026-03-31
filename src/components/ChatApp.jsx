import { useState, useEffect } from 'react'
import { AGENTS, getAgentById } from '../config/agents'
import AgentList from './AgentList'
import ChatWindow from './ChatWindow'

export default function ChatApp({ apiKey, onLogout }) {
  const [currentAgent, setCurrentAgent] = useState(AGENTS[0])
  const [conversations, setConversations] = useState({})
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 初始化对话历史
  useEffect(() => {
    const saved = localStorage.getItem('conversations')
    if (saved) {
      try {
        setConversations(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load conversations:', e)
      }
    }
    
    // 加载当前 Agent 的对话
    loadAgentConversation(AGENTS[0].id)
  }, [])

  // 保存对话到 localStorage
  useEffect(() => {
    localStorage.setItem('conversations', JSON.stringify(conversations))
  }, [conversations])

  const loadAgentConversation = (agentId) => {
    const agent = getAgentById(agentId)
    setCurrentAgent(agent)
    setMessages(conversations[agentId] || [])
    setError('')
  }

  const handleSendMessage = async (content) => {
    if (!content.trim()) return

    // 添加用户消息
    const userMessage = {
      role: 'user',
      content: content
    }
    
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setLoading(true)
    setError('')

    try {
      // 构建消息数组，包含系统 prompt
      const messagesForApi = [
        {
          role: 'system',
          content: currentAgent.prompt
        },
        ...newMessages
      ]

      // 调用 DeepSeek API
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: messagesForApi,
          temperature: 0.7,
          max_tokens: 2000
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        const errorMessage = errorData.error?.message || '请求失败'
        
        if (response.status === 401) {
          throw new Error('API Key 无效或已过期')
        } else if (response.status === 429) {
          throw new Error('请求过于频繁，请稍后再试')
        } else if (response.status === 500) {
          throw new Error('DeepSeek 服务暂时不可用')
        } else {
          throw new Error(errorMessage)
        }
      }

      const data = await response.json()
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('无效的 API 响应')
      }

      const assistantMessage = {
        role: 'assistant',
        content: data.choices[0].message.content
      }

      const updatedMessages = [...newMessages, assistantMessage]
      setMessages(updatedMessages)

      // 保存对话
      setConversations({
        ...conversations,
        [currentAgent.id]: updatedMessages
      })
    } catch (err) {
      console.error('API Error:', err)
      const errorMsg = err.message || '发生未知错误'
      setError(errorMsg)
      
      // 添加错误消息到聊天
      const errorMessage = {
        role: 'assistant',
        content: `❌ ${errorMsg}`
      }
      setMessages([...newMessages, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleClearConversation = () => {
    setMessages([])
    setConversations({
      ...conversations,
      [currentAgent.id]: []
    })
    setError('')
  }

  return (
    <div className="flex h-screen bg-white">
      {/* 左侧 Agent 列表 */}
      <AgentList
        agents={AGENTS}
        currentAgent={currentAgent}
        onSelectAgent={loadAgentConversation}
        onLogout={onLogout}
      />

      {/* 右侧聊天窗口 */}
      <ChatWindow
        agent={currentAgent}
        messages={messages}
        loading={loading}
        error={error}
        onSendMessage={handleSendMessage}
        onClearConversation={handleClearConversation}
      />
    </div>
  )
}
