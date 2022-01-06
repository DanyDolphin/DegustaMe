# SQLAlchemy
from sqlalchemy import Column, String, Integer, Numeric

# models
from models.conexion_bd import Base

class Ingrediente(Base):

    __tablename__ = 'ingrediente'
    receta_id = Column(Integer, primary_key=True)
    nombre = Column(String)
    medida = Column(String)
    proteinas = Column(Numeric)
    grasas = Column(Numeric)
    calorias = Column(Numeric)
    tipo = Column(String)

    def __init__(self, nombre, medida, proteinas, calorias, grasas, tipo):
        self.nombre = nombre
        self.medida = medida
        self.proteinas = proteinas
        self.calorias = calorias
        self.grasas = grasas
        self.tipo = tipo

    def to_dict(self):
        '''
        Regresa una representación del modelo en un diccionario
        '''
        return dict(
            receta_id=self.receta_id,
            nombre=self.nombre,
            medida=self.medida,
            proteinas=self.proteinas,
            calorias=self.calorias,
            grasas=self.grasas,
            tipo=self.tipo
        )
        