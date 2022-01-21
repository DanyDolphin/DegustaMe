# SQLAlchemy
from sqlalchemy import Column, String, Integer, Numeric, Text, ForeignKey
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
    nombre_usuario = Column(String, ForeignKey('usuario.nombre_usuario'))
    ingredientes = relationship(RecetaIngrediente, cascade="all, delete-orphan", backref="receta")

    def __init__(self, nombre, imagen, descripcion, tiempo, tipo, usuario):
        self.nombre = nombre
        self.imagen = imagen
        self.descripcion = descripcion
        self.tiempo = tiempo
        self.tipo = tipo
        self.nombre_usuario = usuario.nombre_usuario

    def to_dict(self):
        '''
        Regresa una representación del modelo en un diccionario
        '''
        ingredientes = []
        grasas = 0
        calorias = 0
        proteinas = 0
        for ingrediente in self.ingredientes:
            d = ingrediente.ingrediente.to_dict()
            d['medida'] = ingrediente.medida
            d['cantidad'] = ingrediente.cantidad
            grasas = grasas + (d['grasas'] * d['cantidad'])
            calorias = calorias + (d['calorias'] * d['cantidad'])
            proteinas = proteinas + (d['proteinas'] * d['cantidad'])
            ingredientes.append(d)

        return dict(
            receta_id=self.receta_id,
            nombre=self.nombre,
            imagen=self.imagen,
            descripcion=self.descripcion,
            tiempo=self.tiempo,
            tipo=self.tipo,
            grasas=grasas,
            calorias=calorias,
            proteinas=proteinas,
            ingredientes=ingredientes
        )
