const DATA_URL = "https://raw.githubusercontent.com/WantedGang/WG-TRepo/master/repo.json";
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
        <td><img src="${item.icon || ''}" alt="" width="32"/></td>
        <td>${item.name || ""}</td>
        <td>${item.type || ""}</td>
        <td>${item.description || ""}</td>
        <td>${item.lang || ""}</td>
        <td>${item.version || ""}</td>
      </tr>
    `;
  });
}

fetch(DATA_URL)
  .then(r => r.json())
  .then(json => {
    // repo.json yapısında "plugins" dizisi var
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
    (e.type || "").toLowerCase().includes(val) ||
    (e.description || "").toLowerCase().includes(val)
  );
  renderTable(filtered);
});
