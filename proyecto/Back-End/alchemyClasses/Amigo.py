from alchemyClasses import db
from sqlalchemy import Column, Integer, String
from hashlib import sha256
from CryptoUtils.CryptoUtils import cipher

class Amigo(db.Model):

    __tablename__ = 'amigos'
    idParticipante1 = Column(Integer, primary_key=True)
    idParticipante2 = Column(Integer, primary_key=True)

    def __init__(self, id1, id2):
        self.idParticipante1 = id1
        self.idParticipante2 = id2