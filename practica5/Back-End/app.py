import json
import os

from alchemyClasses import db
from CryptoUtils.CryptoUtils import validate
from controllers.UserController import user
from flask import Flask, render_template, request, flash, session, g, redirect, url_for, jsonify
from flask_cors import CORS

from controllers.JsonController import json_controller
from model.model_pelicula import get_movie_by_id
from model.model_renta import rents_by_email
from model.model_usuario import get_user_by_email, get_user_by_id

app = Flask(__name__)
CORS(app)
app.register_blueprint(json_controller)
app.register_blueprint(user)
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://ferfong:Developer123!@localhost:3306/ing_soft"
app.config.from_mapping(
    SECRET_KEY='dev',
)
db.init_app(app)

@app.route('/', methods=['GET', 'POST'])
def main():
    return redirect(url_for('login'))

# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if session.get("user", None) is not None and request.method == 'GET':
#         return redirect(url_for('index'))
#     if request.method == 'POST':
#         try:
#             email = request.form.get('email')
#             passwd = request.form.get('passwd')
#             user_query = get_user_by_email(email)
#             if not user_query:
#                 flash('Ese correo no existe.')
#                 return render_template('login.html')
#             user = user_query[0]
#             if not validate(passwd, user.password):
#                 flash('Contraseña incorrecta')
#                 return render_template('login.html')
#             session.clear()
#             session['user']= user.nombre
#             session['email']= user.email
#             session.modified = True
#             return render_template('index.html')
#         except KeyError:
#             flash('No fue enviado con éxito el correo y/o la contraseña')
#             return render_template('login.html')
#     return render_template('login.html')

@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        try:
            data = request.get_json()  # Obtiene los datos del cuerpo de la solicitud en formato JSON

            if 'email' in data and 'passwd' in data:
                # Aquí puedes verificar las credenciales en tu base de datos
                email = data['email']
                passwd = data['passwd']

                # Ejemplo de verificación de credenciales
                user_query = get_user_by_email(email)
                if not user_query:
                    return jsonify({'success': False, 'message': 'El usuario no existe, por favor ingrese un correo válido'})

                user = user_query[0]
                if not validate(passwd, user.password):
                    return jsonify({'success': False, 'message': 'Contraseña incorrecta'})

                # Si las credenciales son válidas, devolver una respuesta exitosa
                session.clear()
                session['user']= user.nombre
                session['email']= user.email
                session.modified = True
                return jsonify({'success': True, 'message': 'Inicio de sesión exitoso'})
            
            return jsonify({'success': False, 'message': 'Datos de inicio de sesión incompletos'})
        
        except Exception as e:
            return jsonify({'success': False, 'message': str(e)})

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
