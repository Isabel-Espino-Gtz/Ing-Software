from flask import Blueprint, app, request, jsonify, flash
from alchemyClasses import db
from alchemyClasses.Participante import Participante
from alchemyClasses.Participa import Participa
from alchemyClasses.Torneo import Torneo
from alchemyClasses.Admin import Admin
from CryptoUtils.CryptoUtils import cipher, cipher2
from sqlalchemy.exc import IntegrityError
from alchemyClasses.Amigo import Amigo
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from model.model_participante import get_all_users, get_user_by_name, get_user_by_id, get_user_by_id2
from model.model_torneo import get_torneo_by_name, get_nombre_torneo_by_id
from model.model_admin import get_admin_by_email2
from model.model_participa import get_torneos_by_user

participante = Blueprint('participante', __name__, url_prefix='/participante')

@participante.route('/change-password', methods=['POST'])
def change_password():
    data = request.get_json()
    email = data.get("email")
    new_password = data.get("newPassword")

    if not email or not new_password:
        return jsonify({'success': False, 'message': 'Email, contraseña anterior y nueva contraseña son campos obligatorios'})

    try:
        cliente = db.session.query(Participante).filter_by(email=email).first()
        if cliente:
                cliente.password = cipher(new_password)
                db.session.commit()
                return jsonify({'success': True, 'message': 'Contraseña cambiada exitosamente'})
        else:
            return jsonify({'success': False, 'message': 'No se encontró el usuario'})

    except Exception as e:
        db.session.rollback()
        print(e)
        return jsonify({'success': False, 'message': 'Hubo un error al cambiar la contraseña'})

@participante.route('/registrar', methods=('GET', 'POST'))
def register():
    data = request.get_json()

    nombre = data.get('nombre')
    username = data.get('username')
    email = data.get('email')
    passwd = data.get('password')

    admin = get_admin_by_email2(email)

    if admin is None:
        try:
            user = Participante(nombre=nombre, email=email, passwd=passwd, username=username)
            db.session.add(user)
            db.session.commit()

            subject = 'Registro Exitoso'
            body = f'Has sido registrado como participante en TorneoTracker.\n\nUsername: {username}\nEmail: {email}\nContraseña: {passwd}'
            send_email(email, subject, body)

            token = user.idParticipante
            role = 'participante'

            return jsonify({'success': True, 'message': 'Usuario registrado exitosamente', 'token': token, 'role':role})

        except Exception as e:
                return jsonify({'success': False, 'message': "Error con el registro"})
    
    else:
        return jsonify({'success': False, 'message': "Error con el registro"})


def send_email(to_email, subject, body):
    smtp_server = 'smtp.gmail.com'
    smtp_port = 587
    smtp_username = 'proyecto.ing.software.unitario@gmail.com'
    smtp_password = 'jluw pmzd fxia dket'

    msg = MIMEMultipart()
    msg['From'] = smtp_username
    msg['To'] = to_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_username, smtp_password)
        server.sendmail(smtp_username, to_email, msg.as_string())
        server.quit()
        print('Correo enviado exitosamente')
    except Exception as e:
        print(f'Error al enviar el correo: {e}')


@participante.route('/ver', methods=('GET', 'POST'))
def main_view():
    parts = get_all_users()
    nombres = [i.nombre for i in parts]
    correos = [i.email for i in parts]
    username = [i.username for i in parts]
    data = {
        "nombres": nombres,
        "correos": correos, 
        "username":username
    }
    return jsonify(data)

@participante.route('/buscar', methods=('GET', 'POST'))
def buscar():
    data = request.get_json()

    nombre = data.get('nombre')

    parts = get_user_by_name(nombre)
    nombres = [i.nombre for i in parts]
    correos = [i.email for i in parts]
    username = [i.username for i in parts]

    data = {
        "nombres": nombres,
        "correos": correos, 
        "username":username
    }
    return jsonify(data)

@participante.route('/ver-perfil', methods=('GET','POST'))
def ver():
    data = request.get_json()
    idP = data['authToken']

    perfil = get_user_by_id(idP)

    nombres = [i.nombre for i in perfil]
    correos = [i.email for i in perfil]
    username = [i.username for i in perfil]

    data = {
        "nombres": nombres,
        "correos": correos,
        "username":username
    }

    return jsonify(data)


