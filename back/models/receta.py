# SQLAlchemy
from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship

# models
from models.conexion_bd import Base

class Receta(Base):

    __tablename__ = 'receta'
    receta_id = Column(Integer, primary_key=True)
    nombre = Column(String)
    descripcion = Column(String)
    tiempo = Column(Integer)
    tipo = Column(String)

    ingredientes = relationship('RecetaIngrediente', backref="receta_id")

    def __init__(self, nombre, descripcion, tiempo, tipo):
        self.nombre = nombre
        self.descripcion = descripcion
        self.tiempo = tiempo
        self.tipo = tipo

    def to_dict(self):
        '''
        Regresa una representación del modelo en un diccionario
        '''
        return dict(
            receta_id=self.receta_id,
            nombre=self.nombre,
            descripcion=self.descripcion,
            tiempo=self.tiempo,
            tipo=self.tipo
        )
        