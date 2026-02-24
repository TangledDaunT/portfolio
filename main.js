/* ═══════════════════════════════════════════════════
   MAIN.JS — Portfolio Interactive Effects
   ReactBits-inspired: cursor, tilt, magnetic, reveal
   ═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── PARTICLE BACKGROUND (ReactBits Particles — vanilla port) ────────────
  // Config mirrors ReactBits <Particles /> component props from reactbits.dev
  const PARTICLE_CONFIG = {
    particleColors: ['#ffffff'],
    particleCount: 200,
    particleSpread: 10,
    speed: 0.1,
    particleBaseSize: 100,
    moveParticlesOnHover: true,
    particleHoverFactor: 1,
    alphaParticles: false,
    sizeRandomness: 1,
    cameraDistance: 20,
    disableRotation: false,
    pixelRatio: 1,
  };

  const particleContainer = document.getElementById('particles-bg');
  if (particleContainer && typeof ogl !== 'undefined') {
    const cfg = PARTICLE_CONFIG;
    const { Renderer, Camera, Geometry, Program, Mesh } = ogl;

    const renderer = new Renderer({ dpr: cfg.pixelRatio, depth: false, alpha: true });
    const gl = renderer.gl;
    particleContainer.appendChild(gl.canvas);
    gl.clearColor(0, 0, 0, 0);

    const camera = new Camera(gl, { fov: 15 });
    camera.position.set(0, 0, cfg.cameraDistance);

    const resize = () => {
      const w = particleContainer.clientWidth;
      const h = particleContainer.clientHeight;
      renderer.setSize(w, h);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    };
    window.addEventListener('resize', resize, false);
    resize();

    // Mouse tracking relative to container bounds
    const mouse = { x: 0, y: 0 };
    if (cfg.moveParticlesOnHover) {
      particleContainer.addEventListener('mousemove', function (e) {
        const rect = particleContainer.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      });
    }

    // Hex to [r, g, b] (0-1)
    function hexToRgb(hex) {
      hex = hex.replace(/^#/, '');
      if (hex.length === 3) {
        hex = hex.split('').map(function (c) { return c + c; }).join('');
      }
      var int = parseInt(hex, 16);
      return [
        ((int >> 16) & 255) / 255,
        ((int >> 8) & 255) / 255,
        (int & 255) / 255
      ];
    }

    var defaultColors = ['#ffffff', '#ffffff', '#ffffff'];
    var palette = cfg.particleColors && cfg.particleColors.length > 0
      ? cfg.particleColors : defaultColors;

    const count = cfg.particleCount;
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count * 4);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      let x, y, z, len;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
        len = x * x + y * y + z * z;
      } while (len > 1 || len === 0);
      const r = Math.cbrt(Math.random());
      positions.set([x * r, y * r, z * r], i * 3);
      randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
      var col = hexToRgb(palette[Math.floor(Math.random() * palette.length)]);
      colors.set(col, i * 3);
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      random: { size: 4, data: randoms },
      color: { size: 3, data: colors }
    });

    const vertex = `
      attribute vec3 position;
      attribute vec4 random;
      attribute vec3 color;

      uniform mat4 modelMatrix;
      uniform mat4 viewMatrix;
      uniform mat4 projectionMatrix;
      uniform float uTime;
      uniform float uSpread;
      uniform float uBaseSize;
      uniform float uSizeRandomness;

      varying vec4 vRandom;
      varying vec3 vColor;

      void main() {
        vRandom = random;
        vColor = color;

        vec3 pos = position * uSpread;
        pos.z *= 10.0;

        vec4 mPos = modelMatrix * vec4(pos, 1.0);
        float t = uTime;
        mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
        mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
        mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);

        vec4 mvPos = viewMatrix * mPos;
        if (uSizeRandomness == 0.0) {
          gl_PointSize = uBaseSize;
        } else {
          gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
        }

        gl_Position = projectionMatrix * mvPos;
      }
    `;

    const fragment = `
      precision highp float;

      uniform float uTime;
      uniform float uAlphaParticles;
      varying vec4 vRandom;
      varying vec3 vColor;

      void main() {
        vec2 uv = gl_PointCoord.xy;
        float d = length(uv - vec2(0.5));

        if(uAlphaParticles < 0.5) {
          if(d > 0.5) {
            discard;
          }
          gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);
        } else {
          float circle = smoothstep(0.5, 0.4, d) * 0.8;
          gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);
        }
      }
    `;

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uSpread: { value: cfg.particleSpread },
        uBaseSize: { value: cfg.particleBaseSize * cfg.pixelRatio },
        uSizeRandomness: { value: cfg.sizeRandomness },
        uAlphaParticles: { value: cfg.alphaParticles ? 1 : 0 },
      },
      transparent: true,
      depthTest: false
    });

    const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program });

    let lastTime = performance.now();
    let elapsed = 0;

    function updateParticles(t) {
      requestAnimationFrame(updateParticles);
      const delta = t - lastTime;
      lastTime = t;
      elapsed += delta * cfg.speed;

      program.uniforms.uTime.value = elapsed * 0.001;

      if (cfg.moveParticlesOnHover) {
        particles.position.x = -mouse.x * cfg.particleHoverFactor;
        particles.position.y = -mouse.y * cfg.particleHoverFactor;
      } else {
        particles.position.x = 0;
        particles.position.y = 0;
      }

      if (!cfg.disableRotation) {
        particles.rotation.x = Math.sin(elapsed * 0.0002) * 0.1;
        particles.rotation.y = Math.cos(elapsed * 0.0005) * 0.15;
        particles.rotation.z += 0.01 * cfg.speed;
      }

      renderer.render({ scene: particles, camera });
    }
    requestAnimationFrame(updateParticles);
  }

  // ─── CUSTOM CURSOR ───────────────────────────────
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  let mouseX = 0, mouseY = 0;
  let dotX = 0, dotY = 0;
  let ringX = 0, ringY = 0;
  const isTouchDevice = 'ontouchstart' in window;

  if (!isTouchDevice && dot && ring) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Smooth cursor animation loop
    function animateCursor() {
      // Dot — fast follow
      dotX += (mouseX - dotX) * 0.25;
      dotY += (mouseY - dotY) * 0.25;
      dot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;

      // Ring — slower follow
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor hover states
    const hoverTargets = document.querySelectorAll('a, button, .btn-primary, .btn-secondary, .lab-item, .skill-tag, .about-card, .arch-flow-node');
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
    });
  } else {
    // Hide cursor elements on touch
    if (dot) dot.style.display = 'none';
    if (ring) ring.style.display = 'none';
  }

  // ─── BLUR TEXT HERO ANIMATION (reactbits BlurText) ──
  const heroHeading = document.getElementById('hero-heading');
  if (heroHeading) {
    const text = heroHeading.textContent;
    heroHeading.innerHTML = '';
    text.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.className = 'blur-char';
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.animationDelay = `${0.3 + i * 0.08}s`;
      heroHeading.appendChild(span);
    });
  }

  // ─── NAVIGATION SCROLL EFFECT ────────────────────
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }
  }, { passive: true });

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // ─── SCROLL REVEAL (IntersectionObserver) ────────
  const revealClasses = ['reveal', 'reveal-left', 'reveal-right', 'reveal-scale', 'stagger-children'];

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealClasses.forEach((cls) => {
    document.querySelectorAll(`.${cls}`).forEach((el) => {
      revealObserver.observe(el);
    });
  });

  // ─── TILT CARD EFFECT (reactbits-inspired) ───────
  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;

      // Mouse position for radial gradient highlight
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  // ─── REFLECTIVE CARD TILT ────────────────────────
  const heroTilt = document.getElementById('reflective-card');
  if (heroTilt) {
    heroTilt.addEventListener('mousemove', (e) => {
      const rect = heroTilt.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      heroTilt.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    heroTilt.addEventListener('mouseleave', () => {
      heroTilt.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
    });
  }

  // ─── MAGNETIC BUTTONS (reactbits Magnet) ─────────
  const magneticEls = document.querySelectorAll('.magnetic');

  magneticEls.forEach((el) => {
    const strength = parseInt(el.dataset.strength) || 15;

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      el.style.transform = `translate(${x / (100 / strength)}px, ${y / (100 / strength)}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)';
      el.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    el.addEventListener('mouseenter', () => {
      el.style.transition = 'transform 0.1s ease-out';
    });
  });

  // ─── CARD MOUSE GRADIENT (for non-tilt cards) ───
  const gradientCards = document.querySelectorAll('.skill-category, .lab-item');
  gradientCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
  });

  // ─── SMOOTH SCROLL FOR NAV LINKS ────────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        const navHeight = nav ? nav.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });



  // ─── ARCHITECTURE FLOW NODE STAGGER ─────────────
  const archNodes = document.querySelectorAll('.arch-flow-node');
  const archObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const nodes = entry.target.querySelectorAll('.arch-flow-node');
        const connectors = entry.target.querySelectorAll('.arch-flow-connector');

        nodes.forEach((node, i) => {
          node.style.opacity = '0';
          node.style.transform = 'translateY(16px)';
          setTimeout(() => {
            node.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            node.style.opacity = '1';
            node.style.transform = 'translateY(0)';
          }, i * 120);
        });

        connectors.forEach((conn, i) => {
          conn.style.opacity = '0';
          setTimeout(() => {
            conn.style.transition = 'opacity 0.4s ease-out';
            conn.style.opacity = '1';
          }, i * 120 + 80);
        });

        archObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const archFlow = document.querySelector('.arch-flow');
  if (archFlow) {
    archObserver.observe(archFlow);
  }

  // ─── SKILL TAG RANDOM GLOW ON SCROLL ────────────
  const skillTags = document.querySelectorAll('.skill-tag');
  let lastGlowTime = 0;

  window.addEventListener('scroll', () => {
    const now = Date.now();
    if (now - lastGlowTime < 2000) return;
    lastGlowTime = now;

    const tagsInView = Array.from(skillTags).filter((tag) => {
      const rect = tag.getBoundingClientRect();
      return rect.top > 0 && rect.bottom < window.innerHeight;
    });

    if (tagsInView.length > 0) {
      const randomTag = tagsInView[Math.floor(Math.random() * tagsInView.length)];
      randomTag.style.color = 'var(--accent)';
      randomTag.style.borderColor = 'var(--accent-border)';
      randomTag.style.background = 'var(--accent-glow)';
      setTimeout(() => {
        randomTag.style.color = '';
        randomTag.style.borderColor = '';
        randomTag.style.background = '';
      }, 1200);
    }
  }, { passive: true });
  // ─── INFINITE MENU (ReactBits InfiniteMenu — vanilla port) ────
  (function initInfiniteMenus() {
    if (typeof glMatrix === 'undefined') return;
    var mat4 = glMatrix.mat4;
    var quat = glMatrix.quat;
    var vec2 = glMatrix.vec2;
    var vec3 = glMatrix.vec3;

    // ── Shaders ──
    var discVertSrc = [
      '#version 300 es',
      'uniform mat4 uWorldMatrix;',
      'uniform mat4 uViewMatrix;',
      'uniform mat4 uProjectionMatrix;',
      'uniform vec3 uCameraPosition;',
      'uniform vec4 uRotationAxisVelocity;',
      'in vec3 aModelPosition;',
      'in vec3 aModelNormal;',
      'in vec2 aModelUvs;',
      'in mat4 aInstanceMatrix;',
      'out vec2 vUvs;',
      'out float vAlpha;',
      'flat out int vInstanceId;',
      '#define PI 3.141593',
      'void main() {',
      '  vec4 worldPosition = uWorldMatrix * aInstanceMatrix * vec4(aModelPosition, 1.);',
      '  vec3 centerPos = (uWorldMatrix * aInstanceMatrix * vec4(0., 0., 0., 1.)).xyz;',
      '  float radius = length(centerPos.xyz);',
      '  if (gl_VertexID > 0) {',
      '    vec3 rotationAxis = uRotationAxisVelocity.xyz;',
      '    float rotationVelocity = min(.15, uRotationAxisVelocity.w * 15.);',
      '    vec3 stretchDir = normalize(cross(centerPos, rotationAxis));',
      '    vec3 relativeVertexPos = normalize(worldPosition.xyz - centerPos);',
      '    float strength = dot(stretchDir, relativeVertexPos);',
      '    float invAbsStrength = min(0., abs(strength) - 1.);',
      '    strength = rotationVelocity * sign(strength) * abs(invAbsStrength * invAbsStrength * invAbsStrength + 1.);',
      '    worldPosition.xyz += stretchDir * strength;',
      '  }',
      '  worldPosition.xyz = radius * normalize(worldPosition.xyz);',
      '  gl_Position = uProjectionMatrix * uViewMatrix * worldPosition;',
      '  vAlpha = smoothstep(0.5, 1., normalize(worldPosition.xyz).z) * .9 + .1;',
      '  vUvs = aModelUvs;',
      '  vInstanceId = gl_InstanceID;',
      '}'
    ].join('\n');

    var discFragSrc = [
      '#version 300 es',
      'precision highp float;',
      'uniform sampler2D uTex;',
      'uniform int uItemCount;',
      'uniform int uAtlasSize;',
      'out vec4 outColor;',
      'in vec2 vUvs;',
      'in float vAlpha;',
      'flat in int vInstanceId;',
      'void main() {',
      '  int itemIndex = vInstanceId % uItemCount;',
      '  int cellsPerRow = uAtlasSize;',
      '  int cellX = itemIndex % cellsPerRow;',
      '  int cellY = itemIndex / cellsPerRow;',
      '  vec2 cellSize = vec2(1.0) / vec2(float(cellsPerRow));',
      '  vec2 cellOffset = vec2(float(cellX), float(cellY)) * cellSize;',
      '  ivec2 texSize = textureSize(uTex, 0);',
      '  float imageAspect = float(texSize.x) / float(texSize.y);',
      '  float containerAspect = 1.0;',
      '  float scale = max(imageAspect / containerAspect, containerAspect / imageAspect);',
      '  vec2 st = vec2(vUvs.x, 1.0 - vUvs.y);',
      '  st = (st - 0.5) * scale + 0.5;',
      '  st = clamp(st, 0.0, 1.0);',
      '  st = st * cellSize + cellOffset;',
      '  outColor = texture(uTex, st);',
      '  outColor.a *= vAlpha;',
      '}'
    ].join('\n');

    // ── WebGL helpers ──
    function createShader(gl, type, source) {
      var shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
      console.error(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    function createProgram(gl, vertSrc, fragSrc, attribLocations) {
      var prog = gl.createProgram();
      if (!prog) return null;
      var vs = createShader(gl, gl.VERTEX_SHADER, vertSrc);
      var fs = createShader(gl, gl.FRAGMENT_SHADER, fragSrc);
      if (vs) gl.attachShader(prog, vs);
      if (fs) gl.attachShader(prog, fs);
      if (attribLocations) {
        for (var name in attribLocations) {
          if (attribLocations.hasOwnProperty(name)) {
            gl.bindAttribLocation(prog, attribLocations[name], name);
          }
        }
      }
      gl.linkProgram(prog);
      if (gl.getProgramParameter(prog, gl.LINK_STATUS)) return prog;
      console.error(gl.getProgramInfoLog(prog));
      gl.deleteProgram(prog);
      return null;
    }

    function makeBuffer(gl, data, usage) {
      var buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, data, usage);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      return buf;
    }

    function makeVertexArray(gl, bufLocPairs, indices) {
      var va = gl.createVertexArray();
      gl.bindVertexArray(va);
      for (var i = 0; i < bufLocPairs.length; i++) {
        var buf = bufLocPairs[i][0], loc = bufLocPairs[i][1], num = bufLocPairs[i][2];
        if (loc === -1) continue;
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, num, gl.FLOAT, false, 0, 0);
      }
      if (indices) {
        var ib = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
      }
      gl.bindVertexArray(null);
      return va;
    }

    function createTexture(gl) {
      var tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      return tex;
    }

    function resizeCanvas(canvas) {
      var dpr = Math.min(2, window.devicePixelRatio || 1);
      var dw = Math.round(canvas.clientWidth * dpr);
      var dh = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== dw || canvas.height !== dh) {
        canvas.width = dw;
        canvas.height = dh;
        return true;
      }
      return false;
    }

    // ── Geometry classes ──
    function DiscGeometry(steps, radius) {
      steps = Math.max(4, steps || 56);
      radius = radius || 1;
      var alpha = 2 * Math.PI / steps;
      var verts = [0, 0, 0];
      var uvs = [0.5, 0.5];
      var faces = [];
      for (var i = 0; i < steps; i++) {
        var x = Math.cos(alpha * i);
        var y = Math.sin(alpha * i);
        verts.push(radius * x, radius * y, 0);
        uvs.push(x * 0.5 + 0.5, y * 0.5 + 0.5);
        if (i > 0) faces.push(0, i, i + 1);
      }
      faces.push(0, steps, 1);
      this.vertices = new Float32Array(verts);
      this.uvs = new Float32Array(uvs);
      this.indices = new Uint16Array(faces);
    }

    function IcosahedronGeometry() {
      var t = Math.sqrt(5) * 0.5 + 0.5;
      var v = [
        -1, t, 0, 1, t, 0, -1, -t, 0, 1, -t, 0,
        0, -1, t, 0, 1, t, 0, -1, -t, 0, 1, -t,
        t, 0, -1, t, 0, 1, -t, 0, -1, -t, 0, 1
      ];
      var f = [
        0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11,
        1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8,
        3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9,
        4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1
      ];
      // Subdivide once
      var verts = v.slice();
      var midCache = {};
      function getMid(a, b) {
        var key = a < b ? a + '_' + b : b + '_' + a;
        if (midCache[key] !== undefined) return midCache[key];
        var ax = verts[a * 3], ay = verts[a * 3 + 1], az = verts[a * 3 + 2];
        var bx = verts[b * 3], by = verts[b * 3 + 1], bz = verts[b * 3 + 2];
        var ndx = verts.length / 3;
        verts.push((ax + bx) * 0.5, (ay + by) * 0.5, (az + bz) * 0.5);
        midCache[key] = ndx;
        return ndx;
      }
      var newF = [];
      for (var i = 0; i < f.length; i += 3) {
        var a = f[i], b = f[i + 1], c = f[i + 2];
        var mAB = getMid(a, b), mBC = getMid(b, c), mCA = getMid(c, a);
        newF.push(a, mAB, mCA, b, mBC, mAB, c, mCA, mBC, mAB, mBC, mCA);
      }
      // Spherize
      var RADIUS = 2;
      var positions = [];
      var count = verts.length / 3;
      for (var j = 0; j < count; j++) {
        var px = verts[j * 3], py = verts[j * 3 + 1], pz = verts[j * 3 + 2];
        var len = Math.sqrt(px * px + py * py + pz * pz);
        positions.push(RADIUS * px / len, RADIUS * py / len, RADIUS * pz / len);
      }
      this.positions = positions; // flat array [x,y,z, x,y,z, ...]
      this.vertexCount = count;
    }

    // ── ArcballControl ──
    function ArcballControl(canvas, updateCb) {
      this.canvas = canvas;
      this.updateCb = updateCb || function () {};
      this.isPointerDown = false;
      this.orientation = quat.create();
      this.pointerRotation = quat.create();
      this.rotationVelocity = 0;
      this.rotationAxis = vec3.fromValues(1, 0, 0);
      this.snapDirection = vec3.fromValues(0, 0, -1);
      this.snapTargetDirection = null;
      this._pointerPos = vec2.create();
      this._prevPointerPos = vec2.create();
      this._rotVel = 0;
      this._combinedQ = quat.create();
      var EPSILON = 0.1;
      var IDENT = quat.create();
      var self = this;

      canvas.addEventListener('pointerdown', function (e) {
        vec2.set(self._pointerPos, e.clientX, e.clientY);
        vec2.copy(self._prevPointerPos, self._pointerPos);
        self.isPointerDown = true;
      });
      canvas.addEventListener('pointerup', function () { self.isPointerDown = false; });
      canvas.addEventListener('pointerleave', function () { self.isPointerDown = false; });
      canvas.addEventListener('pointermove', function (e) {
        if (self.isPointerDown) vec2.set(self._pointerPos, e.clientX, e.clientY);
      });
      canvas.style.touchAction = 'none';

      function project(pos) {
        var r = 2, w = canvas.clientWidth, h = canvas.clientHeight, s = Math.max(w, h) - 1;
        var x = (2 * pos[0] - w - 1) / s;
        var y = (2 * pos[1] - h - 1) / s;
        var z, xySq = x * x + y * y, rSq = r * r;
        if (xySq <= rSq / 2) z = Math.sqrt(rSq - xySq);
        else z = rSq / Math.sqrt(xySq);
        return vec3.fromValues(-x, y, z);
      }

      function quatFromVecs(a, b, out, af) {
        var axis = vec3.cross(vec3.create(), a, b);
        vec3.normalize(axis, axis);
        var d = Math.max(-1, Math.min(1, vec3.dot(a, b)));
        var angle = Math.acos(d) * af;
        quat.setAxisAngle(out, axis, angle);
      }

      this.update = function (dt, tfd) {
        tfd = tfd || 16;
        var ts = dt / tfd + 0.00001;
        var af = ts;
        var snapR = quat.create();

        if (self.isPointerDown) {
          var INT = 0.3 * ts;
          var AMP = 5 / ts;
          var mid = vec2.sub(vec2.create(), self._pointerPos, self._prevPointerPos);
          vec2.scale(mid, mid, INT);
          if (vec2.sqrLen(mid) > EPSILON) {
            vec2.add(mid, self._prevPointerPos, mid);
            var p = project(mid), q = project(self._prevPointerPos);
            var a = vec3.normalize(vec3.create(), p);
            var b = vec3.normalize(vec3.create(), q);
            vec2.copy(self._prevPointerPos, mid);
            af *= AMP;
            quatFromVecs(a, b, self.pointerRotation, af);
          } else {
            quat.slerp(self.pointerRotation, self.pointerRotation, IDENT, INT);
          }
        } else {
          var INT2 = 0.1 * ts;
          quat.slerp(self.pointerRotation, self.pointerRotation, IDENT, INT2);
          if (self.snapTargetDirection) {
            var SNAP = 0.2;
            var aa = self.snapTargetDirection, bb = self.snapDirection;
            var sqD = vec3.squaredDistance(aa, bb);
            var dF = Math.max(0.1, 1 - sqD * 10);
            af *= SNAP * dF;
            quatFromVecs(aa, bb, snapR, af);
          }
        }
        var combined = quat.multiply(quat.create(), snapR, self.pointerRotation);
        self.orientation = quat.multiply(quat.create(), combined, self.orientation);
        quat.normalize(self.orientation, self.orientation);

        var RA_INT = 0.8 * ts;
        quat.slerp(self._combinedQ, self._combinedQ, combined, RA_INT);
        quat.normalize(self._combinedQ, self._combinedQ);

        var rad = Math.acos(Math.min(1, Math.max(-1, self._combinedQ[3]))) * 2;
        var ss = Math.sin(rad / 2);
        var rv = 0;
        if (ss > 0.000001) {
          rv = rad / (2 * Math.PI);
          self.rotationAxis[0] = self._combinedQ[0] / ss;
          self.rotationAxis[1] = self._combinedQ[1] / ss;
          self.rotationAxis[2] = self._combinedQ[2] / ss;
        }
        var RV_INT = 0.5 * ts;
        self._rotVel += (rv - self._rotVel) * RV_INT;
        self.rotationVelocity = self._rotVel / ts;
        self.updateCb(dt);
      };
    }

    // ── InfiniteGridMenu ──
    function InfiniteGridMenu(canvas, items, scale) {
      var self = this;
      scale = scale || 1;
      var SPHERE_RADIUS = 2;
      var TFD = 1000 / 60;

      // Camera
      var cam = {
        matrix: mat4.create(),
        near: 0.1, far: 40,
        fov: Math.PI / 4,
        aspect: 1,
        position: vec3.fromValues(0, 0, 3 * scale),
        up: vec3.fromValues(0, 1, 0),
        view: mat4.create(),
        proj: mat4.create(),
        invProj: mat4.create()
      };

      var gl = canvas.getContext('webgl2', { antialias: true, alpha: false });
      if (!gl) return;

      var prog = createProgram(gl, discVertSrc, discFragSrc, {
        aModelPosition: 0, aModelNormal: 1, aModelUvs: 2, aInstanceMatrix: 3
      });
      if (!prog) return;

      var loc = {
        aModelPosition: gl.getAttribLocation(prog, 'aModelPosition'),
        aModelUvs: gl.getAttribLocation(prog, 'aModelUvs'),
        aInstanceMatrix: gl.getAttribLocation(prog, 'aInstanceMatrix'),
        uWorldMatrix: gl.getUniformLocation(prog, 'uWorldMatrix'),
        uViewMatrix: gl.getUniformLocation(prog, 'uViewMatrix'),
        uProjectionMatrix: gl.getUniformLocation(prog, 'uProjectionMatrix'),
        uCameraPosition: gl.getUniformLocation(prog, 'uCameraPosition'),
        uScaleFactor: gl.getUniformLocation(prog, 'uScaleFactor'),
        uRotationAxisVelocity: gl.getUniformLocation(prog, 'uRotationAxisVelocity'),
        uTex: gl.getUniformLocation(prog, 'uTex'),
        uFrames: gl.getUniformLocation(prog, 'uFrames'),
        uItemCount: gl.getUniformLocation(prog, 'uItemCount'),
        uAtlasSize: gl.getUniformLocation(prog, 'uAtlasSize')
      };

      // Disc geometry
      var disc = new DiscGeometry(56, 1);
      var vao = makeVertexArray(gl, [
        [makeBuffer(gl, disc.vertices, gl.STATIC_DRAW), loc.aModelPosition, 3],
        [makeBuffer(gl, disc.uvs, gl.STATIC_DRAW), loc.aModelUvs, 2]
      ], disc.indices);

      // Icosahedron positions (subdivided + spherized)
      var ico = new IcosahedronGeometry();
      var instancePositions = [];
      for (var ip = 0; ip < ico.vertexCount; ip++) {
        instancePositions.push(vec3.fromValues(
          ico.positions[ip * 3], ico.positions[ip * 3 + 1], ico.positions[ip * 3 + 2]
        ));
      }
      var INSTANCE_COUNT = ico.vertexCount;

      // Instance matrices
      var matricesArray = new Float32Array(INSTANCE_COUNT * 16);
      var matrices = [];
      for (var mi = 0; mi < INSTANCE_COUNT; mi++) {
        var inst = new Float32Array(matricesArray.buffer, mi * 64, 16);
        mat4.identity(inst);
        matrices.push(inst);
      }
      var instBuffer = gl.createBuffer();
      gl.bindVertexArray(vao);
      gl.bindBuffer(gl.ARRAY_BUFFER, instBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, matricesArray.byteLength, gl.DYNAMIC_DRAW);
      for (var j = 0; j < 4; j++) {
        var l = loc.aInstanceMatrix + j;
        gl.enableVertexAttribArray(l);
        gl.vertexAttribPointer(l, 4, gl.FLOAT, false, 64, j * 16);
        gl.vertexAttribDivisor(l, 1);
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      gl.bindVertexArray(null);

      // Texture atlas
      var itemCount = Math.max(1, items.length);
      var atlasSize = Math.ceil(Math.sqrt(itemCount));
      var cellSize = 512;
      var atlasCanvas = document.createElement('canvas');
      var actx = atlasCanvas.getContext('2d');
      atlasCanvas.width = atlasSize * cellSize;
      atlasCanvas.height = atlasSize * cellSize;

      var tex = createTexture(gl);
      // Placeholder 1x1 white pixel until images load
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 255]));

      Promise.all(items.map(function (item) {
        return new Promise(function (resolve) {
          var img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = function () { resolve(img); };
          img.onerror = function () { resolve(null); };
          img.src = item.image;
        });
      })).then(function (images) {
        images.forEach(function (img, i) {
          if (!img) return;
          var x = (i % atlasSize) * cellSize;
          var y = Math.floor(i / atlasSize) * cellSize;
          actx.drawImage(img, x, y, cellSize, cellSize);
        });
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, atlasCanvas);
        gl.generateMipmap(gl.TEXTURE_2D);
      });

      // World matrix
      var worldMatrix = mat4.create();

      // Control
      var control = new ArcballControl(canvas, function (dt) {
        onControlUpdate(dt);
      });
      var smoothRV = 0;
      var movementActive = false;
      var _time = 0, _dt = 0, _dFrames = 0, _frames = 0;

      function updateCameraMatrix() {
        mat4.targetTo(cam.matrix, cam.position, [0, 0, 0], cam.up);
        mat4.invert(cam.view, cam.matrix);
      }

      function updateProjectionMatrix() {
        cam.aspect = canvas.clientWidth / canvas.clientHeight;
        var h = SPHERE_RADIUS * 0.35;
        var d = cam.position[2];
        if (cam.aspect > 1) cam.fov = 2 * Math.atan(h / d);
        else cam.fov = 2 * Math.atan(h / cam.aspect / d);
        mat4.perspective(cam.proj, cam.fov, cam.aspect, cam.near, cam.far);
        mat4.invert(cam.invProj, cam.proj);
      }

      function onControlUpdate(dt) {
        var ts = dt / TFD + 0.0001;
        var damping = 5 / ts;
        var camZ = 3 * scale;
        if (!control.isPointerDown) {
          var ni = findNearestVertex();
          var snapD = vec3.normalize(vec3.create(), getVertexWorldPos(ni));
          control.snapTargetDirection = snapD;
        } else {
          camZ += control.rotationVelocity * 80 + 2.5;
          damping = 7 / ts;
        }
        cam.position[2] += (camZ - cam.position[2]) / damping;
        updateCameraMatrix();
      }

      function findNearestVertex() {
        var n = control.snapDirection;
        var invO = quat.conjugate(quat.create(), control.orientation);
        var nt = vec3.transformQuat(vec3.create(), n, invO);
        var maxD = -1, best = 0;
        for (var i = 0; i < instancePositions.length; i++) {
          var d = vec3.dot(nt, instancePositions[i]);
          if (d > maxD) { maxD = d; best = i; }
        }
        return best;
      }

      function getVertexWorldPos(idx) {
        return vec3.transformQuat(vec3.create(), instancePositions[idx], control.orientation);
      }

      function resize() {
        resizeCanvas(canvas);
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        updateProjectionMatrix();
      }

      function animate(dt) {
        control.update(dt, TFD);
        var positions = instancePositions.map(function (p) {
          return vec3.transformQuat(vec3.create(), p, control.orientation);
        });
        var scaleVal = 0.25;
        var SCALE_INT = 0.6;
        positions.forEach(function (p, ndx) {
          var s = (Math.abs(p[2]) / SPHERE_RADIUS) * SCALE_INT + (1 - SCALE_INT);
          var fs = s * scaleVal;
          var m = mat4.create();
          mat4.multiply(m, m, mat4.fromTranslation(mat4.create(), vec3.negate(vec3.create(), p)));
          mat4.multiply(m, m, mat4.targetTo(mat4.create(), [0, 0, 0], p, [0, 1, 0]));
          mat4.multiply(m, m, mat4.fromScaling(mat4.create(), [fs, fs, fs]));
          mat4.multiply(m, m, mat4.fromTranslation(mat4.create(), [0, 0, -SPHERE_RADIUS]));
          mat4.copy(matrices[ndx], m);
        });
        gl.bindBuffer(gl.ARRAY_BUFFER, instBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, matricesArray);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        smoothRV = control.rotationVelocity;
      }

      function render() {
        gl.useProgram(prog);
        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.uniformMatrix4fv(loc.uWorldMatrix, false, worldMatrix);
        gl.uniformMatrix4fv(loc.uViewMatrix, false, cam.view);
        gl.uniformMatrix4fv(loc.uProjectionMatrix, false, cam.proj);
        gl.uniform3f(loc.uCameraPosition, cam.position[0], cam.position[1], cam.position[2]);
        gl.uniform4f(loc.uRotationAxisVelocity, control.rotationAxis[0], control.rotationAxis[1], control.rotationAxis[2], smoothRV * 1.1);
        gl.uniform1i(loc.uItemCount, items.length);
        gl.uniform1i(loc.uAtlasSize, atlasSize);
        gl.uniform1f(loc.uFrames, _frames);
        gl.uniform1f(loc.uScaleFactor, scale);
        gl.uniform1i(loc.uTex, 0);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.bindVertexArray(vao);
        gl.drawElementsInstanced(gl.TRIANGLES, disc.indices.length, gl.UNSIGNED_SHORT, 0, INSTANCE_COUNT);
        gl.bindVertexArray(null);
      }

      updateCameraMatrix();
      updateProjectionMatrix();
      resize();

      window.addEventListener('resize', resize);

      // Run loop
      function run(time) {
        time = time || 0;
        _dt = Math.min(32, time - _time);
        _time = time;
        _dFrames = _dt / TFD;
        _frames += _dFrames;
        animate(_dt);
        render();
        requestAnimationFrame(run);
      }
      requestAnimationFrame(run);
    }

    // ── Init each canvas ──
    var canvases = document.querySelectorAll('.infinite-menu-canvas');
    canvases.forEach(function (canvas) {
      var items;
      try { items = JSON.parse(canvas.dataset.items); } catch (e) { return; }
      if (!items || !items.length) return;
      new InfiniteGridMenu(canvas, items, 1);
    });
  })();

  // ─── CARD SWAP (ReactBits CardSwap — vanilla port, no GSAP) ────
  (function initCardSwaps() {
    var containers = document.querySelectorAll('.card-swap-container[data-cards]');

    containers.forEach(function (container) {
      var cardsData;
      try { cardsData = JSON.parse(container.dataset.cards); } catch (e) { return; }
      if (!cardsData || !cardsData.length) return;

      var total = cardsData.length;
      var distX = parseInt(container.dataset.cardDistance) || 60;
      var distY = parseInt(container.dataset.verticalDistance) || 70;
      var delay = parseInt(container.dataset.delay) || 5000;
      var skew = parseInt(container.dataset.skew) || 6;

      // Elastic easing via CSS cubic-bezier approximation
      var EASE = 'cubic-bezier(0.34, 1.56, 0.64, 1)';
      var DUR_DROP = '1.2s';
      var DUR_MOVE = '1.2s';
      var DUR_RETURN = '1.2s';

      // Create card elements
      var cardEls = cardsData.map(function (data) {
        var card = document.createElement('div');
        card.className = 'swap-card';

        var title = document.createElement('span');
        title.className = 'swap-card-title';
        title.textContent = data.title;
        card.appendChild(title);

        var tagsWrap = document.createElement('div');
        tagsWrap.className = 'swap-card-tags';
        (data.tags || []).forEach(function (t) {
          var tag = document.createElement('span');
          tag.className = 'swap-card-tag';
          tag.textContent = t;
          tagsWrap.appendChild(tag);
        });
        card.appendChild(tagsWrap);

        container.appendChild(card);
        return card;
      });

      function placeCard(el, slotIndex, animate) {
        var x = slotIndex * distX;
        var y = -slotIndex * distY;
        var z = -slotIndex * distX * 1.5;
        var zIndex = total - slotIndex;

        if (!animate) {
          el.style.transition = 'none';
        } else {
          el.style.transition = 'transform ' + DUR_MOVE + ' ' + EASE;
        }
        el.style.transform =
          'translate(-50%, -50%) translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px) skewY(' + skew + 'deg)';
        el.style.zIndex = zIndex;
      }

      // Initial placement
      var order = [];
      for (var i = 0; i < total; i++) order.push(i);
      order.forEach(function (idx, slot) { placeCard(cardEls[idx], slot, false); });
      container.offsetHeight; // force reflow

      function swapFront() {
        var frontIdx = order[0];
        var frontEl = cardEls[frontIdx];

        // Drop front card down
        frontEl.style.transition = 'transform ' + DUR_DROP + ' ' + EASE;
        frontEl.style.transform =
          'translate(-50%, -50%) translate3d(0px, 600px, 0px) skewY(' + skew + 'deg)';
        frontEl.style.zIndex = 0;

        // Promote remaining cards
        setTimeout(function () {
          var rest = order.slice(1);
          rest.forEach(function (idx, slot) {
            placeCard(cardEls[idx], slot, true);
          });

          // Return front card to back
          setTimeout(function () {
            placeCard(frontEl, total - 1, true);
            order = rest.concat([frontIdx]);
          }, 200);
        }, 300);
      }

      // Start cycling
      var interval = setInterval(swapFront, delay);
      setTimeout(swapFront, 2000);

      // Pause on hover
      container.addEventListener('mouseenter', function () { clearInterval(interval); });
      container.addEventListener('mouseleave', function () {
        interval = setInterval(swapFront, delay);
      });
    });
  })();

  // ─── ABOUT PHOTO MOUSE-REACTIVE TILT ────────────
  var aboutPhoto = document.getElementById('about-photo');
  if (aboutPhoto) {
    aboutPhoto.addEventListener('mousemove', function (e) {
      var rect = aboutPhoto.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var centerX = rect.width / 2;
      var centerY = rect.height / 2;

      var rotateX = ((y - centerY) / centerY) * -10;
      var rotateY = ((x - centerX) / centerX) * 10;

      aboutPhoto.style.transform =
        'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-4px)';

      aboutPhoto.style.setProperty('--mouse-x', x + 'px');
      aboutPhoto.style.setProperty('--mouse-y', y + 'px');
    });

    aboutPhoto.addEventListener('mouseleave', function () {
      aboutPhoto.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  }

})();
