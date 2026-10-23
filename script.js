(() => {
  const CONTACT_TEXT = `Contacto profesional — ANHETech ERP™

Ing. Fanor José Angulo C.
CEO · Desarrollador principal
ANHETech ERP™

Teléfono / WhatsApp empresarial: +57 318 265 6464
Correo empresarial: ANHETECHERP@gmail.com

Celular / WhatsApp personal: +57 318 744 1999
Correo personal: ingjoseanca@gmail.com

Sitio web: https://rutamerito.github.io/ANHETech-ERP/
LinkedIn del CEO: https://www.linkedin.com/in/fanor-jose-angulo-c-6a9a9626b
Facebook: https://www.facebook.com/Concursa365
TikTok: https://www.tiktok.com/@rutaalmerito/video/7680729418909617416

Tarjeta digital: https://rutamerito.github.io/ANHETech-Tarjeta-Digital/`;

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
