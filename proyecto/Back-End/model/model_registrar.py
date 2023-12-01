from alchemyClasses.Registro import Registro

def get_all_registros():
    return Registro.query.all()