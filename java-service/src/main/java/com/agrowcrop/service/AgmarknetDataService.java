package com.agrowcrop.service;

import com.agrowcrop.model.MandiPrice;
import com.agrowcrop.repository.MandiPriceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
// import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
// import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDate;
import java.util.Map;
import java.util.Random;

/**
 * Service for fetching mandi price data from Data.gov.in/Agmarknet
 * Scheduled to run daily at 6 AM
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AgmarknetDataService {

    private final MandiPriceRepository mandiPriceRepo;
    // private final WebClient.Builder webClientBuilder;

    /*
     * @Value("${agmarknet.api.url}")
     * private String apiUrl;
     * 
     * @Value("${agmarknet.api.key}")
     * private String apiKey;
     */

    /**
     * Scheduled task: Fetch mandi prices daily at 6 AM
     * Cron format: second minute hour day month weekday
     */
    @Scheduled(cron = "0 0 6 * * *")
    public void fetchMandiPrices() {
        log.info("Starting scheduled mandi price fetch at 6 AM...");

        // Comprehensive crop list including regional varieties (22 crops)
        String[] crops = { "Wheat", "Rice", "Cotton", "Soybean", "Maize", "Bajra", "Jowar", "Tur",
                "Groundnut", "Onion", "Potato", "Tomato", "Sugarcane", "Mustard", "Sunflower",
                "Moong", "Urad", "Chana", "Arhar", "Masoor", "Sesame", "Castor" };

        // All major Indian states (20 states)
        String[] states = { "Andhra Pradesh", "Bihar", "Chhattisgarh", "Gujarat", "Haryana",
                "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Odisha",
                "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh",
                "West Bengal", "Jharkhand", "Uttarakhand", "Himachal Pradesh", "Assam" };

        for (String state : states) {
            for (String crop : crops) {
                fetchAndStorePrices(state, crop);
            }
        }

        log.info("Mandi price fetch completed successfully.");
    }

    /**
     * Fetch prices for specific state and crop
     */
    private void fetchAndStorePrices(String state, String crop) {
        try {
            // For demo purposes, we'll use mock data
            // In production, replace with actual API call
            generateMockData(state, crop);

            /*
             * Production API call (uncomment when API key is available):
             * WebClient webClient = webClientBuilder.baseUrl(apiUrl).build();
             * 
             * Map<String, Object> response = webClient.get()
             * .uri(uriBuilder -> uriBuilder
             * .queryParam("api-key", apiKey)
             * .queryParam("format", "json")
             * .queryParam("filters[state]", state)
             * .queryParam("filters[commodity]", crop)
             * .queryParam("limit", "100")
             * .build())
             * .retrieve()
             * .bodyToMono(Map.class)
             * .block();
             * 
             * if (response != null && response.containsKey("records")) {
             * List<Map<String, Object>> records = (List<Map<String, Object>>)
             * response.get("records");
             * 
             * records.forEach(record -> {
             * MandiPrice price = new MandiPrice();
             * price.setMandiName((String) record.get("market"));
             * price.setCrop((String) record.get("commodity"));
             * price.setPricePerQuintal(parsePrice(record.get("modal_price")));
             * price.setDate(LocalDate.now());
             * price.setState((String) record.get("state"));
             * price.setDistrict((String) record.get("district"));
             * 
             * mandiPriceRepo.save(price);
             * });
             * 
             * log.info("Saved {} price records for {} in {}", records.size(), crop, state);
             * }
             */
        } catch (Exception e) {
            log.error("Error fetching prices for {} in {}: {}", crop, state, e.getMessage());
        }
    }

    private void generateMockData(String state, String crop) {
        Random random = new Random();

        // Comprehensive district mapping for all 20 states
        Map<String, String[]> stateDistricts = Map.ofEntries(
                Map.entry("Madhya Pradesh",
                        new String[] { "Indore", "Ujjain", "Dewas", "Bhopal", "Gwalior", "Itarsi" }),
                Map.entry("Maharashtra", new String[] { "Mumbai", "Pune", "Nagpur", "Nashik", "Solapur" }),
                Map.entry("Punjab", new String[] { "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda" }),
                Map.entry("Haryana", new String[] { "Faridabad", "Gurgaon", "Panipat", "Hisar", "Karnal" }),
                Map.entry("Uttar Pradesh", new String[] { "Lucknow", "Kanpur", "Agra", "Meerut", "Varanasi" }),
                Map.entry("Rajasthan", new String[] { "Jaipur", "Jodhpur", "Kota", "Udaipur", "Ajmer" }),
                Map.entry("Gujarat", new String[] { "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar" }),
                Map.entry("Andhra Pradesh",
                        new String[] { "Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool" }),
                Map.entry("Bihar", new String[] { "Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga" }),
                Map.entry("Chhattisgarh", new String[] { "Raipur", "Bhilai", "Bilaspur", "Korba", "Durg" }),
                Map.entry("Karnataka", new String[] { "Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum" }),
                Map.entry("Kerala", new String[] { "Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam" }),
                Map.entry("Odisha", new String[] { "Bhubaneswar", "Cuttack", "Rourkela", "Puri", "Sambalpur" }),
                Map.entry("Tamil Nadu",
                        new String[] { "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem" }),
                Map.entry("Telangana", new String[] { "Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam" }),
                Map.entry("West Bengal", new String[] { "Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri" }),
                Map.entry("Jharkhand", new String[] { "Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh" }),
                Map.entry("Uttarakhand", new String[] { "Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur" }),
                Map.entry("Himachal Pradesh", new String[] { "Shimla", "Dharamshala", "Kullu", "Mandi", "Solan" }),
                Map.entry("Assam", new String[] { "Guwahati", "Dibrugarh", "Jorhat", "Silchar", "Tezpur" }));

        String[] districts = stateDistricts.getOrDefault(state,
                new String[] { "District 1", "District 2", "District 3" });

        // Comprehensive base prices for all 22 crops (in rupees per quintal)
        Map<String, Integer> basePrices = Map.ofEntries(
                Map.entry("Wheat", 2100),
                Map.entry("Rice", 2800),
                Map.entry("Cotton", 6500),
                Map.entry("Soybean", 4200),
                Map.entry("Maize", 1800),
                Map.entry("Bajra", 1900),
                Map.entry("Jowar", 2200),
                Map.entry("Tur", 6000),
                Map.entry("Groundnut", 5500),
                Map.entry("Onion", 1200),
                Map.entry("Potato", 800),
                Map.entry("Tomato", 1500),
                Map.entry("Sugarcane", 3200),
                Map.entry("Mustard", 5200),
                Map.entry("Sunflower", 6000),
                Map.entry("Moong", 7000),
                Map.entry("Urad", 6500),
                Map.entry("Chana", 5000),
                Map.entry("Arhar", 6200),
                Map.entry("Masoor", 5500),
                Map.entry("Sesame", 8000),
                Map.entry("Castor", 5800));

        int basePrice = basePrices.getOrDefault(crop, 2000);

        for (String district : districts) {
            MandiPrice price = new MandiPrice();
            price.setMandiName(district + " Mandi");
            price.setCrop(crop);
            price.setPricePerQuintal(basePrice + random.nextInt(400) - 200); // ±200 variation
            price.setDate(LocalDate.now());
            price.setState(state);
            price.setDistrict(district);

            mandiPriceRepo.save(price);
        }

        log.info("Generated mock data for {} in {}", crop, state);
    }

    /**
     * Parse price from API response (handles various formats)
     */
    @SuppressWarnings("unused")
    private Integer parsePrice(Object priceObj) {
        if (priceObj == null)
            return 0;
        String priceStr = priceObj.toString().replaceAll("[^0-9]", "");
        return priceStr.isEmpty() ? 0 : Integer.parseInt(priceStr);
    }

    /**
     * Manual trigger for testing (can be called via controller)
     */
    public void fetchNow() {
        log.info("Manual fetch triggered");
        fetchMandiPrices();
    }
}
