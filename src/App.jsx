import { useState } from 'react'

const formatNumber = (value) => Number.isInteger(value) ? String(value) : String(Number(value.toFixed(10)))

function App() {
  const [firstNumber, setFirstNumber] = useState('')
  const [secondNumber, setSecondNumber] = useState('')
  const [result, setResult] = useState(null)

  const calculate = (operation) => {
    const first = Number(firstNumber)
    const second = Number(secondNumber)
    if (firstNumber === '' || secondNumber === '' || !Number.isFinite(first) || !Number.isFinite(second)) {
      setResult('Enter two valid numbers')
      return
    }
    const value = operation === 'add' ? first + second : first - second
    const symbol = operation === 'add' ? '+' : '−'
    const calculation = { expression: `${firstNumber} ${symbol} ${secondNumber}`, result: formatNumber(value) }
    setResult(calculation.result)
  }

  const clear = () => {
    setFirstNumber('')
    setSecondNumber('')
    setResult(null)
  }

  return (
    <main className="app-shell">
      <section className="calculator" aria-label="Add or subtract two numbers">
        <div className="display-panel">
          <div className="display-meta"><span>two number mode</span><span>{result === null ? 'ready' : 'calculated'}</span></div>
          <div className="display" aria-live="polite">{result ?? '—'}</div>
        </div>
        <div className="number-fields">
          <label>First number<input type="number" value={firstNumber} onChange={(event) => setFirstNumber(event.target.value)} placeholder="0" /></label>
          <label>Second number<input type="number" value={secondNumber} onChange={(event) => setSecondNumber(event.target.value)} placeholder="0" /></label>
        </div>
        <div className="action-row">
          <button className="operator" onClick={() => calculate('add')}>Add <span>+</span></button>
          <button className="equals" onClick={() => calculate('subtract')}>Subtract <span>−</span></button>
        </div>
        <button className="clear-button" onClick={clear}>Clear inputs</button>
      </section>
    </main>
  )
}

export default App
