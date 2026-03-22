from fastapi import APIRouter, HTTPException, Query
from services.horizons import fetch_vectors
from utils.parser import parse_horizons_vectors, au_to_scene_units
from data.objects import ALL_OBJECTS
from datetime import date as date_type
import asyncio

router = APIRouter(prefix="/api", tags=["positions"])


def build_object_response(obj: dict, vectors: dict, date: str) -> dict:
    dist_au = (vectors["x"]**2 + vectors["y"]**2 + vectors["z"]**2) ** 0.5
    return {
        **obj,
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
            "x":    vectors["x"],
            "y":    vectors["y"],
            "z":    vectors["z"],
            "dist": dist_au,
        }
    }


@router.get("/position/{object_id}")
async def get_object_position(
    object_id: str,
    date: str = Query(default=str(date_type.today()))
):
    obj_meta = next((o for o in ALL_OBJECTS if o["id"] == object_id), {})
    raw      = await fetch_vectors(object_id, date)
    vectors  = parse_horizons_vectors(raw)

    if not vectors:
        raise HTTPException(
            status_code=404,
            detail=f"No data for {object_id} on {date}"
        )

    return build_object_response(obj_meta, vectors, date)


@router.get("/positions/all")
async def get_all_positions(
    date: str = Query(default=str(date_type.today()))
):
    results = []

    for obj in ALL_OBJECTS:
        try:
            # Small delay between each request — prevents Horizons dropping connections
            await asyncio.sleep(0.3)
            raw     = await fetch_vectors(obj["id"], date)
            vectors = parse_horizons_vectors(raw)

            if not vectors:
                print(f"SKIP {obj['name']} — parser returned None")
                continue

            dist_au = (vectors["x"]**2 + vectors["y"]**2 + vectors["z"]**2) ** 0.5
            print(f"OK   {obj['name']:20} {dist_au:.2f} AU → {au_to_scene_units(dist_au):.0f} scene units")
            results.append(build_object_response(obj, vectors, date))

        except Exception as e:
            print(f"FAIL {obj['name']:20} {e}")
            continue

    print(f"\nReturning {len(results)}/{len(ALL_OBJECTS)} objects\n")
    return results


@router.get("/objects")
async def list_objects():
    return ALL_OBJECTS
