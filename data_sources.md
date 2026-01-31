# Data Sources: Crop and Weather Data

AgroCrop uses a combination of scheduled tasks and mock data (for development) to provide real-time agricultural insights.

## 1. Mandi Prices (Agmarknet)

Mandi price data is fetched from the **Data.gov.in (Agmarknet) API**.

- **Service**: `AgmarknetDataService.java`
- **Schedule**: Daily at 6:00 AM (`@Scheduled(cron = "0 0 6 * * *")`).
- **Data Points**:
  - `state`
  - `district`
  - `market` (Mandi Name)
  - `commodity` (Crop)
  - `modal_price` (Price per quintal)
- **Current Status**: In development, it uses a `generateMockData` method to populate the `mandi_prices` collection in MongoDB for common Indian states and crops.

## 2. Weather Data

Weather data is fetched on the frontend via the **OpenWeatherMap API** or similar weather services.

- **Mechanism**: The frontend sends the user's location (detected or selected) to a weather service.
- **Data Points**:
  - Temperature
  - Humidity
  - Wind speed
  - Weather conditions (sunny, rainy, etc.)
- **Integration**: Used to display the weather widget and potentially as input for crop recommendations in the future.

## 3. Crop Recommendations

The recommendation engine uses historical data and manual mapping of crops to regions.

- **Service**: `CropRecommendationService.java`
- **Input**: `region`, `season`, `soil_type`.
- **Logic**: Matches the input criteria against a database of `CropData` to find the most suitable crops for a given area.
