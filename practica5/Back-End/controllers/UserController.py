from flask import Blueprint, app, request, jsonify, flash
from alchemyClasses import db
from alchemyClasses.Usuario import Usuario
from CryptoUtils.CryptoUtils import cipher 

user = Blueprint('user', __name__, url_prefix='/user')

@user.route('/change-password', methods=['POST'])
def change_password():
    data = request.get_json()
    email = data.get("email")
    new_password = data.get("newPassword")

    if not email or not new_password:
        return jsonify({'success': False, 'message': 'Email, contraseña anterior y nueva contraseña son campos obligatorios'})

    try:
        cliente = db.session.query(Usuario).filter_by(email=email).first()
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

if __name__ == '__main__':
    app.run()
