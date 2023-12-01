from alchemyClasses.Admin import Admin

def get_all_admins():
    return Admin.query.all()

def get_admin_by_id(id):
    return Admin.query.filter(Admin.idAdministrador == id).all()

def get_admin_by_name(name):
    return Admin.query.filter(Admin.nombre == name).all()

def get_admin_by_email(email):
    return  Admin.query.filter(Admin.email == email).all()

def get_admin_by_email2(email):
    admin =  Admin.query.filter(Admin.email == email).first()
    return admin.idAdministrador if admin else None

def get_admin_id_by_email(email):
    admin = Admin.query.filter_by(email=email).first()

    if admin:
        return admin.idAdministrador
    else:
        return None