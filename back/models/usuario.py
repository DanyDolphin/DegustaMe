# SQLAlchemy
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

# models
from models.conexion_bd import Base

class Usuario(Base):

    __tablename__ = 'usuario'
    username = Column(String, primary_key = True)
    correo = Column(String)
    contrasenia = Column(String)

    def __init__(self, username, correo, contrasenia):
        self.username = username
        self.correo = correo
        self.contrasenia = contrasenia