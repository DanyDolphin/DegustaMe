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

@bp.route('/signin', methods=['POST'])
def registrarse():
  session = Session()
  username = request.json['username']
  correo = request.json['correo']
  contrasena= request.json['contrasena']
  
  usuario=Usuario(username,correo,generate_password_hash(contrasena))
  
  usr=session.query(usuario.__class__).get(username)
  corr= session.query(usuario.__class__).filter(usuario.__class__.correo ==correo).first()

  if usr or corr:
    msg="username" if usr else "correo" 
    return jsonify(f"server: El {msg} ya se encuentra en uso"), 400

  try:
    session.add(usuario)
    session.commit()
  except:
    session.rollback()
    return jsonify("server: Ha ocurrido un error intenta mas tarde"), 401

  return jsonify("server: Usuario registrado.")

'''
class LoginForm(FlaskForm):
  username = StringField(validators=[InputRequired(), Length(min=4, max=20)])
  password = PasswordField(validators=[InputRequired(), Length(min=4, max=20)])
  es_comprador = BooleanField(validators=[InputRequired()])
  submit = SubmitField("Continuar")
'''

@bp.route('/login', methods=['POST'])
def iniciar_sesion():
  session = Session()
  
  user = session.query(Usuario).filter(Usuario.username == request.json['username']).first()

  if user and check_password_hash(user.contrasenia, request.json['password']):
    token = jwt.encode({'sub': user.username}, current_app.config['SECRET_KEY'])
    return jsonify({'token' : token.decode('UTF-8')})
  else:
    return jsonify(dict(
      mensaje='usuario o contraseña incorrectos'
    )), 401

@bp.route('/logout', methods=['POST'])
def cerrar_sesion():
  # TODO: cerrar sesión
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
        username=user.username,
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
  