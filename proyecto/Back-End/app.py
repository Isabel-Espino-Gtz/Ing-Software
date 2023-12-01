import json
import os

from alchemyClasses import db
from CryptoUtils.CryptoUtils import validate
from controllers.ParticipanteController import participante
from controllers.AdminController import admin
from controllers.TorneoController import torneo
from controllers.AmigoController import amigo
from flask import Flask, render_template, request, flash, session, g, redirect, url_for, jsonify
from flask_cors import CORS

from controllers.JsonController import json_controller
from model.model_pelicula import get_movie_by_id
from model.model_participante import get_user_by_email, get_user_by_id, get_id_by_email
from model.model_admin import get_admin_by_email, get_admin_id_by_email
from model.model_super_admin import get_super_by_email, get_super_id_by_email

app = Flask(__name__)
CORS(app)
app.register_blueprint(json_controller)
app.register_blueprint(participante)
app.register_blueprint(admin)
app.register_blueprint(torneo)
app.register_blueprint(amigo)
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://ferfong:Developer123!@localhost:3306/proyecto_ing_soft"
app.config.from_mapping(
    SECRET_KEY='dev',
)
db.init_app(app)

@app.route('/', methods=['GET', 'POST'])
def main():
    return redirect(url_for('login'))

@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        try:
            data = request.get_json()  # Obtiene los datos del cuerpo de la solicitud en formato JSON

            if 'email' in data and 'passwd' in data:
                # Aquí puedes verificar las credenciales en tu base de datos
                email = data['email']
                passwd = data['passwd']


                #Verificar si es participante 
                participante = get_id_by_email(email)
                admin = get_admin_id_by_email(email)
                super = get_super_id_by_email(email)

                print(participante, admin, super)

                if not participante and not admin and not super:
                    return jsonify({'success': False, 'message': 'El usuario no existe, por favor ingrese un correo válido'})

                else:
                    if participante != None:
                        user = get_user_by_email(email)[0]
                        token = participante
                        role = 'participante'

                    if admin != None:
                        user = get_admin_by_email(email)[0]
                        token = admin
                        role = 'admin'

                    if super != None:
                        user = get_super_by_email(email)[0]
                        token = super
                        role = 'super'

                    print(user)
                    
                    if not validate(passwd, user.password):
                        return jsonify({'success': False, 'message': 'Contraseña incorrecta'})
                    
                    return jsonify({'success': True, 'message': 'Inicio de sesión exitoso', 'token': token, 'role': role})
            
            return jsonify({'success': False, 'message': 'Datos de inicio de sesión incompletos'})

        
        except Exception as e:
            print(e)
            return jsonify({'success': False, 'message': 'Error'})

@app.route('/index', methods=['GET', 'POST'])
def index():
    if session.get('user') is None:
        flash('Por favor primero inicie sesión.')
        return redirect(url_for('login'))
    return render_template('index.html')

@app.route('/logout', methods=['GET', 'POST'])
def logout():
    session.clear()
    g.user = None
    return redirect(url_for('login'))


if __name__ == '__main__':
    app.run(debug = True)
