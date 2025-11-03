// footer.js
// Load Font Awesome nếu chưa load trong project
if (!document.querySelector('script[src*="fontawesome"]')) {
  const faScript = document.createElement("script");
  faScript.src = "https://kit.fontawesome.com/a076d05399.js";
  faScript.crossOrigin = "anonymous";
  document.body.appendChild(faScript);
}
