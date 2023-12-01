from flask import Blueprint, app, request, jsonify, flash
from alchemyClasses import db
from alchemyClasses.Torneo import Torneo
from alchemyClasses.Crea import Crea
from alchemyClasses.Participa import Participa
from CryptoUtils.CryptoUtils import cipher 

from model.model_torneo import get_all_info, get_torneo_by_name, revisar_torneo_admin

torneo = Blueprint('torneo', __name__, url_prefix='/torneo')

@torneo.route('/registrar', methods=('GET','POST'))
def register_torneo():
    data = request.get_json()

    # Extraer los atributos del torneo en el orden especificado
    idA = data.get('authToken')
    nombre = data.get('nombre')
    fecha_inicio = data.get('fecha_inicio')
    fecha_fin = data.get('fecha_fin')
    reglas = data.get('reglas')
    consola = data.get('consola')
    num_participantes = data.get('num_participantes')
    juego = data.get('juego')
    status = data.get('status')

    try:
        # Crear una instancia de Torneo con los atributos del torneo
        torneo = Torneo(nombre, fecha_inicio, fecha_fin, reglas, consola, num_participantes, juego, status)
        db.session.add(torneo)
        db.session.commit()

        idT = get_torneo_by_name(nombre)

        crea = Crea(idA=idA, idT=idT)
        db.session.add(crea)
        db.session.commit()

        return jsonify({'success': True, 'message': 'Torneo registrado exitosamente'})

    except Exception as e:
        print(e)
        return jsonify({'success': False, 'message': "Error con el registro del torneo"})



@torneo.route('/ver', methods=('GET', 'POST'))
def main_view():
    torneos     = get_all_info()
    nombres     = [i.nombre for i in torneos]
    inicio      = [i.fecha_inicio for i in torneos]
    fin         = [i.fecha_fin for i in torneos]
    reglas      = [i.reglas for i in torneos]
    consola     = [i.consola for i in torneos]
    participante = [i.num_participantes for i in torneos]
    juego       = [i.juego for i in torneos]
    status      = [i.status for i in torneos]

    data = {
        "nombres": nombres,
        "inicio":inicio,
        "fin":fin,
        "reglas":reglas,
        "consola":consola,
        "participante": participante,
        "juego":juego,
        "status":status,
    }

    return jsonify(data)

@torneo.route('/buscar', methods=('GET', 'POST'))
def buscar():
    data = request.get_json()

    nombre = data.get('nombre')

    torneos     = get_torneo_by_name(nombre)
    nombres     = [i.nombre for i in torneos]
    inicio      = [i.fecha_inicio for i in torneos]
    fin         = [i.fecha_fin for i in torneos]
    reglas      = [i.reglas for i in torneos]
    consola     = [i.consola for i in torneos]
    participante = [i.num_participantes for i in torneos]
    juego       = [i.juego for i in torneos]
    status      = [i.status for i in torneos]

    data = {
        "nombres": nombres,
        "inicio":inicio,
        "fin":fin,
        "reglas":reglas,
        "consola":consola,
        "participante": participante,
        "juego":juego,
        "status":status,
    }

    return jsonify(data)

@torneo.route('/eliminar', methods=('GET','POST'))
def eliminar():
   
    data = request.get_json()
    name = data['nombre']
    token = data.get('token')

    if not data.get('nombre'):
        return jsonify({'error': 'Nombre no proporcionado'}), 400
    
    idT = get_torneo_by_name(name)

    if not revisar_torneo_admin(token, idT):
            return jsonify({'error': 'Este administrador no creó el torneo'}), 404

    try:
        if idT is None:
            return jsonify({'error': 'Torneo no encontrado'}), 404
        
        crea = Crea.query.filter(Crea.idAdministrador == token, Crea.idTorneo == idT).all()
        participa = Participa.query.filter(Participa.idTorneo == idT).all()
        torneo = Torneo.query.filter(Torneo.idTorneo == idT).first()

        if crea:
            for c in crea:
                db.session.delete(c)
            db.session.commit()

        if participa:
            for p in participa:
                db.session.delete(p)
            db.session.commit()

        db.session.delete(torneo)
        db.session.commit()

        return jsonify({'message': 'Torneo eliminado exitosamente'})
    
    except Exception as e:
        print(e)
        db.session.rollback()
        return jsonify({'error': 'Error interno del servidor'}), 500

@torneo.route('/editar', methods=['POST'])
def editar_torneo():
    data = request.get_json()

    if not data or not data.get('nombre'):
        return jsonify({'error': 'Nombre no proporcionado'}), 400

    try:
        nombre                  = data['nombre']
        nuevo_nombre            = data.get('nuevo_nombre')
        nueva_fecha_inicio      = data.get('nueva_fecha_inicio')
        nueva_fecha_fin         = data.get('nueva_fecha_fin')
        nuevas_reglas           = data.get('nuevas_reglas')
        nueva_consola           = data.get('nueva_consola')
        nuevos_participantes    = data.get('nuevos_participantes')
        nuevo_juego             = data.get('nuevo_juego')
        nuevo_status            = data.get('nuevo_status')
        token                   = data.get('token')

        torneo = Torneo.query.filter_by(nombre=nombre).first()
        idT = get_torneo_by_name(nombre)

        if not revisar_torneo_admin(token, idT):
            return jsonify({'error': 'Este administrador no creó el torneo'}), 404

        if not torneo:
            return jsonify({'error': 'Torneo no encontrado'}), 404

        if revisar_torneo_admin(token, idT):
            if nuevo_nombre:
                torneo.nombre = nuevo_nombre
            if nueva_fecha_inicio:
                torneo.fecha_inicio = nueva_fecha_inicio
            if nueva_fecha_fin:
                torneo.fecha_fin = nueva_fecha_fin
            if nuevas_reglas:
                torneo.reglas = nuevas_reglas
            if nueva_consola:
                torneo.consola = nueva_consola
            if nuevos_participantes:
                torneo.num_participantes = nuevos_participantes
            if nuevo_juego:
                torneo.juego = nuevo_juego
            if nuevo_status:
                torneo.status = nuevo_status

            db.session.commit()

            return jsonify({'message': 'Torneo editado exitosamente'})
    
    except Exception as e:
        print(e)
        db.session.rollback()
        return jsonify({'error': 'Error interno del servidor'}), 500


if __name__ == '__main__':
    app.run()
