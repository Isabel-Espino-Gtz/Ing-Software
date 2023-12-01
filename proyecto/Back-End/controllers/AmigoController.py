from flask import Blueprint, app, request, jsonify, flash
from alchemyClasses import db
from alchemyClasses.Participante import Participante
from alchemyClasses.Amigo import Amigo
from CryptoUtils.CryptoUtils import cipher, cipher2

from model.model_participante import get_id_by_email
from model.model_amigo import get_amigos_of_user

amigo = Blueprint('amigo', __name__, url_prefix='/amigo')

@amigo.route('/registrar', methods=('GET', 'POST'))
def register():
    data = request.get_json()

    id1 = data.get('id1')
    correo = data.get('id2')
    id2 = get_id_by_email(correo)

    try:
        query = Amigo(id1=id1, id2=id2)
        db.session.add(query)
        db.session.commit()

        return jsonify({'success': True, 'message': 'Amigo agregado exitosamente'})

    except Exception as e:
            print(e)
            return jsonify({'success': False, 'message': "Error con el registro"})

@amigo.route('/ver', methods=('GET', 'POST'))
def main_view():
    data = request.get_json()
    user = data['authToken']

    parts = get_amigos_of_user(user)
         
    nombres = []
    correos = []
    usernames = []

    for participante in parts:
        print(participante.get('idParticipante'))
        nombres.append(participante.get('nombre'))
        correos.append(participante.get('email'))
        usernames.append(participante.get('username'))

    data = {
        "nombres": nombres,
        "correos": correos, 
        "username":usernames
    }
    return jsonify(data)

@amigo.route('/buscar', methods=('GET', 'POST'))
def buscar():
    data = request.get_json()
    user = data['authToken']
    username = data['nombre']

    parts = get_amigos_of_user(user)
         
    nombres = []
    correos = []
    usernames = []

    for participante in parts:
        print(participante.get('username'))
        if participante.get('username') == username:
            nombres.append(participante.get('nombre'))
            correos.append(participante.get('email'))
            usernames.append(participante.get('username'))

    data = {
        "nombres": nombres,
        "correos": correos, 
        "username":usernames
    }
    return jsonify(data)


if __name__ == '__main__':
    app.run()
