import { downloadBlob } from './exportImage';

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

class StlMeshBuilder {
  private facets: string[] = [];

  private addTriangle(a: Vec3, b: Vec3, c: Vec3) {
    const ux = b.x - a.x;
    const uy = b.y - a.y;
    const uz = b.z - a.z;
    const vx = c.x - a.x;
    const vy = c.y - a.y;
    const vz = c.z - a.z;

    let nx = uy * vz - uz * vy;
    let ny = uz * vx - ux * vz;
    let nz = ux * vy - uy * vx;
    const len = Math.hypot(nx, ny, nz) || 1;
    nx /= len;
    ny /= len;
    nz /= len;

    this.facets.push(
      `  facet normal ${nx.toFixed(5)} ${ny.toFixed(5)} ${nz.toFixed(5)}\n` +
        `    outer loop\n` +
        `      vertex ${a.x.toFixed(4)} ${a.y.toFixed(4)} ${a.z.toFixed(4)}\n` +
        `      vertex ${b.x.toFixed(4)} ${b.y.toFixed(4)} ${b.z.toFixed(4)}\n` +
        `      vertex ${c.x.toFixed(4)} ${c.y.toFixed(4)} ${c.z.toFixed(4)}\n` +
        `    endloop\n` +
        `  endfacet`
    );
  }

  addQuad(a: Vec3, b: Vec3, c: Vec3, d: Vec3) {
    this.addTriangle(a, b, c);
    this.addTriangle(a, c, d);
  }

  addBox(cx: number, cy: number, cz: number, sx: number, sy: number, sz: number) {
    const hx = sx / 2;
    const hy = sy / 2;
    const hz = sz / 2;
    const p = [
      { x: cx - hx, y: cy - hy, z: cz - hz }, // 0
      { x: cx + hx, y: cy - hy, z: cz - hz }, // 1
      { x: cx + hx, y: cy + hy, z: cz - hz }, // 2
      { x: cx - hx, y: cy + hy, z: cz - hz }, // 3
      { x: cx - hx, y: cy - hy, z: cz + hz }, // 4
      { x: cx + hx, y: cy - hy, z: cz + hz }, // 5
      { x: cx + hx, y: cy + hy, z: cz + hz }, // 6
      { x: cx - hx, y: cy + hy, z: cz + hz }, // 7
    ];
    this.addQuad(p[0], p[3], p[2], p[1]); // bottom
    this.addQuad(p[4], p[5], p[6], p[7]); // top
    this.addQuad(p[0], p[1], p[5], p[4]); // front
    this.addQuad(p[2], p[3], p[7], p[6]); // back
    this.addQuad(p[1], p[2], p[6], p[5]); // right
    this.addQuad(p[3], p[0], p[4], p[7]); // left
  }

  addCylinder(
    cx: number,
    cy: number,
    z0: number,
    z1: number,
    radius: number,
    segments = 36
  ) {
    for (let i = 0; i < segments; i++) {
      const a0 = (i / segments) * Math.PI * 2;
      const a1 = ((i + 1) / segments) * Math.PI * 2;
      const x0 = cx + Math.cos(a0) * radius;
      const y0 = cy + Math.sin(a0) * radius;
      const x1 = cx + Math.cos(a1) * radius;
      const y1 = cy + Math.sin(a1) * radius;

      // Side quad
      this.addQuad(
        { x: x0, y: y0, z: z0 },
        { x: x1, y: y1, z: z0 },
        { x: x1, y: y1, z: z1 },
        { x: x0, y: y0, z: z1 }
      );
      // Bottom cap
      this.addTriangle({ x: cx, y: cy, z: z0 }, { x: x1, y: y1, z: z0 }, { x: x0, y: y0, z: z0 });
      // Top cap
      this.addTriangle({ x: cx, y: cy, z: z1 }, { x: x0, y: y0, z: z1 }, { x: x1, y: y1, z: z1 });
    }
  }

  addExtrudedSweep(sections: Vec3[][]) {
    for (let s = 0; s < sections.length - 1; s++) {
      const cur = sections[s];
      const next = sections[s + 1];
      const n = cur.length;
      for (let i = 0; i < n; i++) {
        const j = (i + 1) % n;
        this.addQuad(cur[i], cur[j], next[j], next[i]);
      }
    }
    // Cap start & end
    const first = sections[0];
    const last = sections[sections.length - 1];
    for (let i = 1; i < first.length - 1; i++) {
      this.addTriangle(first[0], first[i + 1], first[i]);
      this.addTriangle(last[0], last[i], last[i + 1]);
    }
  }

  build(solidName: string): string {
    return `solid ${solidName}\n${this.facets.join('\n')}\nendsolid ${solidName}\n`;
  }
}

