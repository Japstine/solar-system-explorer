import re

def parse_horizons_vectors(raw: dict) -> dict | None:
    result = raw.get("result", "")

    match = re.search(r"\$\$SOE(.*?)\$\$EOE", result, re.DOTALL)
    if not match:
        print("Parser: could not find $$SOE...$$EOE block")
        return None

    block = match.group(1).strip()
    lines = [l.strip() for l in block.split("\n") if l.strip()]

    # Horizons format after $$SOE:
    # Line 0: "2460676.500000000 = A.D. 2025-Jan-01 ..."  (Julian date)
    # Line 1: " X = value Y = value Z = value"
    # Line 2: " VX= value VY= value VZ= value"
    # Then repeats for next timestep — we only want the first set

    try:
        xy_line = next((l for l in lines if l.startswith("X =")), None)
        vz_line = next((l for l in lines if l.startswith("VX=")), None)

        if not xy_line:
            print(f"Parser: no X= line found. Lines seen: {lines}")
            return None

        # Pattern matches scientific notation: -1.844140472974828E-01
        sci = r"([-+]?\d+\.\d+E[-+]\d+)"

        x_match = re.search(rf"X =\s*{sci}", xy_line)
        y_match = re.search(rf"Y =\s*{sci}", xy_line)
        z_match = re.search(rf"Z =\s*{sci}", xy_line)

        vx_match = re.search(rf"VX=\s*{sci}", vz_line) if vz_line else None
        vy_match = re.search(rf"VY=\s*{sci}", vz_line) if vz_line else None
        vz_match = re.search(rf"VZ=\s*{sci}", vz_line) if vz_line else None

        x  = float(x_match.group(1))  if x_match  else 0.0
        y  = float(y_match.group(1))  if y_match  else 0.0
        z  = float(z_match.group(1))  if z_match  else 0.0
        vx = float(vx_match.group(1)) if vx_match else 0.0
        vy = float(vy_match.group(1)) if vy_match else 0.0
        vz = float(vz_match.group(1)) if vz_match else 0.0

        print(f"Parsed → X:{x:.6f} Y:{y:.6f} Z:{z:.6f} AU")

        return { "x": x, "y": y, "z": z, "vx": vx, "vy": vy, "vz": vz }

    except Exception as e:
        print(f"Parser error: {e}")
        return None


def au_to_scene_units(val: float) -> float:
    """
    Earth is ~1 AU from Sun.
    1 AU = 100 scene units gives comfortable spacing:
      Mercury  ~0.39 AU → 39 units
      Earth    ~1.0  AU → 100 units
      Jupiter  ~5.2  AU → 520 units
      Neptune  ~30   AU → 3000 units
      Voyager  ~160  AU → 16000 units
    Camera starts at z=600 looking at origin, far plane = 100000
    """
    return val * 100.0
