/**
 * Hero mockup layout controls.
 *
 * Tweak `scale` and card x/y values here to tune the composition.
 * Positions are in pixels relative to the composition root (top-left).
 * Use negative left/right/bottom to let cards peek outside the stage.
 *
 * Set `showDebugGrid` to true in development to overlay an alignment grid.
 */

import type { CSSProperties } from "react";

export type CardPlacement = {
  /** Distance from top — number (px) or percent string (e.g. "50%") */
  top?: number | string;
  /** Pixels from the right edge */
  right?: number;
  /** Pixels from the bottom edge */
  bottom?: number;
  /** Pixels from the left edge */
  left?: number;
  /** Card width in pixels */
  width?: number;
  /** Scale multiplier (e.g. 1.25 = 125% size) */
  scale?: number;
  /** Extra transform, e.g. "-50%" to vertically center with top: "50%" */
  translateY?: string;
  /** Entrance animation delay (seconds) */
  delay?: number;
};

/**
 * A connector is a dotted line that walks through waypoints, turning a
 * rounded corner at each intermediate point.
 *
 * - `points`: [x, y] pairs in px, measured from the `anchor` corner of the
 *   stage (default top-left). With `anchor: { x: "right" }`, x values are
 *   distances from the stage's RIGHT edge — use that for paths near
 *   right-side cards so they survive responsive width changes. Same idea
 *   for `y: "bottom"`.
 * - `nodeAt`: indices into `points` that get a circular dot (0 = first
 *   point). Any waypoint can have one, not just the ends.
 * - `cornerRadius`: how soft the turns are (px). 0 = sharp corners.
 *
 * Tip: set `showDebugGrid: true` above while tuning coordinates.
 */
export type ConnectorPath = {
  anchor?: { x?: "left" | "right"; y?: "top" | "bottom" };
  points: ReadonlyArray<readonly [number, number]>;
  nodeAt?: readonly number[];
  cornerRadius?: number;
};

export const heroMockupLayout = {
  /** Overall composition scale (e.g. 0.9 = 90%, 1.05 = 105%) */
  scale: 1,

  /** Show an 8px alignment grid over the composition (dev tuning aid) */
  showDebugGrid: false,

  /** Space reserved around the browser for floating cards */
  stage: {
    paddingTop: 48,
    paddingRight: 140,
    paddingBottom: 160,
    paddingLeft: 140,
  },

  /** Main browser window */
  browser: {
    /** Extra width (px) added to the browser, centered over the stage */
    expandX: 0,
    /**
     * Shrinks the whole browser (content included) without reflowing it —
     * it lays out wider, then scales down. NOTE: the layout box keeps its
     * unscaled height, so lowering `scale` leaves slack below the browser;
     * compensate with stage.paddingBottom.
     */
    scale: 0.88,
  },

  /** Background grid texture bleed beyond the composition */
  texture: {
    insetX: 56,
    insetY: 32,
  },

  /**
   * Outer ring: Project Overview (left), Systems (right), Code (bottom-left),
   * Home Base (bottom-right), Ongoing Support (far bottom-left).
   * Browser left edge ≈ paddingLeft (140); right edge ≈ paddingRight (140).
   */
  cards: {
    projectOverview: {
      left: -8,
      top: 120,
      width: 188,
      delay: 0.15,
    } satisfies CardPlacement,

    systems: {
      right: -8,
      top: 120,
      width: 188,
      delay: 0.25,
    } satisfies CardPlacement,

    code: {
      left: 40,
      bottom: 24,
      width: 248,
      delay: 0.35,
    } satisfies CardPlacement,

    homeBase: {
      right: 40,
      bottom: 36,
      width: 220,
      delay: 0.45,
    } satisfies CardPlacement,

    support: {
      left: -20,
      bottom: 8,
      delay: 0.5,
    } satisfies CardPlacement,
  },

  /**
   * First-pass connectors matching the reference ring.
   * Tune waypoints with showDebugGrid: true.
   */
  connectors: [
    // Browser left edge → out → down into Project Overview top
    {
      points: [
        [140, 100],
        [86, 100],
        [86, 120],
      ],
      nodeAt: [0, 2],
      cornerRadius: 10,
    },
    // Project Overview bottom → down → into Code card left
    {
      points: [
        [86, 340],
        [86, 420],
        [140, 420],
      ],
      nodeAt: [0, 2],
      cornerRadius: 10,
    },
    // Code right → Home Base left (bottom run)
    {
      anchor: { y: "bottom" },
      points: [
        [288, 100],
        [420, 100],
      ],
      nodeAt: [0, 1],
    },
    // Home Base top-right → up → into browser right edge
    {
      anchor: { x: "right" },
      points: [
        [150, 380],
        [150, 300],
        [70, 300],
        [70, 260],
      ],
      nodeAt: [0, 3],
      cornerRadius: 10,
    },
    // Systems left edge → into browser right edge
    {
      anchor: { x: "right" },
      points: [
        [140, 140],
        [70, 140],
      ],
      nodeAt: [0, 1],
    },
  ] satisfies ConnectorPath[],
} as const;

