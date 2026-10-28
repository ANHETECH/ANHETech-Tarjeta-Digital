(() => {
  const CONTACT_TEXT = `ANHETech ERP™

Soluciones tecnológicas para empresas.

Servicios: desarrollo web, aplicaciones móviles y de escritorio, software a medida, ERP, automatización y marketing digital.

WhatsApp empresarial: +57 318 265 6464

Sitio web: https://anhetech.github.io/ANHETech-ERP/`;

  const shareWhatsapp = document.querySelector("[data-share-whatsapp]");
  if (shareWhatsapp) {
    shareWhatsapp.href = `https://wa.me/573182656464?text=${encodeURIComponent(CONTACT_TEXT)}`;
  }

  const copyButton = document.querySelector("[data-copy-contact]");
  const status = document.getElementById("share-status");
  if (!copyButton || !status) return;

  let statusTimer;

  const showStatus = (message) => {
    status.textContent = message;
    window.clearTimeout(statusTimer);
    statusTimer = window.setTimeout(() => {
      status.textContent = "";
    }, 3500);
  };

  const fallbackCopy = () => {
    const field = document.createElement("textarea");
    field.value = CONTACT_TEXT;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.top = "-1000px";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    field.setSelectionRange(0, field.value.length);

    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch (error) {
      copied = false;
    }

    field.remove();
    return copied;
  };

  copyButton.addEventListener("click", async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(CONTACT_TEXT);
        showStatus("Texto copiado.");
        return;
      }

      if (fallbackCopy()) {
        showStatus("Texto copiado.");
      } else {
        showStatus("No se pudo copiar. Selecciona el texto manualmente.");
      }
    } catch (error) {
      if (fallbackCopy()) {
        showStatus("Texto copiado.");
      } else {
        showStatus("No se pudo copiar. Selecciona el texto manualmente.");
      }
    }
  });
})();
