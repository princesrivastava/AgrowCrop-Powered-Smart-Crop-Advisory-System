import requests
import pandas as pd
import datetime

def get_market_prices(state: str, district: str):
    """
    Fetch mandi prices from Agmarknet portal.
    :param state: Name of the state (e.g., "Karnataka")
    :param district: Name of the district (e.g., "Dharwad")
    :return: dict with success flag and mandi price data
    """
    try:
        # Example endpoint (hidden API used by Agmarknet website)
        url = "https://agmarknet.gov.in/api/DataService/GetDailyData"
        params = {
            "state": state,
            "district": district,
            "fromDate": (datetime.datetime.now() - datetime.timedelta(days=7)).strftime("%d-%b-%Y"),
            "toDate": datetime.datetime.now().strftime("%d-%b-%Y"),
            "commodity": "",  # empty → fetch all commodities
        }

        headers = {
            "User-Agent": "Mozilla/5.0"
        }

        r = requests.get(url, params=params, headers=headers, timeout=15)
        if r.status_code != 200:
            return {"success": False, "error": f"HTTP {r.status_code}"}

        data = r.json()

        if not data or "d" not in data:
            return {"success": False, "error": "No data found"}

        # Convert JSON to pandas DataFrame
        df = pd.DataFrame(data["d"])

        # Keep latest entries only
        df = df.sort_values("Arrival_Date", ascending=False).head(20)

        prices = {}
        for _, row in df.iterrows():
            prices[row["Commodity"]] = {
                "current_price": row.get("Modal_Price", "N/A"),
                "min_price": row.get("Min_Price", "N/A"),
                "max_price": row.get("Max_Price", "N/A"),
                "unit": "₹/quintal",
                "market": row.get("Market", ""),
                "last_updated": row.get("Arrival_Date", "")
            }

        return {"success": True, "prices": prices}

    except Exception as e:
        return {"success": False, "error": str(e)}
