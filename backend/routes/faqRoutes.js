const express = require('express');
const router = express.Router();

// FAQ data
const faqs = [
  {
    id: 1,
    question: 'क्या AgrowCrop मुफ्त है?',
    answer: 'हाँ, AgrowCrop पूरी तरह से मुफ्त है। हमारा लक्ष्य भारतीय किसानों को बेहतर फसल योजना में मदद करना है।',
    category: 'General'
  },
  {
    id: 2,
    question: 'मैं अपने क्षेत्र के लिए सबसे अच्छी फसल कैसे चुनूं?',
    answer: 'बस अपना राज्य और मौसम (खरीफ/रबी/जायद) चुनें। AgrowCrop आपके क्षेत्र की मिट्टी, जलवायु, और वर्षा के आधार पर सर्वोत्तम फसल सुझाव देगा।',
    category: 'Crop Selection'
  },
  {
    id: 3,
    question: 'सिंचाई प्रतिशत का क्या मतलब है?',
    answer: 'सिंचाई प्रतिशत आपकी फसल की पानी की आवश्यकता को दर्शाता है। उच्च प्रतिशत का मतलब है कि फसल को अधिक पानी की आवश्यकता है।',
    category: 'Irrigation'
  },
  {
    id: 4,
    question: 'खाद (Fertilizer) कब और कैसे डालें?',
    answer: 'फसल कैलेंडर में आपको महीने-वार खाद डालने का समय मिलेगा। सामान्यतः बुवाई के समय आधार खाद और वृद्धि के दौरान टॉप ड्रेसिंग दी जाती है।',
    category: 'Fertilizer'
  },
  {
    id: 5,
    question: 'मिट्टी का pH क्यों महत्वपूर्ण है?',
    answer: 'मिट्टी का pH फसल की पोषक तत्वों को अवशोषित करने की क्षमता को प्रभावित करता है। अधिकांश फसलें 6.0-7.5 pH रेंज में अच्छी तरह से बढ़ती हैं।',
    category: 'Soil'
  },
  {
    id: 6,
    question: 'फसल कैलेंडर कैसे काम करता है?',
    answer: 'फसल कैलेंडर आपको महीने-वार बुवाई, वृद्धि, सिंचाई, और कटाई की जानकारी देता है, जिससे आप अपनी गतिविधियों की योजना बना सकते हैं।',
    category: 'Calendar'
  },
  {
    id: 7,
    question: 'क्या मैं कई फसलों की तुलना कर सकता हूं?',
    answer: 'हाँ, आप विभिन्न फसलों की सिफारिशें देख सकते हैं और उनकी आवश्यकताओं, उपज, और लाभप्रदता की तुलना कर सकते हैं।',
    category: 'Comparison'
  },
  {
    id: 8,
    question: 'AgrowCrop की सिफारिशें कितनी सटीक हैं?',
    answer: 'हमारी सिफारिशें क्षेत्रीय जलवायु, मिट्टी के डेटा, ऐतिहासिक फसल प्रदर्शन, और वैज्ञानिक अनुसंधान पर आधारित हैं। हालाँकि, स्थानीय सलाह के लिए कृषि विशेषज्ञ से भी परामर्श करें।',
    category: 'Accuracy'
  }
];

// Get all FAQs
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let filteredFaqs = faqs;
    
    if (category) {
      filteredFaqs = faqs.filter(faq => 
        faq.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    res.json(filteredFaqs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get FAQ by ID
router.get('/:id', async (req, res) => {
  try {
    const faq = faqs.find(f => f.id === parseInt(req.params.id));
    if (!faq) {
      return res.status(404).json({ error: 'FAQ not found' });
    }
    res.json(faq);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;


