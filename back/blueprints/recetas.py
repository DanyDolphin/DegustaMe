# flask
from models.usuario_receta import UsuarioReceta
from models.usuario_ingrediente import UsuarioIngrediente
from flask import Blueprint,jsonify,request,g

#models
from models.conexion_bd import Session
from models.receta import Receta
from models.ingrediente import Ingrediente
from .auth import login_required
bp = Blueprint('recetas', __name__, url_prefix='/recetas')


@bp.route('/', methods=['GET'])
def consultar_lista_recetas():
    session = Session()
    recetas = session.query(Receta).all()
    r = []
    for receta in recetas:
        ingredientes = receta.obten_lista_ingredientes(session)
        receta = receta.to_dict()
        receta['ingredientes'] = ingredientes
        r.append(receta)
    session.close()
    return jsonify(r)

@bp.route('/<id>', methods=['GET'])
def consultar_receta(id):
    session = Session()
    receta = session.query(Receta).get(id)
    ingredientes = receta.obten_lista_ingredientes(session)
    receta = receta.to_dict()
    receta['ingredientes'] = ingredientes
    session.close()
    return jsonify(receta)

@bp.route('/search/<query>', methods=['GET'])
def buscar_recetas(query):
    session = Session()
    recetas = session.query(Receta).filter(Receta.nombre.like('%{}%'.format(query)))
    r = []
    for receta in recetas:
        ingredientes = receta.obten_lista_ingredientes(session)
        receta = receta.to_dict()
        receta['ingredientes'] = ingredientes
        r.append(receta)
    session.close()
    return jsonify(r)



@bp.route('/seguimiento', methods=['GET'])
@login_required
def seguimiento_recetas():
    session = Session()
    #seguimiento_ingredientes= session.query(UsuarioIngrediente).filter(UsuarioIngrediente.nombre_usuario==g.usuario.nombre_usuario)
    seguimiento_recetas= session.query(UsuarioReceta).filter(UsuarioReceta.nombre_usuario==g.usuario.nombre_usuario).all()
    ingredientes = []
    recetas = []
    #for ing in seguimiento_ingredientes:
    #    ingrediente=session.query(Ingrediente).get(ing.ingrediente_id)
    #    ingredientes.append(ingrediente.to_dict())
    for rec in seguimiento_recetas:
        receta=session.query(Receta).get(rec.receta_id)
        recetas.append(receta.to_dict())
    return jsonify({'recetas':recetas})

@bp.route('/<id>', methods=['DELETE'])
@login_required
def eliminar_seguimiento_receta(id):
  session = Session()
  seguimiento=session.query(UsuarioReceta).query.get((id,g.usuario.nombre_usuario))
  session.delete(seguimiento)
  session.commit()
  return jsonify("server: Se ha eliminado el seguimiento de la receta")

    