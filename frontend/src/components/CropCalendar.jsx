import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { MockCropCalendarService } from '../services/mockCropCalendarService'
import './CropCalendar.css'

const CropCalendar = () => {
  const [lang, setLang] = useState('en')
  const [crops, setCrops] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const selectedSeason = searchParams.get('season')
  const selectedRegion = searchParams.get('region')
  const bestCrop = searchParams.get('best')

  useEffect(() => {
    const browserLang = navigator.language || navigator.userLanguage
    if (browserLang.startsWith('hi')) {
      setLang('hi')
    }
  }, [])

  useEffect(() => {
    fetchCrops()
  }, [selectedSeason])

  const fetchCrops = async () => {
    try {
      setLoading(true)
      let response

      if (selectedSeason) {
        response = await axios.get(`/api/crops/season/${selectedSeason}`)
      } else {
        response = await axios.get('/api/crops')
      }

      setCrops(response.data || [])
      setError('')
    } catch (err) {
      console.error('Error fetching crops - using mock data:', err)

      // Use mock data when backend unavailable
      try {
        let mockData
        if (selectedSeason) {
          mockData = await MockCropCalendarService.getCropsBySeason(selectedSeason)
        } else {
          mockData = await MockCropCalendarService.getAllCrops()
        }
        setCrops(mockData)
        setError('') // Clear error when mock works
      } catch (mockErr) {
        setError(lang === 'hi' ? 'फसल लोड करने में विफल' : 'Failed to load crops')
        setCrops([])
      }
    } finally {
      setLoading(false)
    }
  }

  const filteredCrops = crops.filter((crop) => {
    const matchesSeason = !selectedSeason ||
      crop.season === selectedSeason ||
      crop.season === 'All'

    const matchesRegion = !selectedRegion ||
      (crop.suitableStates && crop.suitableStates.some(state =>
        state.toLowerCase().includes(selectedRegion.toLowerCase()) ||
        selectedRegion.toLowerCase().includes(state.toLowerCase())
      ))

    return matchesSeason && matchesRegion
  })

  const getSeasonName = (season, language) => {
    const seasonMap = {
      'Kharif': { en: 'Kharif', hi: 'खरीफ' },
      'Rabi': { en: 'Rabi', hi: 'रबी' },
      'Zaid': { en: 'Zaid', hi: 'जायद' },
      'All': { en: 'All Seasons', hi: 'सभी मौसम' }
    }
    return seasonMap[season]?.[language] || season
  }

  const getWaterColor = (percentage) => {
    if (percentage >= 75) return '#2196F3'
    if (percentage >= 50) return '#4CAF50'
    return '#FF9800'
  }

  if (loading) {
    return (
      <div className="calendar-page">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>{lang === 'hi' ? 'फसलें लोड हो रही हैं...' : 'Loading crops...'}</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="calendar-page">
        <div className="container">
          <div className="error-message">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="calendar-page">
      <div className="container">
        {/* Header Section */}
        <div className="card calendar-header">
          <div className="header-top">
            <h1 className="page-title">
              {lang === 'hi' ? '📅 फसल कैलेंडर' : '📅 Crop Calendar'}
            </h1>
            <button
              className="lang-toggle-btn"
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              title={lang === 'en' ? 'Switch to Hindi' : 'Switch to English'}
            >
              {lang === 'en' ? '🔄 हिंदी' : '🔄 English'}
            </button>
          </div>

          {/* Filter Info */}
          {(selectedSeason || selectedRegion) && (
            <div className="filter-info">
              {selectedSeason && (
                <span className="filter-badge season-badge">
                  🌱 {lang === 'hi' ? 'मौसम' : 'Season'}: {getSeasonName(selectedSeason, lang)}
                </span>
              )}
              {selectedRegion && (
                <span className="filter-badge region-badge">
                  📍 {lang === 'hi' ? 'क्षेत्र' : 'Region'}: {selectedRegion}
                </span>
              )}
              {bestCrop && (
                <span className="filter-badge best-badge">
                  ⭐ {lang === 'hi' ? 'सर्वोत्तम फसल' : 'Best Crop'}: {bestCrop}
                </span>
              )}
            </div>
          )}

          {!selectedSeason && !selectedRegion && (
            <p className="page-subtitle">
              {lang === 'hi'
                ? 'अपने मौसम और क्षेत्र के लिए उपयुक्त फसलें देखें'
                : 'View suitable crops for your season and region'}
            </p>
          )}
        </div>

        {/* Crop List */}
        {filteredCrops.length > 0 ? (
          <div className="crop-list">
            {filteredCrops.map((crop, index) => {
              const isBestCrop = bestCrop && (
                crop.name.toLowerCase() === bestCrop.toLowerCase() ||
                (crop.hindiName && crop.hindiName.toLowerCase().includes(bestCrop.toLowerCase()))
              )
              const waterColor = getWaterColor(crop.irrigationPercentage || 50)

              return (
                <div
                  key={crop._id || index}
                  className={`crop-card ${isBestCrop ? 'highlight-crop' : ''}`}
                >
                  {isBestCrop && (
                    <div className="best-ribbon">
                      ⭐ {lang === 'hi' ? 'सर्वोत्तम फसल' : 'Best Crop'}
                    </div>
                  )}

                  <div className="crop-header">
                    <div className="crop-title">
                      <h2 className="crop-name">
                        {lang === 'hi' && crop.hindiName ? crop.hindiName : crop.name}
                      </h2>
                      <p className="crop-name-alt">
                        {lang === 'hi' ? crop.name : (crop.hindiName && `(${crop.hindiName})`)}
                      </p>
                    </div>
                    <div className="season-badge">
                      {getSeasonName(crop.season, lang)}
                    </div>
                  </div>

                  <div className="crop-details">
                    {/* States */}
                    {crop.suitableStates && crop.suitableStates.length > 0 && (
                      <div className="detail-item">
                        <span className="detail-icon">📍</span>
                        <div className="detail-content">
                          <span className="detail-label">
                            {lang === 'hi' ? 'उपयुक्त राज्य' : 'Suitable States'}:
                          </span>
                          <span className="detail-value">
                            {crop.suitableStates.join(', ')}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Soil */}
                    {crop.soilTypes && crop.soilTypes.length > 0 && (
                      <div className="detail-item">
                        <span className="detail-icon">🏞️</span>
                        <div className="detail-content">
                          <span className="detail-label">
                            {lang === 'hi' ? 'मिट्टी' : 'Soil'}:
                          </span>
                          <span className="detail-value">
                            {crop.soilTypes.join(', ')}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Water Requirement Visual */}
                    {crop.irrigationPercentage && (
                      <div className="visual-indicator">
                        <div className="indicator-header">
                          <span className="detail-icon">💧</span>
                          <span className="indicator-label">
                            {lang === 'hi' ? 'सिंचाई आवश्यकता' : 'Irrigation Need'}
                          </span>
                          <span className="indicator-value">{crop.irrigationPercentage}%</span>
                        </div>
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${crop.irrigationPercentage}%`,
                              background: `linear-gradient(90deg, ${waterColor}, ${waterColor}dd)`
                            }}
                          >
                            <span className="progress-shimmer"></span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Fertilizer Guidance */}
                    {crop.fertilizerGuidance && (
                      <div className="visual-indicator">
                        <div className="indicator-header">
                          <span className="detail-icon">🌱</span>
                          <span className="indicator-label">
                            {lang === 'hi' ? 'उर्वरक मार्गदर्शन' : 'Fertilizer Guidance'}
                          </span>
                        </div>
                        <div className="fertilizer-info">
                          <p>{crop.fertilizerGuidance}</p>
                        </div>
                      </div>
                    )}

                    {/* Duration */}
                    {crop.duration && (
                      <div className="detail-item">
                        <span className="detail-icon">⏱️</span>
                        <div className="detail-content">
                          <span className="detail-label">
                            {lang === 'hi' ? 'अवधि' : 'Duration'}:
                          </span>
                          <span className="detail-value">
                            {crop.duration} {lang === 'hi' ? 'दिन' : 'days'}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Sowing Months */}
                    {crop.sowingMonths && crop.sowingMonths.length > 0 && (
                      <div className="detail-item">
                        <span className="detail-icon">🌾</span>
                        <div className="detail-content">
                          <span className="detail-label">
                            {lang === 'hi' ? 'बुवाई के महीने' : 'Sowing Months'}:
                          </span>
                          <span className="detail-value">
                            {crop.sowingMonths.join(', ')}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Harvesting Months */}
                    {crop.harvestingMonths && crop.harvestingMonths.length > 0 && (
                      <div className="detail-item">
                        <span className="detail-icon">🚜</span>
                        <div className="detail-content">
                          <span className="detail-label">
                            {lang === 'hi' ? 'कटाई के महीने' : 'Harvesting Months'}:
                          </span>
                          <span className="detail-value">
                            {crop.harvestingMonths.join(', ')}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Yield */}
                    {crop.yield && (
                      <div className="detail-item">
                        <span className="detail-icon">📊</span>
                        <div className="detail-content">
                          <span className="detail-label">
                            {lang === 'hi' ? 'उपज' : 'Expected Yield'}:
                          </span>
                          <span className="detail-value">{crop.yield}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {crop.description && (
                    <div className="crop-description">
                      <p>{crop.description}</p>
                    </div>
                  )}

                  <div className="crop-actions">
                    <button
                      className="btn btn-primary btn-small"
                      onClick={() => navigate(`/recommendations`)}
                    >
                      {lang === 'hi' ? '🔍 सिफारिशें प्राप्त करें' : '🔍 Get Recommendations'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="card">
            <div className="no-crops-message">
              <div className="empty-icon">🌾</div>
              <p>
                {lang === 'hi'
                  ? 'चयनित मानदंडों के लिए कोई फसल नहीं मिली।'
                  : 'No crops found for the selected criteria.'}
              </p>
              <button
                className="btn btn-secondary"
                onClick={() => navigate('/recommendations')}
              >
                {lang === 'hi' ? 'नई खोज करें' : 'Search Again'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CropCalendar
