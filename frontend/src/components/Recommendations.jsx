import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { MockRecommendationsService } from '../services/mockRecommendationsService'
import './Recommendations.css'

const Recommendations = () => {
  const [season, setSeason] = useState('')
  const [state, setState] = useState('')
  const [regions, setRegions] = useState([])
  const [loading, setLoading] = useState(false)
  const [recommendations, setRecommendations] = useState(null)
  const [error, setError] = useState('')
  const [selectedCrop, setSelectedCrop] = useState('')
  const [lang, setLang] = useState('en')

  // Indian states list as fallback
  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ]

  const seasons = [
    { value: 'Kharif', label: 'Kharif (Monsoon: June-October)', labelHi: 'खरीफ (मानसून: जून-अक्टूबर)' },
    { value: 'Rabi', label: 'Rabi (Winter: November-March)', labelHi: 'रबी (सर्दी: नवंबर-मार्च)' },
    { value: 'Zaid', label: 'Zaid (Summer: March-June)', labelHi: 'जायद (गर्मी: मार्च-जून)' }
  ]

  useEffect(() => {
    fetchRegions()
  }, [])

  const fetchRegions = async () => {
    try {
      const response = await axios.get('/api/regions')
      if (response.data && response.data.length > 0) {
        setRegions(response.data.sort((a, b) => a.state.localeCompare(b.state)))
      } else {
        setRegions(indianStates.map(state => ({ state, _id: state })))
      }
    } catch (err) {
      console.error('Error fetching regions:', err)
      setRegions(indianStates.map(state => ({ state, _id: state })))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!season || !state) {
      setError(lang === 'hi'
        ? 'कृपया मौसम और राज्य दोनों चुनें'
        : 'Please select both season and state')
      return
    }

    setLoading(true)
    setError('')
    setRecommendations(null)

    try {
      const response = await axios.post('/api/recommendations', {
        season,
        state
      })
      setRecommendations(response.data)
      setSelectedCrop('')
    } catch (err) {
      console.error('API ERROR - Using mock data:', err)

      // Use mock data when backend unavailable
      try {
        const mockData = await MockRecommendationsService.getRecommendations(season, state)
        setRecommendations(mockData)
        setSelectedCrop('')
        setError('') // Clear error when mock works
      } catch (mockErr) {
        setError(
          lang === 'hi' ? 'सिफारिशें प्राप्त करने में विफल' : 'Failed to get recommendations'
        )
      }
    } finally {
      setLoading(false)
    }
  }

  const handleCropSelect = (cropName) => {
    setSelectedCrop(cropName)
    const element = document.getElementById(`crop-${cropName.replace(/\s+/g, '-').toLowerCase()}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const getWaterColor = (percentage) => {
    if (percentage >= 75) return '#2196F3'
    if (percentage >= 50) return '#4CAF50'
    return '#FF9800'
  }

  const getFertilizerColor = (guidance) => {
    if (!guidance) return '#9E9E9E'
    if (guidance.includes('NPK') || guidance.includes('एनपीके')) return '#8BC34A'
    if (guidance.includes('Urea') || guidance.includes('यूरिया')) return '#4CAF50'
    return '#66BB6A'
  }

  return (
    <div className="recommendations-page">
      <div className="container">
        {/* Header Card */}
        <div className="card header-card">
          <div className="header-content">
            <div className="title-with-icon">
              <span className="crop-emoji">🌾</span>
              <h1 className="page-title">
                {lang === 'hi' ? 'फसल सिफारिशें प्राप्त करें' : 'Get Crop Recommendations'}
              </h1>
            </div>
            <p className="page-subtitle">
              {lang === 'hi'
                ? 'अपने मौसम और क्षेत्र के लिए सर्वोत्तम फसलों की खोज करें'
                : 'Discover the best crops for your season and region'}
            </p>
            <button
              className="lang-toggle-btn"
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            >
              {lang === 'en' ? ' हिंदी में बदलें' : ' Switch to English'}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="recommendation-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="season">
                  <span className="label-icon">🌱</span>
                  {lang === 'hi' ? 'खेती का मौसम *' : 'Farming Season *'}
                </label>
                <div className="select-wrapper">
                  <select
                    id="season"
                    className={`select ${season ? 'selected' : ''}`}
                    value={season}
                    onChange={(e) => setSeason(e.target.value)}
                    required
                  >
                    <option value="">{lang === 'hi' ? 'मौसम चुनें' : 'Select Season'}</option>
                    {seasons.map((seasonOption) => (
                      <option key={seasonOption.value} value={seasonOption.value}>
                        {lang === 'hi' ? seasonOption.labelHi : seasonOption.label}
                      </option>
                    ))}
                  </select>
                  {season && (
                    <div className="selected-indicator">
                      <span className="selected-badge">✓ {lang === 'hi' ? 'चयनित' : 'Selected'}</span>
                      <span className="selected-value">
                        {lang === 'hi' ? seasons.find(s => s.value === season)?.labelHi : seasons.find(s => s.value === season)?.label}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="state">
                  <span className="label-icon">📍</span>
                  {lang === 'hi' ? 'राज्य/क्षेत्र *' : 'State/Region *'}
                </label>
                <div className="select-wrapper">
                  <select
                    id="state"
                    className={`select ${state ? 'selected' : ''}`}
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                  >
                    <option value="">{lang === 'hi' ? 'राज्य चुनें' : 'Select State'}</option>
                    {regions.map((region) => (
                      <option key={region._id || region.state} value={region.state || region}>
                        {region.state || region}
                      </option>
                    ))}
                  </select>
                  {state && (
                    <div className="selected-indicator">
                      <span className="selected-badge">✓ {lang === 'hi' ? 'चयनित' : 'Selected'}</span>
                      <span className="selected-value">{state}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {error && <div className="error-message">⚠️ {error}</div>}

            <button type="submit" className="btn btn-primary btn-submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span>
                  {lang === 'hi' ? 'विश्लेषण हो रहा है...' : 'Analyzing...'}
                </>
              ) : (
                <>
                  {lang === 'hi' ? '✨ सिफारिशें प्राप्त करें' : '✨ Get Recommendations'}
                </>
              )}
            </button>
          </form>
        </div>

        {/* Innovative Plant Growing Loader */}
        {loading && (
          <div className="card loading-card">
            <div className="loading-content">
              <div className="plant-loader">
                <div className="soil"></div>
                <div className="plant">
                  <div className="stem"></div>
                  <div className="leaf leaf-left"></div>
                  <div className="leaf leaf-right"></div>
                </div>
              </div>
              <h3>{lang === 'hi' ? 'फसल सिफारिशों का विश्लेषण हो रहा है...' : 'Analyzing Crop Recommendations...'}</h3>
              <p className="loading-subtext">{lang === 'hi' ? 'मिट्टी, जलवायु और मौसम का विश्लेषण' : 'Analyzing soil, climate and season data'}</p>
              <div className="progress-wrapper">
                <div className="progress-bar-loading">
                  <div className="progress-fill-animated"></div>
                </div>
                <p className="loading-percentage">
                  <span className="dots-animated"></span>
                </p>
              </div>
            </div>
          </div>
        )}

        {recommendations && !loading && (
          <div className="results">
            {/* Region Analysis Card */}
            <div className="card region-card">
              <h2 className="section-title">
                {lang === 'hi' ? '🌍 क्षेत्र विश्लेषण' : '🌍 Region Analysis'}
              </h2>
              <div className="region-info">
                <div className="info-item">
                  <span className="info-icon">📍</span>
                  <div>
                    <span className="info-label">{lang === 'hi' ? 'राज्य' : 'State'}:</span>
                    <span className="info-value">{recommendations.state}</span>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">🌡️</span>
                  <div>
                    <span className="info-label">{lang === 'hi' ? 'जलवायु' : 'Climate'}:</span>
                    <span className="info-value">{recommendations.regionData.climate}</span>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">🌧️</span>
                  <div>
                    <span className="info-label">{lang === 'hi' ? 'औसत वर्षा' : 'Avg Rainfall'}:</span>
                    <span className="info-value">{recommendations.regionData.averageRainfall} mm</span>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">🌡️</span>
                  <div>
                    <span className="info-label">{lang === 'hi' ? 'औसत तापमान' : 'Avg Temperature'}:</span>
                    <span className="info-value">{recommendations.regionData.averageTemperature}°C</span>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">🏞️</span>
                  <div>
                    <span className="info-label">{lang === 'hi' ? 'मिट्टी का प्रकार' : 'Soil Type'}:</span>
                    <span className="info-value">{recommendations.regionData.soilType?.primary || 'N/A'}</span>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">💧</span>
                  <div>
                    <span className="info-label">{lang === 'hi' ? 'जल उपलब्धता' : 'Water Availability'}:</span>
                    <span className="info-value">{recommendations.regionData.waterAvailability}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Crops */}
            <div className="card crops-card">
              <div className="recommendations-header">
                <h2 className="section-title">
                  {lang === 'hi' ? '🌾 अनुशंसित फसलें' : '🌾 Recommended Crops'}
                </h2>
                <p className="crop-count">
                  {recommendations.recommendations.length} {lang === 'hi' ? 'फसलें मिलीं' : 'crops found'}
                </p>
              </div>

              <div className="recommendations-grid">
                {recommendations.recommendations.map((rec, index) => {
                  const isSelected = selectedCrop === rec.crop.name
                  const waterColor = getWaterColor(rec.irrigationPercentage)
                  const fertilizerColor = getFertilizerColor(rec.fertilizerGuidance)

                  return (
                    <div
                      key={index}
                      id={`crop-${rec.crop.name.replace(/\s+/g, '-').toLowerCase()}`}
                      className={`recommendation-card ${isSelected ? 'selected-crop' : ''}`}
                      onClick={() => handleCropSelect(rec.crop.name)}
                    >
                      <div className="recommendation-header">
                        <div>
                          <h3>{lang === 'hi' && rec.crop.hindiName ? rec.crop.hindiName : rec.crop.name}</h3>
                          <p className="hindi-name">
                            {lang === 'hi' ? rec.crop.name : (rec.crop.hindiName && `(${rec.crop.hindiName})`)}
                          </p>
                        </div>
                        <div className="score-badge">
                          <div className="score-value">{rec.score}%</div>
                          <div className="score-label">{lang === 'hi' ? 'स्कोर' : 'Score'}</div>
                        </div>
                      </div>

                      {/* Water Requirement Visual */}
                      <div className="visual-indicator">
                        <div className="indicator-header">
                          <span className="indicator-icon">💧</span>
                          <span className="indicator-label">
                            {lang === 'hi' ? 'सिंचाई आवश्यकता' : 'Irrigation Need'}
                          </span>
                          <span className="indicator-value">{rec.irrigationPercentage}%</span>
                        </div>
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${rec.irrigationPercentage}%`,
                              background: `linear-gradient(90deg, ${waterColor}, ${waterColor}dd)`
                            }}
                          >
                            <span className="progress-shimmer"></span>
                          </div>
                        </div>
                      </div>

                      {/* Fertilizer Guidance Visual */}
                      <div className="visual-indicator">
                        <div className="indicator-header">
                          <span className="indicator-icon">🌱</span>
                          <span className="indicator-label">
                            {lang === 'hi' ? 'उर्वरक मार्गदर्शन' : 'Fertilizer Guidance'}
                          </span>
                        </div>
                        <div className="fertilizer-info" style={{ borderLeftColor: fertilizerColor }}>
                          <p>{rec.fertilizerGuidance}</p>
                        </div>
                      </div>

                      {/* Reasons */}
                      <div className="reasons">
                        <strong>{lang === 'hi' ? '✓ यह फसल क्यों:' : '✓ Why this crop:'}</strong>
                        <ul>
                          {rec.reasons.map((reason, i) => (
                            <li key={i}>{reason}</li>
                          ))}
                        </ul>
                      </div>

                      <Link
                        to={`/crop-calendar?season=${recommendations.season}&region=${recommendations.state}&best=${rec.crop.name}`}
                        className="btn btn-secondary btn-small"
                      >
                        {lang === 'hi' ? '📅 कैलेंडर देखें' : '📅 View Calendar'}
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Recommendations
