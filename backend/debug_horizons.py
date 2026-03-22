# debug_horizons.py
import asyncio
import httpx
from datetime import datetime, timedelta

async def debug():
    date = "2025-01-01"
    stop = "2025-01-02"
    
    params = {
        "format":     "json",
        "COMMAND":    "'399'",
        "OBJ_DATA":   "NO",
        "MAKE_EPHEM": "YES",
        "EPHEM_TYPE": "VECTORS",
        "CENTER":     "'500@0'",
        "START_TIME": f"'{date}'",
        "STOP_TIME":  f"'{stop}'",
        "STEP_SIZE":  "'1d'",
        "VEC_TABLE":  "'2'",
        "VEC_CORR":   "'NONE'",
        "OUT_UNITS":  "'AU-D'",
        "CSV_FORMAT": "'NO'",
    }

    async with httpx.AsyncClient(timeout=15.0) as client:
        r = await client.get("https://ssd.jpl.nasa.gov/api/horizons.api", params=params)
        data = r.json()
        result = data.get("result", "")
        
        print("=== FULL RAW RESULT ===")
        print(result)
        print("=== END ===")

asyncio.run(debug())
