from alchemyClasses import db
from sqlalchemy import Column, Integer, String
from hashlib import sha256
from CryptoUtils.CryptoUtils import cipher

class Participante(db.Model):

    __tablename__ = 'participantes'
    idParticipante = Column(Integer, primary_key=True)
    nombre = Column(String(200))
    email = Column(String(500), unique=True)
    password = Column(String(64))
    username = Column(String(500), unique=True)

    def __init__(self, nombre, email, passwd, username):
        self.nombre = nombre
        self.email = email
        self.password = sha256(cipher(passwd)).hexdigest()
        self.username = username
    
    def to_dict(self):
        return {
            'id': self.idParticipante,
            'nombre': self.nombre,
            'email': self.email,
            'username':self.username
        }