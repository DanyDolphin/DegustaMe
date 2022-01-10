from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.sql.sqltypes import String

# models
from models.conexion_bd import Base

class UsuarioReceta(Base):

    __tablename__ = 'usuario_receta'
    receta_id = Column(Integer, ForeignKey('receta.receta_id'), primary_key=True)
    nombre_usuario = Column(String, ForeignKey('usuario.nombre_usuario'), primary_key=True)


    def __init__(self, receta, usuario):
        self.receta_id = receta.receta_id
        self.nombre_usuario = usuario.nombre_usuario
        