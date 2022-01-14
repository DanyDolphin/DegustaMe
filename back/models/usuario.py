# SQLAlchemy
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import Float, Integer

# models
from models.conexion_bd import Base

class Usuario(Base):

    __tablename__ = 'usuario'
    nombre_usuario=Column(String,primary_key=True)
    correo=Column(String)
    contrasena=Column(String)
    edad=Column(Integer)
    peso=Column(Float )
    padecimiento=Column(String)
    genero=Column(String)
    dieta=Column(String)
    altura=Column(Float)

    def __init__(self, nombre_usuario, correo, contrasena, edad, peso, padecimiento, genero, dieta, altura):
        self.nombre_usuario = nombre_usuario
        self.correo = correo
        self.contrasena = contrasena
        self.edad = edad
        self.peso = peso
        self.padecimiento = padecimiento
        self.genero = genero
        self.dieta = dieta
        self.altura = altura
        