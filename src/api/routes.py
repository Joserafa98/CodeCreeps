"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Clasificacion, Reto
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

#JWT
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/api/retos', methods=['GET'])
def obtener_retros():
    retos = Reto.query.all()
    return jsonify([reto.serialize() for reto in retos])

@api.route('/api/clasificaciones', methods=['POST'])
def crear_clasificacion():
    data = request.json
    nueva_clasificacion = Clasificacion(
        user_id=data['user_id'],
        reto_id=data['reto_id'],
        estado=data['estado']
    )
    db.session.add(nueva_clasificacion)
    db.session.commit()
    return jsonify(nueva_clasificacion.serialize()), 201

@api.route('/api/clasificaciones/<int:user_id>', methods=['GET'])
def obtener_clasificaciones(user_id):
    clasificaciones = Clasificacion.query.filter_by(user_id=user_id).all()
    return jsonify([clasificacion.serialize() for clasificacion in clasificaciones])

# Registro de usuario
@api.route('/signup', methods=['POST'])
def register_user():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # Verifica que los campos no estén vacíos
    if not email or not password:
        return jsonify({"msg": "Email y contraseña son requeridos"}), 400

    # Verifica que el email no esté registrado previamente
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"msg": "El usuario ya existe"}), 400

    # Crear nuevo usuario
    new_user = User(email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Usuario registrado exitosamente"}), 201

# Login de usuario
@api.route('/login', methods=['POST'])
def login_user():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # Verifica que los campos no estén vacíos
    if not email or not password:
        return jsonify({"msg": "Email y contraseña son requeridos"}), 400

    # Verificar que el usuario existe
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "El usuario no existe"}), 401

    # Verificar que la contraseña es correcta
    if user.password != password:
        return jsonify({"msg": "Contraseña incorrecta"}), 401

    # Generar JWT Token
    access_token = create_access_token(identity=user.id)
    return jsonify({"access_token": access_token, "user_id": user.id}), 200
