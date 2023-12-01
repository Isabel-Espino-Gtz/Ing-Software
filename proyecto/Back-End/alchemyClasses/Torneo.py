from alchemyClasses import db
from sqlalchemy import Boolean, Column, Integer, String
from hashlib import sha256
from CryptoUtils.CryptoUtils import cipher

class Torneo(db.Model):

    __tablename__ = 'torneos'
    idTorneo = Column(Integer, primary_key=True)
    nombre = Column(String(200))
    fecha_inicio = Column(String(500))
    fecha_fin = Column(String(64))
    reglas = Column(String(500))
    consola = Column(String(200))
    num_participantes = Column(Integer)
    juego = Column(String(200))
    status = Column(String(200))

    def __init__(self, nombre, fecha_inicio, fecha_fin, reglas, consola, num_participantes, juego, status):
        self.nombre = nombre
        self.fecha_inicio = fecha_inicio
        self.fecha_fin = fecha_fin
        self.reglas = reglas
        self.consola = consola
        self.num_participantes = num_participantes
        self.juego = juego
        self.status = status