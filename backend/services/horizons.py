import httpx
import asyncio
from datetime import datetime, timedelta

HORIZONS_URL = "https://ssd.jpl.nasa.gov/api/horizons.api"

async def fetch_vectors(target_id: str, date: str, retries: int = 3) -> dict:
    start = datetime.strptime(date, "%Y-%m-%d")
    stop  = start + timedelta(days=1)

    params = {
        "format":      "json",
        "COMMAND":     f"'{target_id}'",
        "OBJ_DATA":    "NO",
        "MAKE_EPHEM":  "YES",
        "EPHEM_TYPE":  "VECTORS",
        "CENTER":      "'500@0'",
        "START_TIME":  f"'{date}'",
        "STOP_TIME":   f"'{stop.strftime('%Y-%m-%d')}'",
        "STEP_SIZE":   "'1d'",
        "VEC_TABLE":   "'2'",
        "VEC_CORR":    "'NONE'",
        "OUT_UNITS":   "'AU-D'",
        "CSV_FORMAT":  "'NO'",
    }

    for attempt in range(retries):
        try:
            async with httpx.AsyncClient(timeout=20.0) as client:
                response = await client.get(HORIZONS_URL, params=params)
                response.raise_for_status()
                return response.json()
        except Exception as e:
            print(f"Attempt {attempt+1} failed for {target_id}: {e}")
            if attempt < retries - 1:
                await asyncio.sleep(1.0 * (attempt + 1))

    raise Exception(f"All {retries} attempts failed for {target_id}")
