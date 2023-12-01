from alchemyClasses.Participa import Participa

def get_torneos_by_user(id):
    return Participa.query.filter(Participa.idParticipante == id).all()

def get_all_participa():
    return Participa.query.all()
