# flask
from flask import Blueprint,jsonify

#models
from models.conexion_bd import Session
from models.ingrediente import Ingrediente

bp = Blueprint('ingredientes', __name__, url_prefix='/ingredientes')

@bp.route('/', methods=['GET'])
def consultar_lista_ingredientes():
    session = Session()
    ingredientes = session.query(Ingrediente).all()
    session.close()
    return jsonify([r.to_dict() for r in ingredientes])

@bp.route('/search/<query>', methods=['GET'])
def buscar_ingredientes(query):
    session = Session()
    ingredientes = session.query(Ingrediente).filter(Ingrediente.nombre.like('%{}%'.format(query)))
    session.close()
    return jsonify([i.to_dict() for i in ingredientes])