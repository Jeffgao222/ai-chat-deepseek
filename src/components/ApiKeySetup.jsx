import { useState } from 'react'

export default function ApiKeySetup({ onSubmit }) {
  const [apiKey, setApiKey] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!apiKey.trim()) {
      setError('请输入 DeepSeek API Key')
      return
    }
    if (!apiKey.startsWith('sk-')) {
      setError('API Key 应该以 sk- 开头')
      return
    }
    onSubmit(apiKey)
  }

  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
        {/* 头部 */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full p-3 mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            AI Chat
          </h1>
          <p className="text-gray-600 font-medium">DeepSeek 版本</p>
          <p className="text-sm text-gray-500 mt-2">支持多 AI 智能体的聊天平台</p>
        </div>

        {/* 表单 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              DeepSeek API Key
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value)
                  setError('')
                }}
                placeholder="sk-..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                    <path d="M15.171 13.576l1.414 1.414a1 1 0 00.707-.293 1 1 0 00-.707-1.707l-1.414-1.414M9.823 2.823a4 4 0 014.472 6.096l-1.414-1.414a2 2 0 00-2.239-2.239L9.823 2.823z" />
                  </svg>
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              🔒 您的 API Key 只会保存在浏览器本地，不会上传到任何服务器
            </p>
          </div>

          {/* 错误提示 */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-medium">
              ⚠️ {error}
            </div>
          )}

          {/* 提交按钮 */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
          >
            开始聊天
          </button>

          {/* 帮助链接 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-xs font-semibold text-blue-900 mb-2">📚 需要 API Key？</p>
            <ol className="text-xs text-blue-800 space-y-1 ml-4 list-decimal">
              <li>访问 <a href="https://platform.deepseek.com" target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline">DeepSeek 平台</a></li>
              <li>注册或登录账户</li>
              <li>进入 <a href="https://platform.deepseek.com/api_keys" target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline">API Keys 页面</a></li>
              <li>创建新的 API Key 并复制</li>
            </ol>
          </div>
        </form>
      </div>
    </div>
  )
}
