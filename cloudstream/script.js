const DATA_URL = "TRepo_mevcut.json";
const table = document.querySelector("table");
const tbody = document.getElementById("eklentiTablo");
const searchInput = document.getElementById("searchInput");
const loading = document.getElementById("loading");
const hata = document.getElementById("hata");

let allPlugins = [];

function renderTable(items) {
  tbody.innerHTML = "";
  items.forEach(item => {
    tbody.innerHTML += `
      <tr>
        <td><img src="${item.iconUrl || ''}" alt="" width="32"/></td>
        <td>${item.name || ""}</td>
        <td>${item.description || ""}</td>
        <td>${(item.tvTypes || []).join(", ")}</td>
        <td>${item.language || ""}</td>
        <td>${item.version || ""}</td>
        <td>${(item.authors || []).join(", ")}</td>
      </tr>
    `;
  });
}

fetch(DATA_URL)
  .then(r => r.json())
  .then(json => {
    allPlugins = json.plugins || [];
    renderTable(allPlugins);
    loading.style.display = "none";
    table.style.display = "";
  })
  .catch(() => {
    hata.style.display = "";
    loading.style.display = "none";
  });

searchInput.addEventListener("input", function() {
  const val = this.value.toLowerCase();
  const filtered = allPlugins.filter(e =>
    (e.name || "").toLowerCase().includes(val) ||
    (e.description || "").toLowerCase().includes(val) ||
    (e.tvTypes || []).join(", ").toLowerCase().includes(val) ||
    (e.authors || []).join(", ").toLowerCase().includes(val)
  );
  renderTable(filtered);
});