export function cardPlacementStyle(placement: CardPlacement): CSSProperties {
  const style: CSSProperties = {};

  if (placement.top != null) style.top = placement.top;
  if (placement.right != null) style.right = placement.right;
  if (placement.bottom != null) style.bottom = placement.bottom;
  if (placement.left != null) style.left = placement.left;
  if (placement.width != null) style.width = placement.width;

  const transforms: string[] = [];
  if (placement.translateY) transforms.push(`translateY(${placement.translateY})`);
  if (placement.scale) transforms.push(`scale(${placement.scale})`);
  if (transforms.length) style.transform = transforms.join(" ");

  if (placement.scale) {
    if (placement.right != null && placement.bottom != null) {
      style.transformOrigin = "bottom right";
    } else if (placement.right != null) {
      style.transformOrigin = "right center";
    } else if (placement.bottom != null) {
      style.transformOrigin = "bottom center";
    } else if (placement.left != null && placement.top != null) {
      style.transformOrigin = "top left";
    }
  }

  return style;
}

/** Path `d` through points with a rounded corner at each intermediate one. */
function roundedPathD(
  pts: { x: number; y: number }[],
  radius: number,
): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const p0 = pts[i - 1];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const v1 = { x: p1.x - p0.x, y: p1.y - p0.y };
    const v2 = { x: p2.x - p1.x, y: p2.y - p1.y };
    const l1 = Math.hypot(v1.x, v1.y);
    const l2 = Math.hypot(v2.x, v2.y);
    const r = Math.min(radius, l1 / 2, l2 / 2);
    if (r <= 0 || l1 === 0 || l2 === 0) {
      d += ` L ${p1.x} ${p1.y}`;
      continue;
    }
    const entry = { x: p1.x - (v1.x / l1) * r, y: p1.y - (v1.y / l1) * r };
    const exit = { x: p1.x + (v2.x / l2) * r, y: p1.y + (v2.y / l2) * r };
    d += ` L ${entry.x} ${entry.y} Q ${p1.x} ${p1.y} ${exit.x} ${exit.y}`;
  }
  const last = pts[pts.length - 1];
  d += ` L ${last.x} ${last.y}`;
  return d;
}

/**
 * Turns a ConnectorPath into everything the renderer needs: a positioned
 * <svg> wrapper style plus the path `d` and node-dot coordinates in the
 * svg's local space. Handles right/bottom anchoring by flipping axes.
 */
export function buildConnector(path: ConnectorPath): {
  style: CSSProperties;
  width: number;
  height: number;
  d: string;
  dots: { x: number; y: number }[];
} {
  const pad = 8; // room for node dots and stroke caps at the bbox edges
  const xs = path.points.map((p) => p[0]);
  const ys = path.points.map((p) => p[1]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const width = maxX - minX + pad * 2;
  const height = maxY - minY + pad * 2;
  const anchorX = path.anchor?.x ?? "left";
  const anchorY = path.anchor?.y ?? "top";

  const style: CSSProperties = { position: "absolute", width, height };
  if (anchorX === "left") style.left = minX - pad;
  else style.right = minX - pad;
  if (anchorY === "top") style.top = minY - pad;
  else style.bottom = minY - pad;

  // Convert stage coordinates to svg-local, flipping for right/bottom anchors.
  const local = path.points.map(([x, y]) => ({
    x: anchorX === "left" ? x - minX + pad : maxX - x + pad,
    y: anchorY === "top" ? y - minY + pad : maxY - y + pad,
  }));

  return {
    style,
    width,
    height,
    d: roundedPathD(local, path.cornerRadius ?? 0),
    dots: (path.nodeAt ?? []).flatMap((i) => (local[i] ? [local[i]] : [])),
  };
}
