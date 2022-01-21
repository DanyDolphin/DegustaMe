# flask
from models.usuario_receta import UsuarioReceta
from models.usuario_ingrediente import UsuarioIngrediente
from flask import Blueprint,jsonify,request,g

#models
from models.conexion_bd import Session
from models.receta import Receta
from models.usuario import Usuario
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
    seguimiento=session.query(UsuarioReceta).get((id,g.user['username']))
    session.delete(seguimiento)
    session.commit()
    return jsonify("server: Se ha eliminado el seguimiento de la receta")


@bp.route('/seguimiento/agrega/<idReceta>', methods=['POST'])
def agregar_seguimiento_receta(idReceta):
    session = Session()
    receta  = session.query(Receta).filter_by(receta_id=idReceta).first()
    usuario = session.query(Usuario).get(g.user['username'])
    nuevo_seguimiento = UsuarioReceta(receta, usuario)
    if (receta is None):
      return jsonify({"error": 100, "mensaje": "La receta <" + str(receta.receta_id) + "> no existe."})
    if (usuario is None):
      return jsonify({"error": 200, "mensaje": "El usuario <" + str(usuario.nombre_usuario) + "> no existe."})
    try:
      session.add(nuevo_seguimiento)
      session.commit()
    except:
      session.rollback()
      return jsonify({"error": 300, "mensaje": "Ocurrio un error al querer dar seguimiento a la receta <" + str(receta.receta_id) + ">"})
    return jsonify({"server": "Se ha agregado el seguimiento de la receta <" + str(receta.receta_id) + "> para el usuario <"+ str(usuario.nombre_usuario) +"> correctamente"})


@bp.route('/seguimiento/verifica/<idReceta>', methods=['GET'])
def verifica_seguimiento_receta(idReceta):
    session = Session()
    receta  = session.query(Receta).filter_by(receta_id=idReceta).first()
    usuario = session.query(Usuario).get(g.user['username'])
    if (receta is None):
      return jsonify({"error": 100, "mensaje": "La receta <" + str(receta.receta_id) + "> no existe."})
    if (usuario is None):
      return jsonify({"error": 200, "mensaje": "El usuario <" + str(usuario.nombre_usuario) + "> no existe."})

    seguimiento = session.query(UsuarioReceta).get((idReceta,g.user['username']))
    if (seguimiento == None ):
      return jsonify({"valor": False })
    return jsonify({"valor": True })


@bp.route('/agrega', methods=['POST'])
def agrega_receta():
    session = Session()
    nombre = request.json['nombre'].strip().lower()
    imagen = request.json['imagen']
    pasos = request.json['pasos']
    tiempo = request.json['tiempo']
    categorias = request.json['categorias'].strip()
    ingredientes = request.json['ingredientes']

    descripcion = ""
    for paso in pasos:
      descripcion +=  "• " + paso["descripcion"].strip() + "\n"

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

    return jsonify({"mensaje": "Se agregó la receta <" + str(nombre) + "> correctamente"})


@bp.route('/elimina/<idReceta>', methods=['DELETE'])
def elimina_receta(idReceta):  
    session = Session()
    receta_eliminar = session.query(Receta).filter_by(receta_id=idReceta).first()
    if (receta_eliminar is None):
      return jsonify({"error": 100, "mensaje": "La receta <" + str(idReceta) + "> no existe."})
    try:
      session.delete(receta_eliminar)
      session.commit()
    except:
      session.rollback()
      return jsonify({"error": 200, "mensaje": "Ocurrio un error al eliminar la receta <" + str(idReceta) + ">"})
    return jsonify({"mensaje": "Se eliminó la receta <" + str(idReceta) + "> correctamente"})

