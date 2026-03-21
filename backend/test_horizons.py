# test_horizons.py
import asyncio
from services.horizons import fetch_vectors
from utils.parser import parse_horizons_vectors

async def test():
    print("Fetching Earth position...")
    raw = await fetch_vectors("399", "2025-01-01")
    vectors = parse_horizons_vectors(raw)
    print(f"Earth on 2025-01-01:")
    print(f"  X: {vectors['x']:.6f} AU")
    print(f"  Y: {vectors['y']:.6f} AU")
    print(f"  Z: {vectors['z']:.6f} AU")

    print("\nFetching Voyager 1...")
    raw = await fetch_vectors("-31", "2025-01-01")
    vectors = parse_horizons_vectors(raw)
    print(f"Voyager 1 on 2025-01-01:")
    print(f"  X: {vectors['x']:.6f} AU")
    print(f"  Y: {vectors['y']:.6f} AU")
    print(f"  Z: {vectors['z']:.6f} AU")

asyncio.run(test())
