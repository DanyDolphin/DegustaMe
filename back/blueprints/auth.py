# flask
from flask import Blueprint, json,jsonify,request,g,current_app
from flask.wrappers import Response
from werkzeug.security import  generate_password_hash, check_password_hash

# JWT
import jwt

# functools
from functools import wraps

#models
from models.conexion_bd import Session
from models.usuario import Usuario

# Forms
'''
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, FloatField, TextAreaField, BooleanField
from wtforms.validators import InputRequired, Length, ValidationError, Email
'''


bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/registro', methods=['POST'])
def registrarse():
  session = Session()
  nombre_usuario = request.json['usuario']
  correo = request.json['correo']
  contrasena=request.json['contrasena']
  genero=request.json['genero']
  altura=request.json['altura']
  peso=request.json['peso']
  edad=request.json['edad']
  padecimiento=request.json['padecimiento']
  tipo_dieta=request.json['tipo_dieta']
  usuario = Usuario(nombre_usuario, correo, generate_password_hash(contrasena), edad, peso, padecimiento, genero, tipo_dieta, altura)
  print(usuario)
  usr = session.query(Usuario).get(nombre_usuario)
  corr= session.query(Usuario).filter(Usuario.correo==correo).first()

  if usr or corr:
    msg="username" if usr else "correo" 
    return jsonify(dict(
      mensaje= "server: El {msg} ya se encuentra en uso"
    )), 400
  try:
    session.add(usuario)
    session.commit()
  except:
    session.rollback()
    return jsonify(dict(
      mensaje= "server: Ha ocurrido un error intenta mas tarde")), 500 

  return jsonify("server: Usuario registrado.")


@bp.route('/login', methods=['POST'])
def iniciar_sesion():
  session = Session()

  user = session.query(Usuario).filter(Usuario.nombre_usuario == request.json['usuario']).first()

  if user and check_password_hash(user.contrasena, request.json['contrasena']):
    token = jwt.encode({'sub': user.nombre_usuario}, current_app.config['SECRET_KEY'])
    print("Excelente")
    print(token)
    return jsonify({'token' : token})
  else:
    return jsonify(dict(
      mensaje='usuario o contraseña incorrectos'
    )), 401


@bp.route('/logout', methods=['POST'])
def cerrar_sesion():
  pass

@bp.before_app_request
def load_user():
  '''
  Funcion que carga la informacion del usuario en la variable g.user
  si el request tiene el token como header. Tambien se agrega una bandera
  es_comprador a g.user que indica si el usuario que realiza la peticion
  es un comprador o un vendedor
  '''
  token = None
  if 'Authorization' in request.headers:
    # Authorization: Bearer ...
    token = request.headers['Authorization'][7:]
  if token is None:
    g.user = None
  else:
    data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
    session = Session()
    
    user = session.query(Usuario).get(data['sub'])
    
    if user is None:
      g.user = None
    else:
      user_dict = dict(
        username=user.nombre_usuario,
        correo=user.correo
      )
      g.user = user_dict


def login_required(controlador):
  '''
  Decorador que devuelve un error 401 Unauthorized
  si es que no se pudo obtener la informacion del usuario
  en la variable g. Se ejecuta antes del controlador con este decorador
  '''
  @wraps(controlador)
  def nuevo_controlador(**kwargs):
    if not (g.user):
      return jsonify({'mensaje': 'usuario no autorizado'}), 401
    return controlador(**kwargs)
  return nuevo_controlador
  
