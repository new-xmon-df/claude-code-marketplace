#!/usr/bin/env python3
"""Find CSS classes that clash between the modules of a manual generator (G53).

Usage:
    python3 check_classes.py base.css nav.css sections/logo.py sections/colour.py
    python3 check_classes.py --attr STYLE module.py ...

Each argument is a .css file or a Python module that exports its CSS as a string constant
(default name: CSS). A class clashes when it appears in two or more sources and at least one
of them styles it unscoped, i.e. in the first compound selector (`.dev {...}`), so that rule
leaks into the other module's elements. Exit code 1 when any clash is found.
"""
import argparse
import importlib.util
import re
import sys
from collections import defaultdict
from pathlib import Path

CLASS = re.compile(r"\.(-?[_a-zA-Z][\w-]*)")
COMMENT = re.compile(r"/\*.*?\*/", re.S)
PRELUDE = re.compile(r"([^{}]+)\{")


def load(path: Path, attr: str) -> str:
    if path.suffix == ".css":
        return path.read_text(encoding="utf-8")
    spec = importlib.util.spec_from_file_location(path.stem, path)
    module = importlib.util.module_from_spec(spec)
    sys.path.insert(0, str(path.parent))
    spec.loader.exec_module(module)
    return getattr(module, attr)


def classes(css: str):
    """Yield (class, unscoped) for every class in every selector of the stylesheet."""
    for prelude in PRELUDE.findall(COMMENT.sub("", css)):
        prelude = prelude.strip()
        if not prelude or prelude.startswith("@"):
            continue
        for selector in prelude.split(","):
            # Drop attribute and pseudo-class arguments so dots inside them do not count.
            selector = re.sub(r"\[[^\]]*\]|\([^)]*\)", "", selector).strip()
            compounds = re.split(r"\s*[>+~]\s*|\s+", selector)
            for i, compound in enumerate(compounds):
                for name in CLASS.findall(compound):
                    yield name, i == 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("sources", nargs="+", type=Path)
    parser.add_argument("--attr", default="CSS", help="CSS constant name in Python modules")
    args = parser.parse_args()

    seen = defaultdict(dict)  # class -> {source: unscoped anywhere}
    for path in args.sources:
        for name, unscoped in classes(load(path, args.attr)):
            seen[name][path.name] = seen[name].get(path.name, False) or unscoped

    clashes = {n: s for n, s in seen.items() if len(s) > 1 and any(s.values())}
    for name in sorted(clashes):
        where = ", ".join(f"{src}{' (unscoped)' if u else ''}" for src, u in sorted(clashes[name].items()))
        print(f".{name}: {where}")
    print(f"{len(clashes)} clashing classes in {len(args.sources)} sources")
    return 1 if clashes else 0


if __name__ == "__main__":
    sys.exit(main())
