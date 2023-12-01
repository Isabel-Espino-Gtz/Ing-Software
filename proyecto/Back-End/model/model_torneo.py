from alchemyClasses.Torneo import Torneo
from alchemyClasses.Crea import Crea
from alchemyClasses.Admin import Admin

def get_all_info():
    return Torneo.query.all()

def get_torneo_by_name(name):
    torneo = Torneo.query.filter(Torneo.nombre == name).first()
    return torneo.idTorneo if torneo else None

def get_nombre_torneo_by_id(id):
    torneo = Torneo.query.filter(Torneo.idTorneo == id).first()
    return torneo.nombre if torneo else None

def revisar_torneo_admin(token, torneo):
    creado = Crea.query.filter(Crea.idAdministrador == token, Crea.idTorneo == torneo).all()
    return True if creado else False

