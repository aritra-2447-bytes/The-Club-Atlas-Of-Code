'use client';
import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

gsap.registerPlugin(InertiaPlugin);

const throttle = (func: (...args: any[]) => void, limit: number) => {
  let lastCall = 0;
  return function (this: any, ...args: any[]) {
    const now = performance.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
};

interface Dot {
  cx: number;
  cy: number;
  xOffset: number;
  yOffset: number;
  _inertiaApplied: boolean;
  gridX: number;
  gridY: number;
}

interface Entity {
  gridX: number;
  gridY: number;
  targetGridX: number;
  targetGridY: number;
  x: number;
  y: number;
  radius: number;
  speed: number;
  dirX: number;
  dirY: number;
  color: string;
  isGhost: boolean;
  mouthAngle?: number;
  mouthClosing?: boolean;
}

export interface DotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  speedTrigger?: number;
  shockRadius?: number;
  shockStrength?: number;
  maxSpeed?: number;
  resistance?: number;
  returnDuration?: number;
  className?: string;
  style?: React.CSSProperties;
}

function hexToRgb(hex: string) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16)
  };
}

const DotGrid: React.FC<DotGridProps> = ({
                                           dotSize = 16,
                                           gap = 32,
                                           baseColor = '#5227FF',
                                           activeColor = '#5227FF',
                                           proximity = 150,
                                           speedTrigger = 100,
                                           shockRadius = 250,
                                           shockStrength = 5,
                                           maxSpeed = 5000,
                                           resistance = 750,
                                           returnDuration = 1.5,
                                           className = '',
                                           style
                                         }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const pointerRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    speed: 0,
    lastTime: 0,
    lastX: 0,
    lastY: 0
  });

  const eatenDotsTimeRef = useRef<Map<string, number>>(new Map());
  const DOT_RESPAWN_DELAY = 1500;
  const DOT_FADE_DURATION = 800;

  // Collection array managing all active maze roamers
  const entitiesRef = useRef<Entity[]>([]);
  const entitiesInitializedRef = useRef(false);

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

  const circlePath = useMemo(() => {
    if (typeof window === 'undefined' || !window.Path2D) return null;
    const p = new Path2D();
    p.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
    return p;
  }, [dotSize]);

  // Helper method to structurally render a custom vector ghost overlay pathing
  const drawGhost = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string, dirX: number, dirY: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = color;

    // Body top dome shape
    ctx.beginPath();
    ctx.arc(0, -radius * 0.2, radius, Math.PI, 0, false);

    // Bottom skirt tentacles waves
    ctx.lineTo(radius, radius);
    ctx.bezierCurveTo(radius * 0.5, radius * 0.6, radius * 0.25, radius * 1.1, 0, radius);
    ctx.bezierCurveTo(-radius * 0.25, radius * 1.1, -radius * 0.5, radius * 0.6, -radius, radius);
    ctx.closePath();
    ctx.fill();

    // White eye scleras
    const eyeOffsetX = dirX * 2;
    const eyeOffsetY = dirY * 2;

    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(-radius * 0.4 + eyeOffsetX, -radius * 0.2 + eyeOffsetY, radius * 0.3, 0, Math.PI * 2);
    ctx.arc(radius * 0.4 + eyeOffsetX, -radius * 0.2 + eyeOffsetY, radius * 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Blue pupils looking at their specific heading paths
    ctx.fillStyle = '#002FFF';
    ctx.beginPath();
    ctx.arc(-radius * 0.4 + eyeOffsetX * 1.8, -radius * 0.2 + eyeOffsetY * 1.8, radius * 0.13, 0, Math.PI * 2);
    ctx.arc(radius * 0.4 + eyeOffsetX * 1.8, -radius * 0.2 + eyeOffsetY * 1.8, radius * 0.13, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const { width, height } = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);

    const cols = Math.floor((width + gap) / (dotSize + gap));
    const rows = Math.floor((height + gap) / (dotSize + gap));
    const cell = dotSize + gap;

    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;

    const extraX = width - gridW;
    const extraY = height - gridH;

    const startX = extraX / 2 + dotSize / 2;
    const startY = extraY / 2 + dotSize / 2;

    const dots: Dot[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cx = startX + x * cell;
        const cy = startY + y * cell;
        dots.push({ cx, cy, xOffset: 0, yOffset: 0, _inertiaApplied: false, gridX: x, gridY: y });
      }
    }
    dotsRef.current = dots;

    // Initialize character entities array precisely pinned onto discrete nodes
    if (rows > 0 && cols > 0) {
      const midX = Math.floor(cols / 2);
      const midY = Math.floor(rows / 2);

      const findDotCoords = (gx: number, gy: number) => {
        const found = dots.find(d => d.gridX === gx && d.gridY === gy);
        return found ? { x: found.cx, y: found.cy } : { x: startX + gx * cell, y: startY + gy * cell };
      };

      const startPacman = findDotCoords(midX, Math.min(midY + 1, rows - 1));
      const startBlinky = findDotCoords(Math.max(0, midX - 2), Math.max(0, midY - 1));
      const startInky = findDotCoords(Math.min(cols - 1, midX + 2), Math.max(0, midY - 1));
      const startClyde = findDotCoords(midX, Math.max(0, midY - 2));

      entitiesRef.current = [
        // 1. Pacman Hero
        {
          gridX: midX, gridY: Math.min(midY + 1, rows - 1),
          targetGridX: midX, targetGridY: Math.min(midY + 1, rows - 1),
          x: startPacman.x, y: startPacman.y, radius: 20, speed: 1.8,
          dirX: 1, dirY: 0, color: activeColor, isGhost: false,
          mouthAngle: 0.2, mouthClosing: false
        },
        // 2. Blinky (Red Ghost)
        {
          gridX: Math.max(0, midX - 2), gridY: Math.max(0, midY - 1),
          targetGridX: Math.max(0, midX - 2), targetGridY: Math.max(0, midY - 1),
          x: startBlinky.x, y: startBlinky.y, radius: 20, speed: 1.6,
          dirX: 0, dirY: -1, color: '#FF0000', isGhost: true
        },
        // 3. Inky (Light Blue Ghost)
        {
          gridX: Math.min(cols - 1, midX + 2), gridY: Math.max(0, midY - 1),
          targetGridX: Math.min(cols - 1, midX + 2), targetGridY: Math.max(0, midY - 1),
          x: startInky.x, y: startInky.y, radius: 20, speed: 1.3,
          dirX: 1, dirY: 0, color: '#00D8FF', isGhost: true
        },
        // 4. Clyde (Orange/Yellow Ghost)
        {
          gridX: midX, gridY: Math.max(0, midY - 2),
          targetGridX: midX, targetGridY: Math.max(0, midY - 2),
          x: startClyde.x, y: startClyde.y, radius: 20, speed: 1.3,
          dirX: -1, dirY: 0, color: '#FFB800', isGhost: true
        }
      ];
      entitiesInitializedRef.current = true;
    }
  }, [dotSize, gap, activeColor]);

  useEffect(() => {
    if (!circlePath) return;

    let rafId: number;
    const proxSq = proximity * proximity;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const currentTime = performance.now();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: px, y: py } = pointerRef.current;

      // 1. ROUTE ALL GAME ENTITIES MECHANICS
      if (entitiesInitializedRef.current && dotsRef.current.length > 0) {
        const maxGridX = Math.max(...dotsRef.current.map(d => d.gridX));
        const maxGridY = Math.max(...dotsRef.current.map(d => d.gridY));

        for (const ent of entitiesRef.current) {
          const targetDot = dotsRef.current.find(d => d.gridX === ent.targetGridX && d.gridY === ent.targetGridY);

          if (targetDot) {
            const dx = targetDot.cx - ent.x;
            const dy = targetDot.cy - ent.y;
            const distance = Math.hypot(dx, dy);

            if (distance > ent.speed) {
              ent.x += ent.dirX * ent.speed;
              ent.y += ent.dirY * ent.speed;
            } else {
              // Snap center node position accurately
              ent.x = targetDot.cx;
              ent.y = targetDot.cy;
              ent.gridX = ent.targetGridX;
              ent.gridY = ent.targetGridY;

              // Action step: Only Pacman consumes dots inside paths
              if (!ent.isGhost) {
                const currentDotKey = `${ent.gridX},${ent.gridY}`;
                if (!eatenDotsTimeRef.current.has(currentDotKey)) {
                  eatenDotsTimeRef.current.set(currentDotKey, currentTime);
                }
              }

              // Evaluate structural neighbors boundaries for routing AI branches
              const potentialMoves = [];
              if (ent.gridX > 0) potentialMoves.push({ x: -1, y: 0 });
              if (ent.gridX < maxGridX) potentialMoves.push({ x: 1, y: 0 });
              if (ent.gridY > 0) potentialMoves.push({ x: 0, y: -1 });
              if (ent.gridY < maxGridY) potentialMoves.push({ x: 0, y: 1 });

              // Filter backwards tracking indices to preserve momentum flow vectors
              const forwardMoves = potentialMoves.filter(m => !(m.x === -ent.dirX && m.y === -ent.dirY));
              const finalMoves = forwardMoves.length > 0 ? forwardMoves : potentialMoves;
              const chosenMove = finalMoves[Math.floor(Math.random() * finalMoves.length)];

              if (chosenMove) {
                ent.dirX = chosenMove.x;
                ent.dirY = chosenMove.y;
                ent.targetGridX = ent.gridX + chosenMove.x;
                ent.targetGridY = ent.gridY + chosenMove.y;
              }
            }
          }

          // Cycle mouth animations if handling hero instances
          if (!ent.isGhost && ent.mouthAngle !== undefined) {
            if (ent.mouthClosing) {
              ent.mouthAngle -= 0.05;
              if (ent.mouthAngle <= 0.05) ent.mouthClosing = false;
            } else {
              ent.mouthAngle += 0.05;
              if (ent.mouthAngle >= 0.45) ent.mouthClosing = true;
            }
          }
        }
      }

      // 2. RENDER THE COMBINED MATRIX MAP DOTS LAYER
      for (const dot of dotsRef.current) {
        const dotKey = `${dot.gridX},${dot.gridY}`;
        let visibilityAlpha = 1;

        if (eatenDotsTimeRef.current.has(dotKey)) {
          const eatenTime = eatenDotsTimeRef.current.get(dotKey)!;
          const timeElapsed = currentTime - eatenTime;

          if (timeElapsed < DOT_RESPAWN_DELAY) {
            continue;
          } else if (timeElapsed < DOT_RESPAWN_DELAY + DOT_FADE_DURATION) {
            visibilityAlpha = (timeElapsed - DOT_RESPAWN_DELAY) / DOT_FADE_DURATION;
          } else {
            eatenDotsTimeRef.current.delete(dotKey);
          }
        }

        const ox = dot.cx + dot.xOffset;
        const oy = dot.cy + dot.yOffset;
        const dx = dot.cx - px;
        const dy = dot.cy - py;
        const dsq = dx * dx + dy * dy;

        let r = baseRgb.r;
        let g = baseRgb.g;
        let b = baseRgb.b;

        if (dsq <= proxSq) {
          const dist = Math.sqrt(dsq);
          const t = 1 - dist / proximity;
          r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
          g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
          b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
        }

        ctx.save();
        ctx.translate(ox, oy);
        ctx.fillStyle = `rgba(${r},${g},${b},${visibilityAlpha})`;
        ctx.fill(circlePath);
        ctx.restore();
      }

      // 3. RENDER ENTITY RENDERING LAYER (PACMAN + INDEPENDENT GHOSTS)
      if (entitiesInitializedRef.current) {
        for (const ent of entitiesRef.current) {
          if (ent.isGhost) {
            // Draw custom ghost vectors procedural shapes
            drawGhost(ctx, ent.x, ent.y, ent.radius, ent.color, ent.dirX, ent.dirY);
          } else {
            // Draw Pac-Man vector shape wedge
            ctx.save();
            ctx.beginPath();

            let rotationAngle = 0;
            if (ent.dirX === 1) rotationAngle = 0;
            if (ent.dirX === -1) rotationAngle = Math.PI;
            if (ent.dirY === 1) rotationAngle = Math.PI / 2;
            if (ent.dirY === -1) rotationAngle = -Math.PI / 2;

            ctx.translate(ent.x, ent.y);
            ctx.rotate(rotationAngle);

            ctx.arc(
                0,
                0,
                ent.radius,
                (ent.mouthAngle || 0.2) * Math.PI,
                (2 - (ent.mouthAngle || 0.2)) * Math.PI
            );
            ctx.lineTo(0, 0);
            ctx.fillStyle = ent.color;
            ctx.fill();
            ctx.restore();
          }
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, [proximity, baseColor, activeColor, activeRgb, baseRgb, circlePath]);

  useEffect(() => {
    buildGrid();
    let ro: ResizeObserver | null = null;
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(buildGrid);
      wrapperRef.current && ro.observe(wrapperRef.current);
    } else {
      (window as Window).addEventListener('resize', buildGrid);
    }
    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', buildGrid);
    };
  }, [buildGrid]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      const pr = pointerRef.current;
      const dt = pr.lastTime ? now - pr.lastTime : 16;
      const dx = e.clientX - pr.lastX;
      const dy = e.clientY - pr.lastY;
      let vx = (dx / dt) * 1000;
      let vy = (dy / dt) * 1000;
      let speed = Math.hypot(vx, vy);
      if (speed > maxSpeed) {
        const scale = maxSpeed / speed;
        vx *= scale;
        vy *= scale;
        speed = maxSpeed;
      }
      pr.lastTime = now;
      pr.lastX = e.clientX;
      pr.lastY = e.clientY;
      pr.vx = vx;
      pr.vy = vy;
      pr.speed = speed;

      const rect = canvasRef.current!.getBoundingClientRect();
      pr.x = e.clientX - rect.left;
      pr.y = e.clientY - rect.top;

      for (const dot of dotsRef.current) {
        if (eatenDotsTimeRef.current.has(`${dot.gridX},${dot.gridY}`)) {
          const eatenTime = eatenDotsTimeRef.current.get(`${dot.gridX},${dot.gridY}`)!;
          if (now - eatenTime < DOT_RESPAWN_DELAY) continue;
        }

        const dist = Math.hypot(dot.cx - pr.x, dot.cy - pr.y);
        if (speed > speedTrigger && dist < proximity && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          gsap.killTweensOf(dot);
          const pushX = dot.cx - pr.x + vx * 0.005;
          const pushY = dot.cy - pr.y + vy * 0.005;
          gsap.to(dot, {
            inertia: { xOffset: pushX, yOffset: pushY, resistance },
            onComplete: () => {
              gsap.to(dot, {
                xOffset: 0,
                yOffset: 0,
                duration: returnDuration,
                ease: 'elastic.out(1,0.75)'
              });
              dot._inertiaApplied = false;
            }
          });
        }
      }
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvasRef.current!.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const now = performance.now();
      for (const dot of dotsRef.current) {
        if (eatenDotsTimeRef.current.has(`${dot.gridX},${dot.gridY}`)) {
          const eatenTime = eatenDotsTimeRef.current.get(`${dot.gridX},${dot.gridY}`)!;
          if (now - eatenTime < DOT_RESPAWN_DELAY) continue;
        }

        const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
        if (dist < shockRadius && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          gsap.killTweensOf(dot);
          const falloff = Math.max(0, 1 - dist / shockRadius);
          const pushX = (dot.cx - cx) * shockStrength * falloff;
          const pushY = (dot.cy - cy) * shockStrength * falloff;
          gsap.to(dot, {
            inertia: { xOffset: pushX, yOffset: pushY, resistance },
            onComplete: () => {
              gsap.to(dot, {
                xOffset: 0,
                yOffset: 0,
                duration: returnDuration,
                ease: 'elastic.out(1,0.75)'
              });
              dot._inertiaApplied = false;
            }
          });
        }
      }
    };

    const throttledMove = throttle(onMove, 50);
    window.addEventListener('mousemove', throttledMove, { passive: true });
    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('mousemove', throttledMove);
      window.removeEventListener('click', onClick);
    };
  }, [maxSpeed, speedTrigger, proximity, resistance, returnDuration, shockRadius, shockStrength]);

  return (
      <section className={`p-4 flex items-center justify-center h-full w-full relative ${className}`} style={style}>
        <div ref={wrapperRef} className="w-full h-full relative">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
        </div>
      </section>
  );
};

export default DotGrid;