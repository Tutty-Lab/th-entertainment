"""Build the static map from Natural Earth's public-domain country geometry."""
import json
import math
import sys
import urllib.request
from pathlib import Path

SOURCE = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson"
data = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8") if len(sys.argv) > 1
                  else urllib.request.urlopen(SOURCE, timeout=30).read())
markets = {"CZE", "DEU", "POL", "GBR", "AUT", "SVK", "VNM"}


def mercator(lat):
    return math.degrees(math.log(math.tan(math.pi / 4 + math.radians(max(-85, min(85, lat))) / 2)))


def project(lon, lat, inset=False):
    if inset:
        return (24 + (lon + 13) / 43 * 390,
                70 + (mercator(61) - mercator(lat)) / (mercator(61) - mercator(35)) * 450)
    return 466 + (lon + 180) * 2, 124 + (85 - lat) * 2


def countries(inset=False):
    paths = []
    for feature in data["features"]:
        if feature["properties"]["ADM0_A3"] == "ATA":
            continue
        geometry = feature["geometry"]
        polygons = geometry["coordinates"] if geometry["type"] == "MultiPolygon" else [geometry["coordinates"]]
        segments = []
        for polygon in polygons:
            for ring in polygon:
                points = [project(lon, lat, inset) for lon, lat in ring]
                segments.append("M" + "L".join(f"{x:.1f},{y:.1f}" for x, y in points) + "Z")
        fill = "#bd4226" if feature["properties"]["ADM0_A3"] in markets else "#c9bdac"
        paths.append(f'<path d="{"".join(segments)}" fill="{fill}"/>')
    return "".join(paths)


labels = []
for text, lon, lat in [("UK", -2.7, 54.7), ("DE", 10.2, 51.4), ("PL", 19.3, 53),
                       ("CZ", 15.4, 49.8), ("AT", 13.1, 47.2), ("SK", 19.6, 48.6)]:
    x, y = project(lon, lat, True)
    labels.append(f'<text x="{x:.1f}" y="{y:.1f}" text-anchor="middle" dominant-baseline="middle">{text}</text>')

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 570" role="img" aria-labelledby="title desc">
<title id="title">Europe and Vietnam</title>
<desc id="desc">Natural Earth country boundaries. United Kingdom, Germany, Poland, Czechia, Austria, Slovakia and Vietnam highlighted. Europe shown in a separate Mercator inset; world shown in an equirectangular projection.</desc>
<defs><clipPath id="europe"><rect x="24" y="70" width="390" height="450"/></clipPath></defs>
<rect width="1200" height="570" fill="#eee6d9"/>
<g font-family="sans-serif" fill="#574637" font-size="13" letter-spacing="2"><text x="24" y="36">EUROPE</text><text x="466" y="36">WORLDWIDE</text></g>
<rect x="24" y="70" width="390" height="450" fill="#e1d7c7"/>
<g stroke="#eee6d9" stroke-width=".65" stroke-linejoin="round">{countries()}</g>
<g clip-path="url(#europe)" stroke="#eee6d9" stroke-width="1" stroke-linejoin="round">{countries(True)}</g>
<g font-family="sans-serif" font-size="12" font-weight="700" fill="#fffaf2">{"".join(labels)}</g>
<path d="M1041 258 L1070 230 H1150" fill="none" stroke="#8e321e" stroke-width="1.2"/>
<text x="1070" y="221" fill="#8e321e" font-family="sans-serif" font-size="14" font-weight="700">VIETNAM</text>
<g fill="#574637" font-family="sans-serif" font-size="12"><text x="466" y="500">EUROPE / ASIA</text><text x="466" y="523">7 COUNTRIES</text></g>
</svg>'''
Path("templates/img/network-map.svg").write_text(svg, encoding="utf-8")
