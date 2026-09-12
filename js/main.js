const config = window.HHN_CONFIG || {};
const listings = window.HHN_LISTINGS || [];

document.querySelectorAll("#year").forEach(element => { element.textContent = new Date().getFullYear(); });

document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
  const query = link.getAttribute("href").split("?")[1];
  link.href = `mailto:${config.person.email}${query ? `?${query}` : ""}`;
});

document.querySelectorAll('[data-contact="phone"]').forEach(link => { link.href = `tel:${config.person.phone}`; });

document.querySelectorAll("[data-booking]").forEach(link => {
  link.href = config.booking?.[link.dataset.booking] || link.href;
});

const introVideo = document.querySelector("#intro-video");
const videoPlayToggle = document.querySelector(".video-play-toggle");
if (introVideo && videoPlayToggle) {
  const toggleIntroVideo = () => { introVideo.paused ? introVideo.play() : introVideo.pause(); };
  videoPlayToggle.addEventListener("click", toggleIntroVideo);
  introVideo.addEventListener("click", toggleIntroVideo);
  introVideo.addEventListener("play", () => videoPlayToggle.classList.add("is-hidden"));
  introVideo.addEventListener("pause", () => videoPlayToggle.classList.remove("is-hidden"));
  introVideo.addEventListener("ended", () => { introVideo.currentTime = 0; });
}

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");
if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const open = navigation.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(open));
  });
}

document.querySelectorAll("[data-interest]").forEach(link => {
  link.addEventListener("click", () => sessionStorage.setItem("julesInterest", link.dataset.interest));
});

function favoriteIds() {
  try { return JSON.parse(localStorage.getItem(config.storageKeys.favorites) || "[]"); } catch { return []; }
}

function renderListings() {
  const grid = document.querySelector("#listing-grid");
  if (!grid) return;
  const status = document.querySelector("#listing-status")?.value || "";
  const city = document.querySelector("#listing-city")?.value || "";
  const keyword = (document.querySelector("#listing-keyword")?.value || "").toLowerCase().trim();
  const favorites = favoriteIds();
  const matches = listings.filter(property => (!status || property.status === status) && (!city || property.city === city) && (!keyword || `${property.city} ${property.type} ${property.description}`.toLowerCase().includes(keyword)));
  grid.innerHTML = matches.length ? matches.map(property => `
    <article class="listing-card">
      <img src="${property.image}" alt="${property.type} in ${property.city}">
      <div class="listing-body"><div class="listing-meta"><span>${property.status}</span><button class="favorite-button ${favorites.includes(property.id) ? "is-saved" : ""}" data-favorite="${property.id}" aria-label="${favorites.includes(property.id) ? "Remove" : "Save"} ${property.address}">${favorites.includes(property.id) ? "Saved" : "Save"}</button></div>
      <h3>${property.price}</h3><p class="listing-address">${property.address}</p><p>${property.beds} beds · ${property.baths} baths · ${property.type}</p><a class="text-link" href="property.html?id=${property.id}">View property details →</a></div>
    </article>`).join("") : `<p class="empty-state">No properties match those filters. Try a different search or contact Jules.</p>`;
  const count = document.querySelector("#listing-count");
  if (count) count.textContent = `${matches.length} ${matches.length === 1 ? "property" : "properties"}`;
  grid.querySelectorAll("[data-favorite]").forEach(button => button.addEventListener("click", () => {
    const next = favoriteIds(); const index = next.indexOf(button.dataset.favorite);
    if (index >= 0) next.splice(index, 1); else next.push(button.dataset.favorite);
    localStorage.setItem(config.storageKeys.favorites, JSON.stringify(next)); renderListings();
  }));
}

document.querySelectorAll("#listing-status, #listing-city, #listing-keyword").forEach(control => control.addEventListener("input", renderListings));
renderListings();

const propertyContent = document.querySelector("#property-content");
if (propertyContent) {
  const property = listings.find(item => item.id === new URLSearchParams(location.search).get("id"));
  if (!property) {
    propertyContent.innerHTML = `<h1>Property not found</h1><p>That listing may have changed. Browse current properties to find another option.</p><a class="btn btn-gold" href="first-world-realty.html#listings">Browse listings</a>`;
  } else {
    document.title = `${property.address} | First World Realty Group`;
    propertyContent.innerHTML = `<img class="property-image" src="${property.image}" alt="${property.type} in ${property.city}"><p class="eyebrow">${property.status} · ${property.type}</p><h1>${property.price}</h1><h2>${property.address}</h2><p class="property-copy">${property.description}</p><p>${property.beds} bedrooms · ${property.baths} bathrooms</p><div class="hero-actions"><a class="btn btn-gold" data-contact="email" href="mailto:${config.person.email}">Ask about this property</a><a class="btn btn-outline-dark" href="first-world-realty.html#listings">Back to listings</a></div>`;
    propertyContent.querySelector("[data-contact]").href = `mailto:${config.person.email}?subject=Inquiry%20about%20${encodeURIComponent(property.address)}`;
  }
}

document.querySelectorAll("[data-intake-form]").forEach(form => {
  const savedInterest = sessionStorage.getItem("julesInterest");
  const interest = form.querySelector("[name=interest]");
  if (savedInterest && interest && !interest.value) interest.value = savedInterest;
  form.addEventListener("submit", event => {
    event.preventDefault();
    const endpoint = config.forms[form.dataset.intakeForm];
    const data = new FormData(form);
    const body = [...data.entries()].map(([key, value]) => `${key}: ${value}`).join("\n");
    window.location.href = `${endpoint}&body=${encodeURIComponent(body)}`;
  });
});
