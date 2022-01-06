# SQLAlchemy
from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship

# models
from models.conexion_bd import Base
from models.receta_ingrediente import RecetaIngrediente
from models.ingrediente import Ingrediente

class Receta(Base):

    __tablename__ = 'receta'
    receta_id = Column(Integer, primary_key=True)
    nombre = Column(String)
    descripcion = Column(String)
    tiempo = Column(Integer)
    tipo = Column(String)

    ingredientes = relationship(RecetaIngrediente, backref="receta")

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
    
    def obten_lista_ingredientes(self, session):
        lista = []
        if self.ingredientes is not None:
            for ingrediente in self.ingredientes:
                modelo = session.query(Ingrediente).get(ingrediente.ingrediente_id)
                lista.append(modelo.to_dict())
        return lista