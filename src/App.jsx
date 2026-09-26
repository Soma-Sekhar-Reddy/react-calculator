import { useState } from 'react'

const formatNumber = (value) => Number.isInteger(value) ? String(value) : String(Number(value.toFixed(10)))

function App() {
  const [firstNumber, setFirstNumber] = useState('')
  const [secondNumber, setSecondNumber] = useState('')
  const [result, setResult] = useState(null)
  const [status, setStatus] = useState('ready')
   const apiBaseUrl = import.meta.env.VITE_API_URL || ''

  const calculate = async (operation) => {
    const first = Number(firstNumber)
    const second = Number(secondNumber)
    if (firstNumber === '' || secondNumber === '' || !Number.isFinite(first) || !Number.isFinite(second)) {
      setResult('Enter two valid numbers')
      setStatus('error')
      return
    }

    setStatus('calculating')
    try {
        const response = await fetch(`${apiBaseUrl}/api/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ first, second, operation }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Calculation failed')
      setResult(formatNumber(data.result))
      setStatus('calculated')
    } catch (error) {
      setResult(error.message)
      setStatus('error')
    }
  }

  const clear = () => {
    setFirstNumber('')
    setSecondNumber('')
    setResult(null)
    setStatus('ready')
  }

  return (
    <main className="app-shell">
      <section className="calculator" aria-label="Add or subtract two numbers">
        <h1 className="calculator-title">React API Calculator</h1>
        <div className="display-panel">
          <div className="display-meta"><span>Node.js API</span><span>{status}</span></div>
          <div className="display" aria-live="polite">{result ?? '—'}</div>
        </div>
        <div className="number-fields">
          <label>First Number<input type="number" value={firstNumber} onChange={(event) => setFirstNumber(event.target.value)} placeholder="Enter first number" /></label>
          <label>Second Number<input type="number" value={secondNumber} onChange={(event) => setSecondNumber(event.target.value)} placeholder="Enter second number" /></label>
        </div>
        <div className="action-row">
          <button className="operator" disabled={status === 'calculating'} onClick={() => calculate('add')}>Add <span>+</span></button>
          <button className="equals" disabled={status === 'calculating'} onClick={() => calculate('subtract')}>Subtract <span>−</span></button>
        </div>
        <button className="clear-button" onClick={clear}>Clear inputs</button>
      </section>
    </main>
  )
}

export default App
