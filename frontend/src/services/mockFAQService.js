// Mock FAQ Service
// Provides sample FAQs when backend is unavailable

export const mockFAQsData = [
    {
        id: 1,
        question: "What is AgrowCrop?",
        answer: "AgrowCrop is a smart farming platform that provides AI-powered crop recommendations, market price analysis, and farming calendars to help farmers make better decisions.",
        category: "General"
    },
    {
        id: 2,
        question: "How do I get crop recommendations?",
        answer: "Go to the Recommendations page, select your season (Kharif/Rabi/Zaid) and state. The system will analyze soil, climate, and regional data to suggest the best crops for your farm.",
        category: "General"
    },
    {
        id: 3,
        question: "Which crops should I grow in Kharif season?",
        answer: "Kharif crops include Rice, Cotton, Soybean, Maize, and Millets. These crops are sown during monsoon (June-July) and harvested in autumn (September-October).",
        category: "Crop Selection"
    },
    {
        id: 4,
        question: "Which crops are best for Rabi season?",
        answer: "Rabi crops include Wheat, Chickpea, Mustard, Peas, and Barley. These are sown in winter (November-December) and harvested in spring (March-April).",
        category: "Crop Selection"
    },
    {
        id: 5,
        question: "What is Zaid season?",
        answer: "Zaid is the summer season between Rabi and Kharif (March-June). Suitable crops include Watermelon, Cucumber, Muskmelon, and summer vegetables.",
        category: "Crop Selection"
    },
    {
        id: 6,
        question: "How much water does wheat need?",
        answer: "Wheat requires 4-6 irrigations during its growing period (120 days). Critical stages are Crown Root Initiation (20-25 days), Tillering (40-45 days), Flowering (60-65 days), and Grain filling (85-90 days).",
        category: "Irrigation"
    },
    {
        id: 7,
        question: "What is drip irrigation?",
        answer: "Drip irrigation delivers water directly to plant roots through a network of pipes and emitters. It saves 30-70% water compared to flood irrigation and is ideal for vegetables, fruits, and sugarcane.",
        category: "Irrigation"
    },
    {
        id: 8,
        question: "Which fertilizer is best for rice?",
        answer: "Rice requires NPK fertilizers in ratio 120:60:40 kg/ha. Apply 50% Nitrogen at planting, 25% at tillering stage, and 25% at panicle initiation. Add Zinc sulphate 25 kg/ha for better yields.",
        category: "Fertilizer"
    },
    {
        id: 9,
        question: "What is NPK fertilizer?",
        answer: "NPK stands for Nitrogen (N), Phosphorus (P), and Potassium (K). Nitrogen promotes leaf growth, Phosphorus supports root and flower development, and Potassium improves overall plant health.",
        category: "Fertilizer"
    },
    {
        id: 10,
        question: "How do I test my soil?",
        answer: "Collect soil samples from multiple spots in your field at 6-inch depth. Mix them and send 500g to nearest Soil Testing Laboratory. Results show pH, NPK levels, and organic matter content.",
        category: "Soil"
    },
    {
        id: 11,
        question: "What is black cotton soil?",
        answer: "Black cotton soil (Regur) is rich in clay, iron, lime, and magnesium but low in nitrogen and organic matter. It's excellent for cotton, wheat, jowar, and tobacco. Found mainly in Maharashtra, Madhya Pradesh, and Gujarat.",
        category: "Soil"
    },
    {
        id: 12,
        question: "When should I sow wheat?",
        answer: "Ideal sowing time for wheat is November 15 to December 15. Late sowing reduces yield by 1% per day after December 25. Use varieties like HD-2967, PBW-343, or DBW-17 for best results.",
        category: "Calendar"
    },
    {
        id: 13,
        question: "What is crop rotation?",
        answer: "Crop rotation means growing different crops in sequence on the same land. Example: Rice (Kharif) → Wheat (Rabi) → Mung bean (Zaid). Benefits include pest control, soil fertility, and better yields.",
        category: "Calendar"
    },
    {
        id: 14,
        question: "How are market prices calculated?",
        answer: "Our system analyzes prices from 100+ mandis across India, considers transportation costs, demand-supply trends, and government MSP to recommend the best selling location for your crop.",
        category: "Comparison"
    },
    {
        id: 15,
        question: "How accurate are the recommendations?",
        answer: "Our recommendations are based on verified agricultural research, government databases, and real farmer data. Accuracy is 85-90% for major crops. Always consult local agricultural officers for final decisions.",
        category: "Accuracy"
    }
];

export class MockFAQService {
    static async getFAQs(category = '') {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 400));

        if (!category || category === '') {
            return mockFAQsData;
        }

        return mockFAQsData.filter(faq => faq.category === category);
    }
}
