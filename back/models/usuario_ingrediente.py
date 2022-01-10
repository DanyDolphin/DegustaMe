# SQLAlchemy
from sqlalchemy import Column, Integer, ForeignKey, String

# models
from models.conexion_bd import Base

class UsuarioIngrediente(Base):

    __tablename__ = 'usuario_ingrediente'
    nombre_usuario =  Column(String, ForeignKey('usuario.nombre_usuario'), primary_key=True)
    ingrediente_id = Column(Integer, ForeignKey('ingrediente.ingrediente_id'), primary_key=True)

    def __init__(self, usuario, ingrediente):
        self.nombre_usuario = usuario.nombre_usuario
        self.ingrediente_id = ingrediente.ingrediente_id
