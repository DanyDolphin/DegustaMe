# SQLAlchemy
from sqlalchemy import Column, String, Integer, Numeric

# models
from models.conexion_bd import Base

class Ingrediente(Base):

    __tablename__ = 'ingrediente'
    ingrediente_id = Column(Integer, primary_key=True)
    nombre = Column(String)
    proteinas = Column(Numeric)
    grasas = Column(Numeric)
    calorias = Column(Numeric)
    tipo = Column(String)

    def __init__(self, nombre, proteinas, calorias, grasas, tipo):
        self.nombre = nombre
        self.proteinas = proteinas
        self.calorias = calorias
        self.grasas = grasas
        self.tipo = tipo

    def to_dict(self):
        '''
        Regresa una representación del modelo en un diccionario
        '''
        return dict(
            ingrediente_id=self.ingrediente_id,
            nombre=self.nombre,
            proteinas=self.proteinas,
            calorias=self.calorias,
            grasas=self.grasas,
            tipo=self.tipo
        )
        