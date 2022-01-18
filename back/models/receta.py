# SQLAlchemy
from sqlalchemy import Column, String, Integer, Numeric, Table, ForeignKey
from sqlalchemy.orm import relationship

# models
from models.conexion_bd import Base
from models.ingrediente import Ingrediente

receta_ingrediente = Table('receta_ingrediente', Base.metadata,
    Column('receta_id', ForeignKey('vw_receta.receta_id'), primary_key=True),
    Column('ingrediente_id', ForeignKey('ingrediente.ingrediente_id'), primary_key=True),
    extend_existing=True
)

class Receta(Base):

    __tablename__ = 'vw_receta'
    receta_id = Column(Integer, primary_key=True)
    nombre = Column(String)
    descripcion = Column(String)
    tiempo = Column(Integer)
    tipo = Column(String)

    grasas = Column(Numeric)
    calorias = Column(Numeric)
    proteinas = Column(Numeric)

    ingredientes = relationship(
        'Ingrediente', 
        secondary=receta_ingrediente
        #primaryjoin='Receta.receta_id == receta_ingrediente.receta_id',
        #secondaryjoin='reeta_ingrediente.ingrediente_id == Ingrediente.ingrediente_id'
    )

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
            tipo=self.tipo,
            grasas=self.grasas,
            calorias=self.calorias,
            proteinas=self.proteinas
        )
    
    def obten_lista_ingredientes(self, session):
        lista = []
        if self.ingredientes is not None:
            for ingrediente in self.ingredientes:
                modelo = session.query(Ingrediente).get(ingrediente.ingrediente_id)
                lista.append(modelo.to_dict())
        return lista