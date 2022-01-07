// DOM
$title = document.getElementById('title')
$type = document.getElementById('type')
$time = document.getElementById('time')
$ingredients = document.getElementById('ingredients')
$description = document.getElementById('description')
$calorias = document.getElementById('calorias')
$grasas = document.getElementById('grasas')
$proteinas = document.getElementById('proteinas')

// Ajax
const obtenReceta = async (id) => {
  let res;
  try {
    res = await fetch(`${API_BASE}/recetas/${id}`);
    if (res.status >= 300) throw Error(resonse.statusText);
    res = await res.json();
  } catch (error) {
    console.log(error);
    return;
  }

  $title.innerHTML = res.nombre
  $type.innerHTML = res.tipo
  $time.innerHTML = res.tiempo + ' min'
  $ingredients.innerHTML = res.ingredientes
    .map(ingrediente => `
      <li>${ingrediente.nombre} - ${ingrediente.cantidad} ${ingrediente.medida}</li>
    `)
    .join('\n')
  console.log(res.descripcion)
  $description.innerHTML = res.descripcion.replace(/\n/g, '<br/>')
  $calorias.innerHTML = res.calorias + ' kcal'
  $grasas.innerHTML = res.grasas + ' gr'
  $proteinas.innerHTML = res.proteinas + ' gr'
}

const params = new URLSearchParams(window.location.search)
if (params.has('id'))
  // load receip
  obtenReceta(params.get('id'));
else
  // redirect to receips list
  window.location.href = '/recetas/'