@participante.route('/eliminar', methods=('GET','POST'))
def eliminar():
    data = request.get_json()
    name = data['authToken']

    try:
        idT = get_user_by_id2(name)
        print(idT)
        if idT is None:
            return jsonify({'error': 'Participante no encontrado'}), 404
        
        # Eliminar registros relacionados en la tabla 'amigos'
        Amigo.query.filter((Amigo.idParticipante1 == idT) | (Amigo.idParticipante2 == idT)).delete()

        # Eliminar registros de participa 
        participa = Participa.query.filter(Participa.idParticipante == idT).all()
        for i in participa:
            db.session.delete(i)

        # Eliminar el participante
        participante = Participante.query.filter(Participante.idParticipante == idT).first()
        db.session.delete(participante)
        db.session.commit()

        return jsonify({'message': 'Participante eliminado exitosamente'})
    
    except IntegrityError as e:
        print(e)
        db.session.rollback()
        return jsonify({'error': 'No se puede eliminar el participante debido a restricciones de clave externa'}), 500
    
    except Exception as e:
        print(e)
        db.session.rollback()
        return jsonify({'error': 'Error interno del servidor'}), 500


@participante.route('/editar', methods=['POST'])
def editar_torneo():
    
    data = request.get_json()
    token = data['authToken']

    if not data:
        return jsonify({'error': 'Nombre no proporcionado'}), 400

    try:
        idT                     = get_user_by_id2(token)
        nuevo_nombre            = data.get('nuevo_nombre')
        nueva_contraseña        = data.get('nueva_contraseña')
        nuevo_correo            = data.get('nuevo_correo')
        username                = data.get('username')

        participante = Participante.query.filter(Participante.idParticipante == idT).first()

        if not participante:
            return jsonify({'error': 'Participante no encontrado'}), 404

        if nuevo_nombre:
            participante.nombre = nuevo_nombre
        if nueva_contraseña:
            participante.password = cipher2(nueva_contraseña)
        if nuevo_correo:
            participante.email = nuevo_correo
        if username:
            participante.username = username

        db.session.commit()

        return jsonify({'message': 'Participante editado exitosamente'})
    
    except Exception as e:
        print(e)
        db.session.rollback()
        return jsonify({'error': 'Error interno del servidor'}), 500


@participante.route('/registrar-torneo', methods=['POST'])
def registrar_torneo():
    data = request.get_json()

    nombre = data.get('idT')
    idP = data.get('idP')
    idT = get_torneo_by_name(nombre)

    try:
        query = Participa(idP = idP, idT = idT, status = "registrado")
        db.session.add(query)
        db.session.commit()

        torneo = Torneo.query.get(idT)
        torneo.num_participantes += 1
        db.session.commit()

        return jsonify({'success': True, 'message': 'Torneo agregado exitosamente'})

    except Exception as e:
            return jsonify({'success': False, 'message': "Error con el registro"})

@participante.route('/quitar-torneo', methods=['POST'])
def quitar_torneo():
    data = request.get_json()

    nombre = data.get('idT')
    idP = data.get('idP')
    idT = get_torneo_by_name(nombre)

    try:
        participante = Participa.query.filter(Participa.idParticipante == idP, Participa.idTorneo == idT).first()
        db.session.delete(participante)
        db.session.commit()

        torneo = Torneo.query.get(idT)
        torneo.num_participantes -= 1
        db.session.commit()

        return jsonify({'success': True, 'message': 'Torneo quitado exitosamente'})

    except Exception as e:
            return jsonify({'success': False, 'message': "Error con el registro"})

@participante.route('/status', methods=('GET','POST'))
def status():
    data = request.get_json()
    idP = data['authToken']

    torneos = get_torneos_by_user(idP)

    ids_torneos = [i.idTorneo for i in torneos]
    nombres = []

    for i in ids_torneos:
        nombre = get_nombre_torneo_by_id(i)
        nombres.append(nombre)

    status = [i.statusParticipante for i in torneos]

    data = {
        "nombres": nombres,
        "status": status
    }

    return jsonify(data)



if __name__ == '__main__':
    app.run()
