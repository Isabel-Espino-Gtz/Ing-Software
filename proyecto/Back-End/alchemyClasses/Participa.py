from alchemyClasses import db
from sqlalchemy import Column, Integer, String

class Participa(db.Model):
    __tablename__ = 'participa'

    idParticipante = Column(Integer, db.ForeignKey('participantes.idParticipante'), primary_key=True)
    idTorneo = Column(Integer, db.ForeignKey('torneos.idTorneo'), primary_key=True)
    statusParticipante = Column(String(50))

    def __init__(self, idP, idT, status):
        self.idParticipante = idP
        self.idTorneo = idT
        self.statusParticipante = status

