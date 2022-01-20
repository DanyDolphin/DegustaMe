# SQLAlchemy

from sqlalchemy import Column, String, Integer, Text, Numeric, Table, ForeignKey
from sqlalchemy.orm import relationship
from models.receta_ingrediente import RecetaIngrediente

# models
from models.conexion_bd import Base
from models.ingrediente import Ingrediente

'''
receta_ingrediente = Table('receta_ingrediente', Base.metadata,
    Column('receta_id', ForeignKey('vw_receta.receta_id'), primary_key=True),
    Column('ingrediente_id', ForeignKey('ingrediente.ingrediente_id'), primary_key=True),
    extend_existing=True
)
'''

class Receta(Base):

    __tablename__ = 'vw_receta'
    receta_id = Column(Integer, primary_key=True)
    nombre = Column(String)
    imagen = Column(Text)
    descripcion = Column(String)
    tiempo = Column(Integer)
    tipo = Column(String)
    ingredientes = relationship(RecetaIngrediente, cascade="all, delete-orphan", backref="receta")

    grasas = Column(Numeric)
    calorias = Column(Numeric)
    proteinas = Column(Numeric)


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
            tipo=self.tipo,
            grasas=self.grasas,
            calorias=self.calorias,
            proteinas=self.proteinas,
            ingredientes=ingredientes
        )