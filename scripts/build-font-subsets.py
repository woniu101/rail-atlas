"""Build local OFL-licensed WOFF2 subsets from the current website source.

Requirements: python -m pip install "fonttools[woff]"
Usage: python scripts/build-font-subsets.py [--font-cache PATH]
Full source fonts are cached outside the repository and are not web assets.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import urllib.request

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = Path(__file__).resolve().parents[1]
FONT_SPECS = (
    ("NotoSerifSC", "notoserifsc", "Rail Serif", "rail-serif", (700, 800)),
    ("NotoSansSC", "notosanssc", "Rail Sans", "rail-sans", (400, 500)),
)
EXTRA_TEXT = "铁道图鉴探索车型铁路原理发展历程世界铁路搜索开始浏览全部蒸汽机车内燃电力动车组受电弓转向架轮对加载中重试全屏退出重置视角正面侧面顶部返回首页暂无资料模型署名许可来源修改记录关闭菜单上一页下一页查看详情拖动旋转滚轮缩放图文介绍关于本站清除筛选有结果无结果键盘操作最高运营速度持续功率制造商技术参数千瓦公里小时年代中国标准复兴和谐东风韶山前进型零一二三四五六七八九十百千万，。！？：；、“”‘’（）《》【】·—…→↗−×°©"


def acquire(url: str, destination: Path) -> None:
    if destination.exists():
        return
    destination.parent.mkdir(parents=True, exist_ok=True)
    if os.name == "nt":
        # PowerShell follows the Windows proxy configuration used by this workspace.
        command = "Invoke-WebRequest -UseBasicParsing -Uri '{}' -OutFile '{}'".format(
            url.replace("'", "''"), str(destination).replace("'", "''")
        )
        subprocess.run(["powershell", "-NoProfile", "-Command", command], check=True)
    else:
        with urllib.request.urlopen(url, timeout=90) as response:
            destination.write_bytes(response.read())


def collect_codepoints() -> set[int]:
    codepoints = set(range(0x20, 0x7F)) | {ord(ch) for ch in EXTRA_TEXT}
    for path in sorted((ROOT / "src").rglob("*")):
        if path.is_file() and path.suffix in {".astro", ".tsx", ".ts", ".js", ".jsx", ".md", ".mdx", ".json", ".css"}:
            codepoints.update(ord(ch) for ch in path.read_text(encoding="utf-8") if not ch.isspace())
    return codepoints


def rename(font: TTFont, family: str, postscript: str) -> None:
    # Give modified subsets project-specific names while retaining source copyright/OFL records.
    replacements = {1: family, 2: "Regular", 3: f"1.000;Rail;{postscript}", 4: family, 6: postscript, 16: family, 17: "Regular"}
    font["name"].names = [record for record in font["name"].names if record.nameID not in replacements]
    for name_id, value in replacements.items():
        font["name"].setName(value, name_id, 3, 1, 0x409)
        font["name"].setName(value, name_id, 1, 0, 0)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--font-cache", type=Path, default=Path(tempfile.gettempdir()) / "chinarail-font-cache")
    args = parser.parse_args()
    output = ROOT / "public" / "fonts"
    output.mkdir(parents=True, exist_ok=True)
    requested = collect_codepoints()
    manifest = {"generatedFrom": "src/**/* + shared UI characters + ASCII", "requestedCodepoints": len(requested), "fonts": []}
    for source_name, directory, family, basename, weight_range in FONT_SPECS:
        url = f"https://raw.githubusercontent.com/google/fonts/main/ofl/{directory}/{source_name}%5Bwght%5D.ttf"
        source = args.font_cache / f"{source_name}.ttf"
        acquire(url, source)
        license_path = output / f"OFL-{source_name}.txt"
        acquire(f"https://raw.githubusercontent.com/google/fonts/main/ofl/{directory}/OFL.txt", license_path)
        font = TTFont(source)
        available = set(font.getBestCmap())
        covered = requested & available
        missing = sorted(requested - available)
        options = subset.Options()
        options.flavor = "woff2"
        options.layout_features = ["*"]
        options.name_IDs = [0, 1, 2, 3, 4, 5, 6, 13, 14, 16, 17]
        options.name_legacy = True
        options.name_languages = ["*"]
        subsetter = subset.Subsetter(options=options)
        subsetter.populate(unicodes=covered)
        subsetter.subset(font)
        font = instantiateVariableFont(font, {"wght": weight_range}, inplace=True)
        rename(font, family, basename.replace("-", "").title())
        font.flavor = "woff2"
        target = output / f"{basename}.woff2"
        font.save(target)
        verified = TTFont(target)
        actual = set(verified.getBestCmap())
        assert covered <= actual, f"Dropped required glyphs: {covered - actual}"
        row = {
            "file": target.name, "family": family, "sourceFamily": source_name,
            "sourceUrl": url, "sourceSha256": hashlib.sha256(source.read_bytes()).hexdigest(),
            "weightRange": list(weight_range), "bytes": target.stat().st_size,
            "coveredCodepoints": len(covered), "missingCodepoints": [f"U+{cp:04X}" for cp in missing],
            "license": "SIL Open Font License 1.1", "licenseFile": license_path.name,
        }
        manifest["fonts"].append(row)
        print(f"{target.name}: {row['bytes']:,} bytes; {len(covered)} codepoints; weights {weight_range}; missing: {row['missingCodepoints']}")
    (output / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
