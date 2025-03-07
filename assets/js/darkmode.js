// Funkce pro nastavení tématu
function setTheme(themeName) {
  const html = document.querySelector("html");
  html.setAttribute("data-theme", themeName);
  localStorage.setItem("theme", themeName);
}

// Funkce pro přepínání tématu
function toggleTheme() {
  const currentTheme = localStorage.getItem("theme") || "dark";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);

  // Aktualizace checkbox stavu
  const toggleSwitch = document.querySelector("#theme-toggle");
  if (toggleSwitch) {
    toggleSwitch.checked = newTheme === "light";
  }
}

// Funkce pro inicializaci tématu při načtení stránky
function initTheme() {
  // Výchozí tmavý režim, pokud není nic uloženo
  const savedTheme = localStorage.getItem("theme") || "dark";
  setTheme(savedTheme);

  // Aktualizace checkbox stavu
  const toggleSwitch = document.querySelector("#theme-toggle");
  if (toggleSwitch) {
    toggleSwitch.checked = savedTheme === "light";
  }
}

// Přidání přepínače tématu do stránky
function addThemeToggle() {
  const toggleHtml = `
    <div class="theme-switch-wrapper">
      <label class="theme-switch" for="theme-toggle">
        <input type="checkbox" id="theme-toggle" onclick="toggleTheme()"/>
        <div class="slider">
          <div class="slider-icons">
            <span>🌙</span>
            <span>☀️</span>
          </div>
        </div>
      </label>
    </div>
  `;

  document.body.insertAdjacentHTML("afterbegin", toggleHtml);
}

// Přidat kontejner pro banner, pokud ještě neexistuje
function setupBanner() {
  // Hledáme div s třídou banner-container a banner
  const existingBanner = document.querySelector(".banner-container");
  if (existingBanner) return; // Banner již existuje

  // Hledáme první centrovaný div obsahující banner obrázek
  const centerDiv = document.querySelector('div[align="center"]');
  if (!centerDiv) return;

  const bannerImg = centerDiv.querySelector('img[src*="miccy-dev-banner.png"]');
  if (!bannerImg) return;

  // Vytvoření nového banner kontejneru
  const bannerContainer = document.createElement("div");
  bannerContainer.className = "banner-container";

  // Najdeme h1 a p v centrovaném divu
  const h1 = centerDiv.querySelector("h1");
  const p = centerDiv.querySelector("p");

  if (!h1 || !p) return;

  // Přesuňme obrázek do banneru
  bannerImg.classList.add("banner-image");
  bannerContainer.appendChild(bannerImg);

  // Vytvoříme overlay text
  const bannerText = document.createElement("div");
  bannerText.className = "banner-text";

  // Klon h1 a p do textového overlay
  bannerText.appendChild(h1.cloneNode(true));
  bannerText.appendChild(p.cloneNode(true));

  // Vložení textového overlay do banneru
  bannerContainer.appendChild(bannerText);

  // Nahrazení původního obsahu banner kontejnerem
  centerDiv.innerHTML = "";
  centerDiv.appendChild(bannerContainer);

  // Přidání paddingu
  bannerContainer.style.padding = "30px 0";

  console.log("Banner setup completed");
}

// Spustit vše při načtení stránky
document.addEventListener("DOMContentLoaded", function () {
  addThemeToggle();
  setTimeout(setupBanner, 100); // Mírné zpoždění pro zajištění načtení DOM
  initTheme();
});
