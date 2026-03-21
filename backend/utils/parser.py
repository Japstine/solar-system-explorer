import re

def parse_horizons_vectors(raw: dict) -> dict | None:
    """
    Extract X, Y, Z position and VX, VY, VZ velocity from
    a Horizons VECTORS response. Returns values in AU and AU/day.
    """
    result = raw.get("result", "")

    # The data block sits between $$SOE and $$EOE markers
    match = re.search(r"\$\$SOE(.*?)\$\$EOE", result, re.DOTALL)
    if not match:
        return None

    block = match.group(1).strip()
    lines = [l.strip() for l in block.split("\n") if l.strip()]

    # Horizons vector table format:
    # Line 0: JDTDB, CalDate, ...
    # Line 1: X= ...  Y= ...  Z= ...
    # Line 2: VX= ... VY= ... VZ= ...

    try:
        xy_line = next(l for l in lines if "X =" in l or "X=" in l)
        vz_line = next(l for l in lines if "VX=" in l or "VX =" in l)

        def extract(line, key):
            pattern = rf"{key}\s*=\s*([-+]?\d+\.\d+E[+-]\d+)"
            m = re.search(pattern, line)
            return float(m.group(1)) if m else 0.0

        return {
            "x":  extract(xy_line, "X"),
            "y":  extract(xy_line, "Y"),
            "z":  extract(xy_line, "Z"),
            "vx": extract(vz_line, "VX"),
            "vy": extract(vz_line, "VY"),
            "vz": extract(vz_line, "VZ"),
        }
    except Exception:
        return None


def au_to_scene_units(au_value: float, scale: float = 10.0) -> float:
    """Convert AU to Three.js scene units. 1 AU = scale units."""
    return au_value * scale
