from fastapi import APIRouter, HTTPException, Query
from services.horizons import fetch_vectors
from utils.parser import parse_horizons_vectors, au_to_scene_units
from data.objects import ALL_OBJECTS
from datetime import date as date_type

router = APIRouter(prefix="/api", tags=["positions"])


@router.get("/position/{object_id}")
async def get_object_position(
    object_id: str,
    date: str = Query(default=str(date_type.today()))
):
    """Get 3D position of a single object by its Horizons ID."""
    raw = await fetch_vectors(object_id, date)
    vectors = parse_horizons_vectors(raw)

    if not vectors:
        raise HTTPException(status_code=404, detail=f"No data for object {object_id} on {date}")

    return {
        "id":   object_id,
        "date": date,
        "position": {
            "x": au_to_scene_units(vectors["x"]),
            "y": au_to_scene_units(vectors["y"]),
            "z": au_to_scene_units(vectors["z"]),
        },
        "velocity": {
            "vx": vectors["vx"],
            "vy": vectors["vy"],
            "vz": vectors["vz"],
        },
        "raw_au": {
            "x": vectors["x"],
            "y": vectors["y"],
            "z": vectors["z"],
        }
    }


@router.get("/positions/all")
async def get_all_positions(
    date: str = Query(default=str(date_type.today()))
):
    """Fetch positions for all tracked objects in one call."""
    import asyncio

    async def fetch_one(obj):
        try:
            raw = await fetch_vectors(obj["id"], date)
            vectors = parse_horizons_vectors(raw)
            if not vectors:
                return None
            return {
                **obj,
                "date": date,
                "position": {
                    "x": au_to_scene_units(vectors["x"]),
                    "y": au_to_scene_units(vectors["y"]),
                    "z": au_to_scene_units(vectors["z"]),
                },
                "velocity": vectors,
            }
        except Exception:
            return None

    results = await asyncio.gather(*[fetch_one(obj) for obj in ALL_OBJECTS])
    return [r for r in results if r is not None]


@router.get("/objects")
async def list_objects():
    """Return the full catalog of tracked objects."""
    return ALL_OBJECTS
