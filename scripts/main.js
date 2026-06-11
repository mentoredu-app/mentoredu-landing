// =========================
// FAQ
// =========================
document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".faq-question").forEach(button => {

    button.addEventListener("click", () => {

      const item = button.parentElement;
      item.classList.toggle("active");

      const icon = item.querySelector(".faq-icon");

      icon.textContent = item.classList.contains("active") ? "-" : "+";

    });

  });

});


// =========================
// HAMBURGER MENU
// =========================
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");

hamburger.addEventListener("click", () => {

  nav.classList.toggle("active");

  hamburger.textContent =
    nav.classList.contains("active") ? "✕" : "☰";

});

document.querySelectorAll(".nav a").forEach(link => {

  link.addEventListener("click", () => {
    nav.classList.remove("active");
    hamburger.textContent = "☰";
  });

});

document.addEventListener("click", (e) => {

  if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
    nav.classList.remove("active");
    hamburger.textContent = "☰";
  }

});


// =========================
// TESTIMONIOS SLIDER
// =========================
const testimonios = [
  {
    texto: '”Antes de MentorEdu, compartir mis materiales con los estudiantes era complicado. Ahora subo un PDF y llega a quienes realmente lo necesitan. Ver cómo resuelven mis ejercicios y poder darles retroalimentación real es lo que más valoro.”',
    nombre: “Carlos Mendoza”,
    iniciales: “CM”,
    color: “#0070E0”
  },
  {
    texto: '”El ciclo de ejercicio, resolución y feedback es lo que diferencia a MentorEdu. No es solo compartir archivos, es un proceso de aprendizaje activo que beneficia tanto al estudiante como al docente.”',
    nombre: “José Ramírez”,
    iniciales: “JR”,
    color: “#7C3AED”
  },
  {
    texto: '”La verificación oficial le da seriedad a la plataforma. Los estudiantes saben que están recibiendo material de docentes reales. Eso genera confianza y los motiva a participar más.”',
    nombre: “Luis Herrera”,
    iniciales: “LH”,
    color: “#0891B2”
  }
];

let index = 0;

function updateTestimonio() {
  const t = testimonios[index];
  document.getElementById("testimonio-text").innerText = t.texto;
  document.getElementById("testimonio-nombre").innerText = t.nombre;
  const avatar = document.getElementById("testimonio-avatar");
  avatar.textContent = t.iniciales;
  avatar.style.background = t.color;
}

function nextTestimonio() {
  index = (index + 1) % testimonios.length;
  updateTestimonio();
}

function prevTestimonio() {
  index = (index - 1 + testimonios.length) % testimonios.length;
  updateTestimonio();
}

// hacer funciones globales (porque usas onclick en HTML)
window.nextTestimonio = nextTestimonio;
window.prevTestimonio = prevTestimonio;


// =========================
// CONTACT FORM
// =========================
const CONTACT_API = "https://mentoredu-api.onrender.com/api/v1/contact";

document.getElementById("cta-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name        = document.getElementById("cta-nombre").value.trim();
  const email       = document.getElementById("cta-email").value.trim();
  const phone       = document.getElementById("cta-tel").value.trim();
  const category    = document.getElementById("cta-categoria").value;
  const institution = document.getElementById("cta-inst").value.trim();
  const feedback    = document.getElementById("cta-feedback");
  const submitBtn   = e.target.querySelector("button[type=submit]");

  if (!name || !email) {
    showFeedback(feedback, "Por favor completa tu nombre y correo.", "error");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Enviando…";

  try {
    const res = await fetch(CONTACT_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, category, institution })
    });

    if (res.ok) {
      showFeedback(feedback, "¡Mensaje enviado! Te contactaremos pronto.", "success");
      e.target.reset();
    } else {
      showFeedback(feedback, "Ocurrió un error. Intenta de nuevo.", "error");
    }
  } catch {
    showFeedback(feedback, "Sin conexión. Intenta de nuevo más tarde.", "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Enviar consulta";
  }
});

function showFeedback(el, message, type) {
  el.textContent = message;
  el.className = "cta-feedback cta-feedback--" + type;
}