from alchemyClasses import db
from sqlalchemy import Column, Integer, String, Boolean

class Registro(db.Model):

    __tablename__ = 'participa'
    idParticipar = Column(Integer, primary_key=True)
    idParticipante = Column(Integer)
    idTorneo = Column(Integer)
    status = Column(Boolean)

    def __init__(self, idParticipar, idParticipante, idTorneo, status=1):
        self.idParticipar=idParticipar
        self.idParticipante=idParticipante
        self.idTorneo=idTorneo
        self.status=status
