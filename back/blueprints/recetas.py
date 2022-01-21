# flask
from models.usuario_receta import UsuarioReceta
from models.usuario_ingrediente import UsuarioIngrediente
from flask import Blueprint,jsonify,request,g

#models
from models.conexion_bd import Session
from models.receta import Receta
from models.ingrediente import Ingrediente
from models.receta_ingrediente import RecetaIngrediente
from .auth import login_required
bp = Blueprint('recetas', __name__, url_prefix='/recetas')


@bp.route('/', methods=['GET'])
def consultar_lista_recetas():
    session = Session()
    recetas = session.query(Receta).all()
    recetas = [x.to_dict() for x in recetas]
    session.close()
    return jsonify(recetas)

@bp.route('/recomendaciones/', methods=['GET'])
def consultar_recomendaciones():
    session = Session()
    recetas = session.query(Receta).all()
    recetas = [x.to_dict() for x in recetas]
    session.close()
    return jsonify(recetas)

@bp.route('/<id>', methods=['GET'])
def consultar_receta(id):
    session = Session()
    receta = session.query(Receta).get(id).to_dict()
    session.close()
    return jsonify(receta)

@bp.route('/search/<query>', methods=['GET'])
def buscar_recetas(query):
    session = Session()
    recetas = session.query(Receta).filter(Receta.nombre.like('%{}%'.format(query)))
    recetas = [x.to_dict() for x in recetas]
    session.close()
    return jsonify(recetas)

@bp.route('/categorias', methods=['GET'])
def obten_categorias():
    session = Session()
    recetas = session.query(Receta).all()
    categorias = [categoria for receta in recetas for categoria in receta.tipo.split(', ')]
    sin_duplicados = []
    [sin_duplicados.append(x) for x in categorias if x not in sin_duplicados]
    session.close()
    return jsonify(sin_duplicados)

@bp.route('/seguimiento', methods=['GET'])
@login_required
def seguimiento_recetas():
    session = Session()
    print("ENTREEEEE")
    print(g.user)
    seguimiento_recetas= session.query(UsuarioReceta).filter(UsuarioReceta.nombre_usuario==g.user['username']).all()
    recetas = []
    for rec in seguimiento_recetas:
        receta=session.query(Receta).get(rec.receta_id)
        recetas.append(receta.to_dict())
    return jsonify({'recetas':recetas})

@bp.route('/<id>', methods=['DELETE'])
@login_required
def eliminar_seguimiento_receta(id):
  session = Session()
  seguimiento=session.query(UsuarioReceta).query.get((id,g.user['username']))
  session.delete(seguimiento)
  session.commit()
  return jsonify("server: Se ha eliminado el seguimiento de la receta")


@bp.route('/agrega', methods=['POST'])
def agrega_receta():
  session = Session()
  nombre = request.json['nombre'].strip().lower()
  imagen = request.json['imagen']
  pasos = request.json['pasos']
  tiempo = request.json['tiempo']
  categorias = request.json['categorias']
  ingredientes = request.json['ingredientes']

  descripcion = ""
  for paso in pasos:
    print("AAAA " + str(paso) )
    descripcion +=  "• " + paso["descripcion"] + "\n"

  receta = Receta(nombre, imagen, descripcion, tiempo, categorias)

  try:
    session.add(receta)
    session.commit()
  except:
    session.rollback()
    return jsonify(dict(mensaje= "server: Ha ocurrido un error, porfavor intentelo mas tarde")), 500 

  for _ingrediente in ingredientes:
      nombre = _ingrediente["nombre"]
      cantidad = _ingrediente["cantidad"]
      medicion = _ingrediente["medida"]
      ingrediente = session.query(Ingrediente).filter(Ingrediente.nombre==nombre).first()
      receta_ingrediente = RecetaIngrediente(receta, ingrediente, cantidad, medicion)
      try:
        session.add(receta_ingrediente)
        session.commit()
      except:
        session.rollback()

  return jsonify("server: Receta registrada con éxito.")



@bp.route('/agrega/ingrediente', methods=['POST'])
def agrega_ingrediente():
  session    = Session()
  nombre     = request.json['nombre'].strip().lower()
  proteinas  = request.json['proteinas']
  grasas     = request.json['grasas']
  calorias   = request.json['calorias']
  categorias = request.json['categorias'].strip().lower()

  nuevo_ingrediente = Ingrediente(nombre, proteinas, calorias, grasas, categorias)
  
  try:
    session.add(nuevo_ingrediente)
    session.commit()
  except:
    session.rollback()
    return jsonify(dict(mensaje= "server: Ha ocurrido un error, porfavor intentelo mas tarde")), 500 
  return jsonify("server: Ingrediente registrado con exito.")