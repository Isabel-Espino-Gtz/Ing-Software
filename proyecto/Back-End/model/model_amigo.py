from alchemyClasses.Amigo import Amigo
from alchemyClasses.Participante import Participante
from sqlalchemy import or_

def get_amigos_of_user(user):
    amigos = Amigo.query.filter(Amigo.idParticipante1 == user).all()
    
    participantes_completos = []

    for amigo in amigos:
        id_amigo = amigo.idParticipante2
        participante = Participante.query.get(id_amigo)

        if participante:
            participantes_completos.append(participante.to_dict())  # Asumiendo que tienes un método to_dict en tu modelo Participante
            
    return participantes_completos

