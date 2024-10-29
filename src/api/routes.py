"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Reto, Mensaje
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import json  # Asegúrate de importar el módulo json

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

# Obtener todos los usuarios
@api.route('/usuarios', methods=['GET'])
def get_all_users():
    users = User.query.all()  
    users_serialized = [user.serialize() for user in users]  
    return jsonify(users_serialized), 200  

# Obtener un usuario por su ID
@api.route('/usuarios/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    user = User.query.get(user_id)  
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404  
    
    return jsonify(user.serialize()), 200  

@api.route('/api/user/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    # Busca el usuario en la base de datos
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    # Obtener los datos de la solicitud
    data = request.get_json()

    # Actualiza las propiedades del usuario
    if 'difficulties' in data:
        user.difficulties = data['difficulties']  # Se espera que sea un string
    if 'preferred_languages' in data:
        user.preferred_languages = data['preferred_languages']  # Se espera que sea un string

    # Guarda los cambios en la base de datos
    db.session.commit()

    # Devuelve la representación serializada del usuario actualizado
    return jsonify(user.serialize()), 200

# Ruta para recuperar todos los retos o un reto específico por ID
@api.route('/retos', methods=['GET'])
@api.route('/retos/<int:id>', methods=['GET'])
def obtener_retos(id=None):
    if id is None:
        # Recupera todos los retos de la base de datos
        retos = Reto.query.all()  # Obtiene todos los registros de la tabla Reto
        return jsonify([reto.serialize() for reto in retos]), 200  # Devuelve una lista de retos
    else:
        # Recupera un reto específico por ID
        reto = Reto.query.get(id)  # Busca el reto por ID
        if reto is None:
            return jsonify({"msg": "Reto no encontrado"}), 404
        return jsonify(reto.serialize()), 200  # Devuelve el reto encontrado

@api.route('/retos', methods=['POST'])
def agregar_retos():
    data = request.json

    if not data:
        return jsonify({"msg": "No se proporcionaron datos."}), 400

    if 'nombre_reto' in data and Reto.query.filter_by(nombre_reto=data['nombre_reto']).first():
        return jsonify({"msg": "El reto ya existe."}), 409

    nuevo_reto = Reto(
        nombre_reto=data.get('nombre_reto'),
        descripcion=data.get('descripcion'),
        dificultad=data.get('dificultad'),
        lenguaje=data.get('lenguaje'),
        pistas=data.get('pistas'),
        tests=json.dumps(data.get('tests', [])),  # Serializa los tests
        codigo=data.get('codigo'),
    )

    try:
        db.session.add(nuevo_reto)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error al guardar el reto.", "error": str(e)}), 500

    return jsonify(nuevo_reto.serialize()), 201

# Ruta para eliminar un reto específico por ID
@api.route('/retos/<int:id>', methods=['DELETE'])
def eliminar_reto(id):
    reto = Reto.query.get(id)  # Busca el reto por ID

    if reto is None:
        return jsonify({"msg": "Reto no encontrado"}), 404

    db.session.delete(reto)  # Elimina el reto
    db.session.commit()  # Guarda los cambios

    return jsonify({"msg": "Reto eliminado exitosamente"}), 200

# Ruta para eliminar todos los retos
@api.route('/retos/clear', methods=['DELETE'])
def eliminar_todos_los_retos():
    try:
        db.session.query(Reto).delete()  # Elimina todos los registros de la tabla Reto
        db.session.commit()  # Guarda los cambios
        return jsonify({"msg": "Todos los retos han sido eliminados."}), 200
    except Exception as e:
        return jsonify({"msg": "Error al eliminar todos los retos", "error": str(e)}), 500


# === Chat General ===

@api.route('/foro/mensajes', methods=['GET'])
def obtener_mensajes():
    """Obtiene todos los mensajes del chat general"""
    mensajes = Mensaje.query.all()
    return jsonify([mensaje.serialize() for mensaje in mensajes]), 200

@api.route('/foro/mensajes', methods=['POST'])
@jwt_required()
def agregar_mensaje():
    """Permite a un usuario autenticado enviar un mensaje en el chat general"""
    usuario_id = get_jwt_identity()
    contenido = request.json.get("contenido")
    if not contenido:
        return jsonify({"msg": "El contenido del mensaje es requerido"}), 400

    nuevo_mensaje = Mensaje(contenido=contenido, usuario_id=usuario_id)
    db.session.add(nuevo_mensaje)
    db.session.commit()
    return jsonify(nuevo_mensaje.serialize()), 201

if __name__ == '__main__':
    api.run(debug=True)