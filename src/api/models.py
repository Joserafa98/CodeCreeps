from flask_sqlalchemy import SQLAlchemy
import json  # Asegúrate de importar el módulo json


db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'usuarios'  # Nombre de la tabla en la base de datos

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    
    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # no serializar la contraseña por razones de seguridad
        }


class Reto(db.Model):
    __tablename__ = 'retos'  # Nombre de la tabla en la base de datos

    id = db.Column(db.Integer, primary_key=True)
    nombre_reto = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.String(255), nullable=True)
    dificultad = db.Column(db.String(255), nullable=True)
    lenguaje = db.Column(db.String(255), nullable=True)
    tests = db.Column(db.String(255), nullable=True)
    pistas = db.Column(db.String(255), nullable=True)
    codigo = db.Column(db.Text, nullable=True)  # Nuevo campo para el código inicial

    def __repr__(self):
        return f'<Reto {self.nombre_reto}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre_reto": self.nombre_reto,
            "descripcion": self.descripcion,
            "dificultad": self.dificultad,
            "tests": json.loads(self.tests) if self.tests else [],
            "lenguaje": self.lenguaje,
            "pistas": self.pistas,
            "codigo": self.codigo,  # Agregar el código en la serialización
        }