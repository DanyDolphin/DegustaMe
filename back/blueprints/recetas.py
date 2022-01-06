# flask
from flask import Blueprint,jsonify,request,g

#models
from models.conexion_bd import Session
from models.receta import Receta
from models.ingrediente import Ingrediente

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