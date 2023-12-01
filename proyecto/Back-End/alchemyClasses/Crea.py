from alchemyClasses import db
from sqlalchemy import Column, Integer, String

class Crea(db.Model):
    __tablename__ = 'crea'
    idAdministrador = db.Column(db.Integer, db.ForeignKey('administradores.idAdministrador'), primary_key=True)
    idTorneo = db.Column(db.Integer, db.ForeignKey('torneos.idTorneo'), primary_key=True)

    def __init__(self, idA, idT):
        self.idAdministrador = idA
        self.idTorneo = idT