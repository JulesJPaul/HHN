document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll("[data-interest]").forEach(link => {
  link.addEventListener("click", () => {
    sessionStorage.setItem("julesInterest", link.dataset.interest);
  });
});
