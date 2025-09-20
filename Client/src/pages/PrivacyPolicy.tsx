import ReactMarkdown from 'react-markdown'
import privacyPolicy from '../docs/privacy-policy.md?raw'

const PrivacyPolicy = () => {
  return (
    <div className='mx-auto max-w-screen-lg px-[10px] whitespace-pre-wrap text-white'>
      <div
        style={{
          lineHeight: '1',
        }}
      >
        <ReactMarkdown
          components={{
            ol: ({ children }) => (
              <ol
                style={{
                  listStyleType: 'decimal',
                  paddingLeft: '1.5rem',
                  marginBottom: '1rem',
                }}
              >
                {children}
              </ol>
            ),
            ul: ({ children }) => (
              <ul
                style={{
                  listStyleType: 'disc',
                  paddingLeft: '1.5rem',
                  marginBottom: '1rem',
                }}
              >
                {children}
              </ul>
            ),
          }}
        >
          {privacyPolicy}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default PrivacyPolicy
