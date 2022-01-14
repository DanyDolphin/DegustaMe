// DOM declarations
const $loader = document.getElementById("loader");
const $empty = document.getElementById("empty");
const $list = document.getElementById("list");
const $title = document.getElementById("title");
const $search = document.getElementById("search");

// Utilities
const buildRecetasList = (recetas) =>
  recetas
    .map(
      (receta) =>
        `
      <div class="d-flex mb-2 py-4 px-3 bg-lightgrey cursor-pointer"
        onclick="onRecetaClick(${receta.receta_id})">
        <div class="col-md-8">
          <p class="h2">${receta.nombre}</p>
          <p>${receta.tipo}</p>
        </div>
        <div class="col-md-4">
          <ul>
            <li>Calorías: ${receta.calorías}</li>
            <li>Grasas: ${receta.grasas}</li>
            <li>Proteinas: ${receta.proteinas}</li>
          </ul>
        </div>
      </div>
      `
    )
    .join("\n");

// Ajax
const obtenRecetas = async () => {
  $loader.classList.remove("visually-hidden");

  let res;
  try {
    res = await fetch(`${API_BASE}/recetas/`);
    if (res.status >= 300) throw Error(resonse.statusText);
    res = await res.json();
  } catch (error) {
    console.log(error);
    return;
  }

  if (!res.length) $empty.classList.remove("visually-hidden");
  else $list.innerHTML = buildRecetasList(res)
  
  $loader.classList.add("visually-hidden");
};

const buscarRecetas = async (query) => {
  $loader.classList.remove("visually-hidden");
  $title.innerHTML = `
    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    &nbsp;coincidencias para <b>"${query}"</b>
  `;

  let res;
  try {
    res = await fetch(`${API_BASE}/recetas/search/${encodeURIComponent(query)}`);
    if (res.status >= 300) throw Error(resonse.statusText);
    res = await res.json();
  } catch (error) {
    console.log(error);
    return;
  }

  if (!res.length) $empty.classList.remove("visually-hidden");
  else $list.innerHTML = buildRecetasList(res)

  $loader.classList.add("visually-hidden");
  $title.innerHTML = `<b>${res.length}</b> coincidencias para <b>"${query}"</b>`;
};

// Event listeners
const onSearchSubmit = e => {
  e.preventDefault();
  window.location.href = `/recetas/?query=${encodeURIComponent($search.value)}`
}

const onRecetaClick = id => {
  window.location.href = `/receta/?id=${id}`
}

const params = new URLSearchParams(window.location.search)
if (params.has('query'))
  // check for query params
  buscarRecetas(params.get('query'))
else
  // display all receips
  obtenRecetas();
