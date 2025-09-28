"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function EdgeAwareStemCanvas({
  lambdaPerSec = 0.9,
  bg = 0xfffcf1,
}: {
  lambdaPerSec?: number;
  bg?: number;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const spawnerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!wrapRef.current || !canvasRef.current) return;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current!,
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
      powerPreference: "low-power",
    });
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(DPR);

    const shaderScene = new THREE.Scene();
    const mainScene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const clock = new THREE.Clock();

    const backgroundColor = new THREE.Color(bg);

    let rtA = new THREE.WebGLRenderTarget(1, 1, { depthBuffer: false });
    let rtB = new THREE.WebGLRenderTarget(1, 1, { depthBuffer: false });
    let ping = rtA,
      pong = rtB;

    const planeGeo = new THREE.PlaneGeometry(2, 2);

    const vert = `
      varying vec2 vUv;
      void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }
    `;

    const frag = `
      precision highp float;
      varying vec2 vUv;

      uniform float u_ratio;
      uniform vec2  u_point;
      uniform vec2  u_origin;
      uniform float u_time;
      uniform float u_stop_time;
      uniform vec3  u_stop_randomizer;
      uniform sampler2D u_texture;
      uniform vec3  u_background_color;

      #define PI 3.14159265359

      vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
      vec2 mod289(vec2 x){return x - floor(x*(1.0/289.0))*289.0;}
      vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
      float snoise(vec2 v){
        const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
        vec2 i=floor(v+dot(v,C.yy));
        vec2 x0=v-i+dot(i,C.xx);
        vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
        vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1; i=mod289(i);
        vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
        vec3 m=max(0.5-vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m*=m; m*=m;
        vec3 x=2.0*fract(p* C.www)-1.0;
        vec3 h=abs(x)-0.5;
        vec3 ox=floor(x+0.5);
        vec3 a0=x-ox;
        m*=1.79284291400159 - 0.85373472095314*(a0*a0+h*h);
        vec3 g;
        g.x=a0.x*x0.x+h.x*x0.y;
        g.yz=a0.yz*x12.xz+h.yz*x12.yw;
        return 130.0*dot(m,g);
      }

      float dotShape(vec2 d,float rMax,float rLine){
        return 1.0 - smoothstep(rLine*rMax, rMax, dot(d,d)*4.0);
      }

      float stem(vec2 cur, vec2 uv, float t, float size, float flowery, vec2 rnd){
        float stroke=.01; float nPow=.2;
        float noiseX = nPow*(1.0+(1.0-flowery))*snoise(3.0*uv*(rnd-0.5));
        noiseX *= pow(dot(cur.y,cur.y), .3*flowery);
        noiseX *= pow(dot(uv.y,uv.y), .3);
        cur.x += noiseX;

        cur.y *= (1.0-((1.0-flowery)*.7));
        cur.y += ((1.0-flowery)*.7*rnd.x);

        stroke = (1.0-flowery)*.9*pow(dot(uv.y, cur.x), 1.0) + flowery*.03;
        stroke -= .02;

        float left = smoothstep(-stroke, 0.0, cur.x);
        float right= smoothstep( stroke, 0.0, cur.x);
        float s = left*right;

        float topMask = smoothstep(cur.y-.1, cur.y, min(-.1, t-1.0));
        s *= topMask;
        s += .5*dotShape(cur+vec2(0.0, .02), .15*size, .5);
        s *= topMask;
        return s;
      }

      void main(){
        float speed = 1.3;
        float t = speed * u_stop_time;

        vec2 uv = vUv;
        uv += 0.00007*snoise(vUv*6.0 + vec2(0.0, 15.0*cos(0.1*u_time)));
        uv.y += 0.00005;

        vec3 color = texture2D(u_texture, uv).rgb;
        color += 0.0015*u_background_color;

        float growDur   = 0.6;
        float bloomDur  = 0.3 * u_stop_randomizer.y;
        float baseR     = .02 + .2*u_stop_randomizer.y;
        float openFlag  = step(.1, baseR);
        float k         = clamp(t / growDur, 0.0, 1.0);
        vec2 head       = mix(u_origin, u_point, k);

        vec2 cur = uv - head;
        cur.x *= u_ratio;

        if(t < growDur){
          vec3 stemColor = u_background_color - vec3(0.25,0.25,0.25);
          float s = stem(cur, uv, 2.0*t, baseR, 1.0, u_stop_randomizer.xy);
          s +=     stem(cur, uv, 2.0*t, 0.0, 0.0, u_stop_randomizer.yz);
          s +=     stem(cur, uv, 2.0*t, 0.0, 0.0, u_stop_randomizer.zy);
          color -= clamp(s,0.0,1.0)*stemColor;
        }

        if(t < growDur + openFlag * bloomDur){
          float bt = max(0.0, pow(1.1*t, 2.0)-.05);
          float radius = baseR * bt;

          vec2 ncur = vUv - u_point;
          ncur.x *= u_ratio;
          ncur.y *= (1.0 + u_stop_randomizer.y * openFlag);
          ncur -= .02 * snoise(ncur*10.0 + vec2(0.0, 10.0*sin(.5*t+PI)));

          float shimmer = 0.4 + 0.5*sin(2.0*u_time + 3.1415*u_stop_randomizer.x);
          vec3 petal = mix(vec3(0.85), vec3(0.55), shimmer);
          petal = mix(u_background_color, petal, 0.8);

          color -= 0.40 * dotShape(ncur, 1.5*radius, 0.0) * petal;

          color = 0.7*color + 0.3*mix(u_background_color, color, 1.0 - dotShape(ncur, radius, 0.0));

          ncur.y -= .02;
          float ir=.7*radius, iw=.2*radius;
          float ring = dotShape(ncur, ir+iw, .9) - dotShape(ncur, ir, .9);
          color += 0.12*bt*ring*openFlag;

          ir=.4*radius; iw=.1*radius;
          ring = dotShape(ncur, ir+iw, .9) - dotShape(ncur, ir, .9);
          color += 0.07*pow(t, .5)*ring*openFlag;

          vec2 c2 = vUv - u_point;
          c2.x *= .5*u_ratio; c2.y += .02;
          c2 += .01*snoise(c2*10.0 + t);
          color -= openFlag*pow(t,5.0)*dotShape(c2, .01*radius, 0.0);
        }

        gl_FragColor = vec4(clamp(color,0.0,1.0), 1.0);
      }
    `;

    const shaderMat = new THREE.ShaderMaterial({
      uniforms: {
        u_ratio: { value: 1.0 },
        u_point: { value: new THREE.Vector2(0.5, 0.5) },
        u_origin: { value: new THREE.Vector2(0.5, 0.0) },
        u_time: { value: 0.0 },
        u_stop_time: { value: 0.0 },
        u_stop_randomizer: { value: new THREE.Vector3(0.5, 1.0, 1.0) },
        u_texture: { value: null as unknown as THREE.Texture },
        u_background_color: { value: new THREE.Color(backgroundColor) },
      },
      vertexShader: vert,
      fragmentShader: frag,
      transparent: true,
    });

    const shaderQuad = new THREE.Mesh(planeGeo, shaderMat);
    shaderScene.add(shaderQuad);

    const screenMat = new THREE.MeshBasicMaterial({
      map: pong.texture,
      transparent: true,
    });
    const screenQuad = new THREE.Mesh(planeGeo, screenMat);
    mainScene.add(screenQuad);

    // --- sizing & RT init ---
    const resize = () => {
      const w = wrapRef.current!.clientWidth;
      const h = wrapRef.current!.clientHeight;
      renderer.setSize(w, h, false);

      rtA.dispose();
      rtB.dispose();
      rtA = new THREE.WebGLRenderTarget(
        Math.max(1, Math.floor(w * DPR)),
        Math.max(1, Math.floor(h * DPR))
      );
      rtB = new THREE.WebGLRenderTarget(
        Math.max(1, Math.floor(w * DPR)),
        Math.max(1, Math.floor(h * DPR))
      );
      ping = rtA;
      pong = rtB;
      screenMat.map = pong.texture;
      shaderMat.uniforms.u_ratio.value = w / Math.max(1, h);

      // clear both to background so we start from clean paper
      renderer.setRenderTarget(ping);
      renderer.setClearColor(backgroundColor, 1);
      renderer.clear();
      renderer.setRenderTarget(pong);
      renderer.setClearColor(backgroundColor, 1);
      renderer.clear();
      renderer.setRenderTarget(null);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(wrapRef.current);
    resize();

    // --- helpers ---
    const swap = () => {
      const t = ping;
      ping = pong;
      pong = t;
      screenMat.map = pong.texture;
    };

    const nearestEdgeOrigin = (nx: number, ny: number) => {
      const dTop = ny,
        dBottom = 1 - ny,
        dLeft = nx,
        dRight = 1 - nx;
      let ox = nx,
        oy = ny;
      const minD = Math.min(dTop, dBottom, dLeft, dRight);
      if (minD === dTop) {
        ox = nx;
        oy = 0;
      } else if (minD === dBottom) {
        ox = nx;
        oy = 1;
      } else if (minD === dLeft) {
        ox = 0;
        oy = ny;
      } else {
        ox = 1;
        oy = ny;
      }
      // flip Y for shader space
      return {
        spx: nx,
        spy: 1 - ny,
        sox: ox,
        soy: 1 - oy,
      };
    };

    const setNewFlower = (nx: number, ny: number) => {
      const { spx, spy, sox, soy } = nearestEdgeOrigin(nx, ny);
      shaderMat.uniforms.u_point.value.set(spx, spy);
      shaderMat.uniforms.u_origin.value.set(sox, soy);
      shaderMat.uniforms.u_stop_randomizer.value.set(
        Math.random(),
        Math.random(),
        Math.random()
      );
      shaderMat.uniforms.u_stop_time.value = 0.0;
    };

    const randExp = (lambda: number) => -Math.log(1 - Math.random()) / lambda;

    const scheduleNext = () => {
      const delay = randExp(lambdaPerSec) * 1000;
      spawnerRef.current = window.setTimeout(() => {
        setNewFlower(Math.random(), Math.random());
        scheduleNext();
      }, delay);
    };
    scheduleNext();

    // --- MAIN LOOP: continuous ping-pong pass ---
    const loop = () => {
      const dt = clock.getDelta();
      shaderMat.uniforms.u_stop_time.value += dt;
      shaderMat.uniforms.u_time.value = clock.elapsedTime;

      // 1) read previous buffer
      shaderMat.uniforms.u_texture.value = ping.texture;
      // 2) draw one step into pong
      renderer.setRenderTarget(pong);
      renderer.render(shaderScene, camera);
      renderer.setRenderTarget(null);
      // 3) swap
      swap();
      // 4) blit to screen
      renderer.render(mainScene, camera);

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (spawnerRef.current) clearTimeout(spawnerRef.current);
      ro.disconnect();
      renderer.dispose();
      rtA.dispose();
      rtB.dispose();
      planeGeo.dispose();
      screenMat.dispose();
      shaderMat.dispose();
    };
  }, [lambdaPerSec, bg]);

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1, background: "transparent" }}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
