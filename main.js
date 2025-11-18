// ------------------------------------
// 🌌 PARTÍCULAS FLUTUANDO SUAVES
// ------------------------------------
function initFloatingParticles() {
  const wrapper = document.querySelector(".header__text-wrap");
  if (!wrapper) return;

  const canvas = document.createElement("canvas");
  canvas.id = "bgCanvas";
  wrapper.prepend(canvas);

  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = wrapper.offsetWidth;
    canvas.height = wrapper.offsetHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const PARTICLES = 35;

  let particles = [];

  for (let i = 0; i < PARTICLES; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 2 + Math.random() * 4,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: 0.2 + Math.random() * 0.5,
    });
  }

  function draw() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      const gradient = ctx.createRadialGradient(
        p.x,
        p.y,
        0,
        p.x,
        p.y,
        p.size * 4
      );

      gradient.addColorStop(0, `rgba(91, 24, 251, ${p.alpha})`);
      gradient.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -50) p.x = canvas.width + 50;
      if (p.x > canvas.width + 50) p.x = -50;
      if (p.y < -50) p.y = canvas.height + 50;
      if (p.y > canvas.height + 50) p.y = -50;
    });

    requestAnimationFrame(draw);
  }

  draw();
}

document.addEventListener("DOMContentLoaded", initFloatingParticles);

function typingEffect() {
  const element = document.querySelector(".typing-word");
  if (!element) return;

  const word = "Front-end";
  let index = 0;
  let isDeleting = false;

  function type() {
    if (!isDeleting) {
      element.textContent = word.substring(0, index + 1);
      index++;

      if (index === word.length) {
        setTimeout(() => {
          isDeleting = true;
          type();
        }, 3000);
        return;
      }
    } else {
      element.textContent = word.substring(0, index - 1);
      index--;

      if (index === 0) {
        isDeleting = false;
      }
    }

    setTimeout(type, isDeleting ? 120 : 180);
  }

  type();
}

document.addEventListener("DOMContentLoaded", typingEffect);
