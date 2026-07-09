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
    paddingTop: 40,
    paddingRight: 120,
    paddingBottom: 130,
    paddingLeft: 120,
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
   * Ring layout: browser in the middle, cards floating around its edges
   * with only a slight overlap. Browser edges sit at x = paddingLeft (120)
   * from the left and 120 from the right — position cards relative to those.
   */
  cards: {
    // left-middle, hanging mostly outside the browser's left edge
    projectOverview: {
      left: -20,
      top: 150,
      width: 176,
      delay: 0.15,
    } satisfies CardPlacement,

    // top-right corner
    systems: {
      right: -30,
      top: 30,
      width: 180,
      delay: 0.25,
    } satisfies CardPlacement,

    // right-middle, below the systems card
    dashboard: {
      right: -50,
      top: "58%",
      width: 176,
      translateY: "-50%",
      delay: 0.2,
    } satisfies CardPlacement,

    // bottom-left, in the stage's bottom padding zone
    code: {
      left: 0,
      bottom: 100,
      width: 256,
      delay: 0.35,
    } satisfies CardPlacement,

    // bottom-right
    stat: {
      right: 30,
      bottom: 44,
      scale: 1.15,
      delay: 0.45,
    } satisfies CardPlacement,
  },

  connectors: [
    // LEFT LOOP: browser edge → out to the Project overview's center lane
    // (x=68) → node at the card's top edge → behind the card → node below
    // it → back into the browser edge. Same loop pattern as before, moved
    // to the new geometry.
    {
      points: [
        [120, 70], // node on the browser's left edge (x = paddingLeft)
        [68, 70], // corner above the Project overview card
        [68, 150], // node at the card's top edge
        [68, 340], // node at the card's bottom edge
        [68, 430], // corner below the card
        [120, 430], // node back on the browser's edge
      ],
      nodeAt: [0, 2, 3, 5],
      cornerRadius: 12,
    },
    // RIGHT LANE: short vertical link from the Systems card's bottom edge
    // down to the Client Dashboard's top edge (x=60 from the right is both
    // cards' shared center lane).
    {
      anchor: { x: "right" },
      points: [
        [60, 180],
        [60, 280],
      ],
      nodeAt: [0, 1],
    },
    // BOTTOM RUN: code panel's right edge → stat card's left edge.
    {
      anchor: { x: "right", y: "bottom" },
      points: [
        [430, 80],
        [300, 80],
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
