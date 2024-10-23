from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'usuarios'  # Nombre de la tabla en la base de datos

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    
    # Relación con clasificaciones
    clasificaciones = db.relationship('Clasificacion', backref='usuario', lazy=True)

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

    # Relación con clasificaciones
    clasificaciones = db.relationship('Clasificacion', backref='reto', lazy=True)

    def __repr__(self):
        return f'<Reto {self.nombre_reto}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre_reto": self.nombre_reto,
            "descripcion": self.descripcion,
        }


class Clasificacion(db.Model):
    __tablename__ = 'clasificaciones'  # Nombre de la tabla en la base de datos

    id = db.Column(db.Integer, primary_key=True)
    posicion = db.Column(db.Integer, nullable=False)  # Posición en la clasificación
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)  # Relación con usuario
    puntos = db.Column(db.Integer, default=0)  # Puntos acumulados
    retos_completados = db.Column(db.Integer, default=0)  # Retos completados
    reto_id = db.Column(db.Integer, db.ForeignKey('retos.id'), nullable=True)  # Relación con reto

    def __repr__(self):
        return f'<Clasificacion {self.posicion} - {self.usuario.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "posicion": self.posicion,
            "usuario": self.usuario.serialize(),
            "puntos": self.puntos,
            "retos_completados": self.retos_completados,
            "reto_id": self.reto_id,
        }
