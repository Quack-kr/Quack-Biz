export const UnPredictableErrorFallback = () => (
  <div
    style={{
      padding: '2rem',
      textAlign: 'center',
      backgroundColor: '#fee2e2',
      color: '#dc2626'
    }}
  >
    <h1>앗! 뭔가 잘못되었네요 😅</h1>
    <button onClick={() => window.location.reload()}>새로고침</button>
  </div>
)
