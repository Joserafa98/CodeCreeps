from flask_sqlalchemy import SQLAlchemy
import json

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'usuarios'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    difficulties = db.Column(db.String(255), nullable=True)  # Almacena dificultades como texto (ej. "Fácil,Intermedio")
    preferred_languages = db.Column(db.String(255), nullable=True)  # Almacena lenguajes como texto (ej. "JavaScript,Python")

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "difficulties": self.difficulties.split(',') if self.difficulties else [],  
            "preferred_languages": self.preferred_languages.split(',') if self.preferred_languages else []  
        }



class Reto(db.Model):
    __tablename__ = 'retos'

    id = db.Column(db.Integer, primary_key=True)
    nombre_reto = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.String(255), nullable=True)
    dificultad = db.Column(db.String(255), nullable=True)
    lenguaje = db.Column(db.String(255), nullable=True)
    tests = db.Column(db.String(255), nullable=True)
    pistas = db.Column(db.String(255), nullable=True)
    codigo = db.Column(db.Text, nullable=True)

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
            "codigo": self.codigo,
        }

class Mensaje(db.Model):
    __tablename__ = 'mensajes'

    id = db.Column(db.Integer, primary_key=True)
    contenido = db.Column(db.Text, nullable=False)
    fecha_creacion = db.Column(db.DateTime, default=db.func.now())
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "contenido": self.contenido,
            "fecha_creacion": self.fecha_creacion,
            "usuario_id": self.usuario_id
        }
