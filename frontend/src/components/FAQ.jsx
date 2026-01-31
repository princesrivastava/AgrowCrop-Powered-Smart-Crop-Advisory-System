import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { MockFAQService } from '../services/mockFAQService'
import './FAQ.css'

const FAQ = () => {
  const [faqs, setFaqs] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [expandedId, setExpandedId] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFAQs()
  }, [selectedCategory])

  const fetchFAQs = async () => {
    try {
      const url = selectedCategory
        ? `/api/faqs?category=${selectedCategory}`
        : '/api/faqs'
      console.log('Fetching FAQs from:', url)
      const response = await axios.get(url)
      console.log('FAQ Response:', response.data)
      console.log('FAQ Count:', response.data.length)
      setFaqs(response.data)
    } catch (err) {
      console.error('Error fetching FAQs - using mock data:', err)

      // Use mock data when backend unavailable
      try {
        const mockData = await MockFAQService.getFAQs(selectedCategory)
        setFaqs(mockData)
      } catch (mockErr) {
        console.error('Mock FAQ error:', mockErr)
        setFaqs([])
      }
    } finally {
      setLoading(false)
    }
  }

  const categories = ['General', 'Crop Selection', 'Irrigation', 'Fertilizer', 'Soil', 'Calendar', 'Comparison', 'Accuracy']

  const toggleFAQ = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  if (loading) {
    return <div className="loading">Loading FAQs...</div>
  }

  return (
    <div className="faq-page">
      <div className="container">
        <div className="card" style={{ backgroundColor: "#395835ff" }}>
          <h1 className="page-title" >Frequently Asked Questions</h1>
          <p className="page-subtitle" style={{ color: "green" }}>
            Find answers to common questions about AgrowCrop and farming
          </p>

          <div className="category-filter">
            <button
              className={`filter-btn ${selectedCategory === '' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('')}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="faq-list">
          {faqs.map(faq => (
            <div key={faq.id} className="faq-item">
              <div
                className="faq-question"
                onClick={() => toggleFAQ(faq.id)}
              >
                <span className="faq-icon">{expandedId === faq.id ? '−' : '+'}</span>
                <span className="faq-text">{faq.question}</span>
                <span className="faq-category">{faq.category}</span>
              </div>
              {expandedId === faq.id && (
                <div className="faq-answer">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {faqs.length === 0 && (
          <div className="card">
            <p className="no-results">No FAQs found for the selected category.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default FAQ


