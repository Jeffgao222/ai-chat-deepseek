import { useState } from 'react'

export default function AgentList({ agents, currentAgent, onSelectAgent, onLogout }) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const handleLogout = () => {
    onLogout()
    setShowLogoutConfirm(false)
  }

  return (
    <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col h-screen border-r border-gray-700">
      {/* 头部 */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg p-2">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold">AI Chat</h1>
            <p className="text-xs text-gray-400">DeepSeek</p>
          </div>
        </div>
      </div>

      {/* Agent 列表 */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        <p className="text-xs font-semibold text-gray-400 px-2 mb-3">AI 智能体</p>
        {agents.map((agent) => (
          <button
            key={agent.id}
            onClick={() => onSelectAgent(agent.id)}
            className={`w-full text-left px-3 py-3 rounded-lg transition duration-200 group ${
              currentAgent.id === agent.id
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                : 'hover:bg-gray-700 text-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                currentAgent.id === agent.id ? 'bg-white' : 'bg-gray-500 group-hover:bg-gray-400'
              }`} />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{agent.name}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* 底部操作 */}
      <div className="border-t border-gray-700 p-3 space-y-2">
        <div className="bg-gray-700 rounded-lg p-3 text-xs">
          <p className="text-gray-300 font-medium mb-1">💡 提示</p>
          <p className="text-gray-400">选择不同的 AI 智能体，获得专业的建议和帮助。</p>
        </div>
        
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-200 text-sm font-medium flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          退出登录
        </button>
      </div>

      {/* 退出确认对话框 */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
            <h3 className="text-lg font-bold text-gray-800 mb-2">确认退出登录？</h3>
            <p className="text-gray-600 text-sm mb-6">
              退出后，您需要重新输入 API Key 才能继续使用。您的对话记录将保留在本地。
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition duration-200 font-medium"
              >
                取消
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-200 font-medium"
              >
                确认退出
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
