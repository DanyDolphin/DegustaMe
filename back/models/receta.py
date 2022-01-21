# SQLAlchemy
from sqlalchemy import Column, String, Integer, Numeric, Text
from sqlalchemy.orm import relationship
from models.receta_ingrediente import RecetaIngrediente

# models
from models.conexion_bd import Base
from models.receta_ingrediente import RecetaIngrediente
from models.ingrediente import Ingrediente


class Receta(Base):

    __tablename__ = 'receta'
    receta_id = Column(Integer, primary_key=True)
    nombre = Column(String)
    imagen = Column(Text)
    descripcion = Column(String)
    tiempo = Column(Integer)
    tipo = Column(String)
    ingredientes = relationship(RecetaIngrediente, cascade="all, delete-orphan", backref="receta")

    def __init__(self, nombre, imagen, descripcion, tiempo, tipo):
        self.nombre = nombre
        self.imagen = imagen
        self.descripcion = descripcion
        self.tiempo = tiempo
        self.tipo = tipo

    def to_dict(self):
        '''
        Regresa una representación del modelo en un diccionario
        '''
        ingredientes = []
        for ingrediente in self.ingredientes:
            d = ingrediente.ingrediente.to_dict()
            d['medida'] = ingrediente.medida
            d['cantidad'] = ingrediente.cantidad
            ingredientes.append(d)

        return dict(
            receta_id=self.receta_id,
            nombre=self.nombre,
            imagen=self.imagen,
            descripcion=self.descripcion,
            tiempo=self.tiempo,
            tipo=self.tipo
        )

