import httpx
from datetime import datetime, timedelta

HORIZONS_URL = "https://ssd.jpl.nasa.gov/api/horizons.api"

async def fetch_vectors(target_id: str, date: str) -> dict:
    """
    Fetch X, Y, Z position vectors from NASA Horizons for a given
    object ID and date. Returns raw API response as dict.
    """
    # Horizons needs a stop date 1 day after start
    start = datetime.strptime(date, "%Y-%m-%d")
    stop  = start + timedelta(days=1)

    params = {
        "format":      "json",
        "COMMAND":     f"'{target_id}'",
        "OBJ_DATA":    "NO",
        "MAKE_EPHEM":  "YES",
        "EPHEM_TYPE":  "VECTORS",
        "CENTER":      "'500@0'",      # Solar System Barycenter
        "START_TIME":  f"'{date}'",
        "STOP_TIME":   f"'{stop.strftime('%Y-%m-%d')}'",
        "STEP_SIZE":   "'1d'",
        "VEC_TABLE":   "'2'",          # table type 2 = X,Y,Z + VX,VY,VZ
        "VEC_CORR":    "'NONE'",
        "OUT_UNITS":   "'AU-D'",       # Astronomical Units, days
        "CSV_FORMAT":  "'NO'",
    }

    async with httpx.AsyncClient(timeout=15.0) as client:
        response = await client.get(HORIZONS_URL, params=params)
        response.raise_for_status()
        return response.json()
