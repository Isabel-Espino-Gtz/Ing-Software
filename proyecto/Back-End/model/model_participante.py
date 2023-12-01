from alchemyClasses.Participante import Participante

def get_all_users():
    return Participante.query.all()

def get_user_by_id(id):
    return Participante.query.filter(Participante.idParticipante == id).all()

def get_user_by_id2(id):
    participante = Participante.query.filter(Participante.idParticipante == id).first()
    if participante:
        return participante.idParticipante
    else:
        None

def get_user_by_name(name):
    return Participante.query.filter(Participante.nombre == name).all()

def get_user_by_email(email):
    return Participante.query.filter(Participante.email == email).all()

def get_id_by_email(email):
    participante = Participante.query.filter_by(email=email).first()

    if participante:
        return participante.idParticipante
    else:
        return None

def get_nombre_participante_id(id):
    participante = Participante.query.filter(Participante.idParticipante == id).first()
    return participante.nombre if participante else None

