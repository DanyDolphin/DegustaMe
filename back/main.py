# flask
from flask import Flask

# flask-cors
from flask_cors import CORS

# blueprints
from blueprints import auth

app = Flask(__name__)

# configuring CORS
CORS(app)

app.config['SECRET_KEY'] = 'SUPER SEGURO'

app.register_blueprint(auth.bp)
# app.register_blueprint(ordenes.bp)
# app.register_blueprint(productos.bp)