export type StlPartId =
  | 'spoiler'
  | 'badge'
  | 'wheel-cap'
  | 'phone-dock'
  | 'mirror-trim';

export function buildVestaStl(partId: StlPartId): { filename: string; content: string } {
  const mesh = new StlMeshBuilder();

  switch (partId) {
    case 'spoiler': {
      // Curved aerodynamic trunk lip spoiler (420mm test print scale or 1160mm full split width -> 420mm central segment)
      const sections: Vec3[][] = [];
      const steps = 28;
      for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * 2 - 1; // -1..1
        const x = t * 220;
        const curveY = (1 - t * t) * 28;
        const taper = 1 - Math.pow(Math.abs(t), 3) * 0.45;
        const w = 54 * taper;
        const h = 24 * taper;
        sections.push([
          { x, y: curveY, z: 0 },
          { x, y: curveY + w, z: 0 },
          { x, y: curveY + w + 10 * taper, z: h },
          { x, y: curveY + w * 0.45, z: h * 0.72 },
          { x, y: curveY + 4, z: 5 },
        ]);
      }
      mesh.addExtrudedSweep(sections);
      return { filename: 'vesta_pulse_trunk_spoiler.stl', content: mesh.build('vesta_spoiler') };
    }

    case 'badge': {
      // X-emblem badge (108 x 48 x 7 mm)
      mesh.addBox(0, 0, 1.5, 108, 48, 3);
      // Raised diagonal X bars
      const bar1: Vec3[][] = [
        [
          { x: -42, y: -16, z: 3 },
          { x: -30, y: -16, z: 3 },
          { x: -30, y: -16, z: 7.5 },
          { x: -42, y: -16, z: 7.5 },
        ],
        [
          { x: 30, y: 16, z: 3 },
          { x: 42, y: 16, z: 3 },
          { x: 42, y: 16, z: 7.5 },
          { x: 30, y: 16, z: 7.5 },
        ],
      ];
      const bar2: Vec3[][] = [
        [
          { x: -42, y: 16, z: 3 },
          { x: -30, y: 16, z: 3 },
          { x: -30, y: 16, z: 7.5 },
          { x: -42, y: 16, z: 7.5 },
        ],
        [
          { x: 30, y: -16, z: 3 },
          { x: 42, y: -16, z: 3 },
          { x: 42, y: -16, z: 7.5 },
          { x: 30, y: -16, z: 7.5 },
        ],
      ];
      mesh.addExtrudedSweep(bar1);
      mesh.addExtrudedSweep(bar2);
      return { filename: 'vesta_pulse_x_badge.stl', content: mesh.build('vesta_badge') };
    }

    case 'wheel-cap': {
      // 60 mm wheel hub center cap with stepped ring
      mesh.addCylinder(0, 0, 0, 4, 27, 40);
      mesh.addCylinder(0, 0, 4, 8.5, 30, 40);
      mesh.addCylinder(0, 0, 8.5, 10.5, 19, 36);
      return { filename: 'vesta_pulse_wheel_cap_60mm.stl', content: mesh.build('vesta_wheel_cap') };
    }

    case 'phone-dock': {
      // Snap-in Vesta NG dashboard smartphone holder (84 x 44 x 34 mm)
      mesh.addBox(0, 0, 3, 84, 42, 6); // base plate
      mesh.addBox(0, -17, 17, 84, 8, 28); // angled back wall
      mesh.addBox(-38, 2, 13, 8, 36, 16); // left wing
      mesh.addBox(38, 2, 13, 8, 36, 16); // right wing
      mesh.addBox(-24, 17, 10, 26, 6, 14); // front left lip (cable gap in center)
      mesh.addBox(24, 17, 10, 26, 6, 14); // front right lip
      return { filename: 'vesta_pulse_phone_holder.stl', content: mesh.build('vesta_phone_dock') };
    }

    case 'mirror-trim': {
      // Curved mirror housing accent fin (160 x 32 x 12 mm)
      const sections: Vec3[][] = [];
      const steps = 16;
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const x = (t - 0.5) * 160;
        const bend = Math.sin(t * Math.PI) * 18;
        const h = 5 + Math.sin(t * Math.PI) * 8;
        sections.push([
          { x, y: bend, z: 0 },
          { x, y: bend + 24, z: 0 },
          { x, y: bend + 20, z: h },
          { x, y: bend + 4, z: h * 0.7 },
        ]);
      }
      mesh.addExtrudedSweep(sections);
      return { filename: 'vesta_pulse_mirror_blade.stl', content: mesh.build('vesta_mirror_trim') };
    }
  }
}

export function downloadVestaStl(partId: StlPartId): string {
  const { filename, content } = buildVestaStl(partId);
  const blob = new Blob([content], { type: 'application/sla' });
  downloadBlob(blob, filename);
  return filename;
}
