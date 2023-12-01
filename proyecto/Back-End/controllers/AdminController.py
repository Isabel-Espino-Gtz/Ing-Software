from flask import Blueprint, app, request, jsonify, flash
from alchemyClasses import db
from alchemyClasses.Admin import Admin
from CryptoUtils.CryptoUtils import cipher 
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from model.model_admin import get_all_admins, get_admin_by_name, get_admin_by_email, get_admin_by_email2
from model.model_participa import get_all_participa
from model.model_torneo import get_nombre_torneo_by_id
from model.model_participante import get_nombre_participante_id

admin = Blueprint('admin', __name__, url_prefix='/admin')

@admin.route('/change-password', methods=['POST'])
def change_password():
    data = request.get_json()
    email = data.get("email")
    new_password = data.get("newPassword")

    if not email or not new_password:
        return jsonify({'success': False, 'message': 'Email, contraseña anterior y nueva contraseña son campos obligatorios'})

    try:
        admin = db.session.query(Admin).filter_by(email=email).first()
        if admin:
                admin.password = cipher(new_password)
                db.session.commit()
                return jsonify({'success': True, 'message': 'Contraseña cambiada exitosamente'})
        else:
            return jsonify({'success': False, 'message': 'No se encontró el usuario'})

    except Exception as e:
        db.session.rollback()
        print(e)
        return jsonify({'success': False, 'message': 'Hubo un error al cambiar la contraseña'})

@admin.route('/registrar', methods=('GET', 'POST'))
def register():
    data = request.get_json()

    nombre = data.get('username')
    email = data.get('email')
    passwd = data.get('password')

    try:
        user = Admin(nombre=nombre, email=email, passwd=passwd)
        db.session.add(user)
        db.session.commit()

        subject = 'Registro Exitoso'
        body = f'Has sido registrado como administrador en TorneoTracker.\n\nNombre: {nombre}\nEmail: {email}\nContraseña: {passwd}'
        send_email(email, subject, body)

        return jsonify({'success': True, 'message': 'Admin registrado exitosamente'})

    except Exception as e:
            print(e)
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

@admin.route('/ver', methods=('GET', 'POST'))
def main_view():
    admins = get_all_admins()
    nombres = [i.nombre for i in admins]
    correos = [i.email for i in admins]
    data = {
        "nombres": nombres,
        "correos": correos
    }
    return jsonify(data)

@admin.route('/buscar', methods=('GET', 'POST'))
def buscar():
    data = request.get_json()

    nombre = data.get('nombre')

    parts = get_admin_by_name(nombre)
    nombres = [i.nombre for i in parts]
    correos = [i.email for i in parts]

    data = {
        "nombres": nombres,
        "correos": correos
    }
    return jsonify(data)

@admin.route('/eliminar', methods=('GET','POST'))
def eliminar():
   
    data = request.get_json()
    name = data['nombre']

    if not data.get('nombre'):
        return jsonify({'error': 'Nombre no proporcionado'}), 400

    try:
        idT = get_admin_by_email2(name)
        print(idT)
        if idT is None:
            return jsonify({'error': 'Admin no encontrado'}), 404
        
        admin = Admin.query.filter(Admin.idAdministrador == idT).first()

        db.session.delete(admin)
        db.session.commit()

        return jsonify({'message': 'Admin eliminado exitosamente'})
    
    except Exception as e:
        print(e)
        db.session.rollback()
        return jsonify({'error': 'Error interno del servidor'}), 500

@admin.route('/status', methods=('GET', 'POST'))
def status():
    data = request.get_json()

    #Obtiene toda la información de la tabla participa
    info = get_all_participa()

    #torneos
    ids_torneos = [i.idTorneo for i in info]
    torneos = []
    for i in ids_torneos:
        nombre = get_nombre_torneo_by_id(i)
        torneos.append(nombre)
    
    #participantes 
    ids_participantes = [i.idParticipante for i in info]
    nombres = []
    for i in ids_participantes:
        nombre = get_nombre_participante_id(i)
        nombres.append(nombre)

    #status 
    status = [i.statusParticipante for i in info]


    data = {
        "nombres": nombres,
        "torneos": torneos,
        "status": status
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run()
