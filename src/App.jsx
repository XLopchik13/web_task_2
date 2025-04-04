import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [countries, setCountries] = useState([])
  const [selected, setSelected] = useState(null)
  const [detail, setDetail] = useState(null)

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(res => res.json())
      .then(data => setCountries(data.sort((a, b) => a.name.common.localeCompare(b.name.common))))
  }, [])

  useEffect(() => {
    if (selected) {
      fetch(`https://restcountries.com/v3.1/alpha/${selected}`)
        .then(res => res.json())
        .then(data => setDetail(data[0]))
    }
  }, [selected])

  return (
    <div className="container">
      <h1>🌍 Countries of the World</h1>
      <div className="layout">
        <ul className="list">
          {countries.map(c => (
            <li key={c.cca3}>
              <button onClick={() => setSelected(c.cca3)}>
                {c.name.common}
              </button>
            </li>
          ))}
        </ul>

        {detail && (
          <div className="detail">
            <h2>{detail.name.common}</h2>
            <p><strong>Capital:</strong> {detail.capital?.[0]}</p>
            <p><strong>Region:</strong> {detail.region}</p>
            <p><strong>Population:</strong> {detail.population.toLocaleString()}</p>
            <img src={detail.flags.png} alt="Flag" width="150" />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
