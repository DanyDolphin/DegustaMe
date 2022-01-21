# SQLAlchemy
from sqlalchemy import Column, Integer, Float, ForeignKey, String
from sqlalchemy.orm import relationship

# models
from models.conexion_bd import Base

class RecetaIngrediente(Base):

    __tablename__ = 'receta_ingrediente'
    receta_id      = Column(Integer, ForeignKey('receta.receta_id'), primary_key=True)
    ingrediente_id = Column(Integer, ForeignKey('ingrediente.ingrediente_id'), primary_key=True)
    cantidad = Column(Integer)
    medida = Column(String)

    ingrediente = relationship("Ingrediente", backref="receta_ingrediente")

    def __init__(self, receta, ingrediente, cantidad, medida):
        self.cantidad = cantidad
        self.medida = medida
        self.ingrediente_id = ingrediente.ingrediente_id
        self.receta_id = receta.receta_id
        