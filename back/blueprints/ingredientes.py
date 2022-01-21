# flask
from flask import Blueprint,jsonify,request

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


@bp.route('/agrega', methods=['POST'])
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