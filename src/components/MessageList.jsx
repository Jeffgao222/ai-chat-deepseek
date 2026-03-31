export default function MessageList({ messages }) {
  const formatMessage = (content) => {
    // 处理代码块
    const codeBlockRegex = /```[\s\S]*?```/g
    const parts = []
    let lastIndex = 0

    const matches = [...content.matchAll(codeBlockRegex)]
    
    matches.forEach((match) => {
      // 添加代码块前的文本
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: content.substring(lastIndex, match.index)
        })
      }
      // 添加代码块
      parts.push({
        type: 'code',
        content: match[0]
      })
      lastIndex = match.index + match[0].length
    })

    // 添加剩余文本
    if (lastIndex < content.length) {
      parts.push({
        type: 'text',
        content: content.substring(lastIndex)
      })
    }

    return parts.length > 0 ? parts : [{ type: 'text', content }]
  }

  return (
    <div className="p-4 space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-2xl px-4 py-3 rounded-lg ${
              message.role === 'user'
                ? 'bg-blue-600 text-white rounded-br-none'
                : 'bg-gray-100 text-gray-800 rounded-bl-none'
            }`}
          >
            {message.role === 'assistant' && message.content.startsWith('❌') ? (
              <p className="text-sm text-red-600 font-medium">
                {message.content}
              </p>
            ) : (
              <div className="text-sm whitespace-pre-wrap break-words">
                {formatMessage(message.content).map((part, partIndex) => (
                  part.type === 'code' ? (
                    <pre
                      key={partIndex}
                      className={`my-2 p-3 rounded overflow-x-auto ${
                        message.role === 'user'
                          ? 'bg-blue-700 text-white'
                          : 'bg-gray-800 text-gray-100'
                      }`}
                    >
                      <code>{part.content}</code>
                    </pre>
                  ) : (
                    <span key={partIndex}>{part.content}</span>
                  )
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
