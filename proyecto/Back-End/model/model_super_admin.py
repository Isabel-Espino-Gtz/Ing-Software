from alchemyClasses.SuperAdmin import SuperAdmin

def get_super_by_email(email):
    return SuperAdmin.query.filter(SuperAdmin.email == email).all()

def get_super_id_by_email(email):
    super = SuperAdmin.query.filter_by(email=email).first()

    if super:
        return super.idSuperAdmin
    else:
        return None