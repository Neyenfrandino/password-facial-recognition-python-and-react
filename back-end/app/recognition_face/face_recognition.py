import cv2
import face_recognition as fr
import os
import numpy as np
import base64
from io import BytesIO
from PIL import Image
import io
import time

def resize_image(image, size=(500, 500)):
    return cv2.resize(image, size)

def decode_base64_image(file):
    """
    Decodifica una imagen en base64 y la convierte a un arreglo de numpy.

    Args:
    file (str): Cadena en base64 de la imagen.

    Returns:
    np.ndarray: Imagen convertida a arreglo de numpy.
    """
    try:
        # Eliminar el encabezado
        base64_data = file.replace("data:image/jpeg;base64,", "")
        # Decodificar la cadena Base64
        image_data = base64.b64decode(base64_data)
        # Crear un objeto de flujo de bytes
        image_stream = io.BytesIO(image_data)
        # Abrir la imagen usando Pillow
        imagen_pillow = Image.open(image_stream)
        # Convertir la imagen a un arreglo de numpy
        imagen = np.array(imagen_pillow)
        return imagen
    except Exception as e:
        print(f"Error al decodificar la imagen base64: {e}")
        return None

# Caché para imágenes decodificadas
decode_cache = {}

def decode_base64_image_cached(file):
    """
    Decodifica una imagen en base64 y la convierte a un arreglo de numpy,
    utilizando una caché para evitar decodificar la misma imagen varias veces.

    Args:
    file (str): Cadena en base64 de la imagen.

    Returns:
    np.ndarray: Imagen convertida a arreglo de numpy.
    """
    if file in decode_cache:
        return decode_cache[file]

    imagen = decode_base64_image(file)
    decode_cache[file] = imagen

    return imagen

def codificar(imagenes):
    # Crear una lista nueva
    lista_codificada = []

    # Pasar todas la imágenes a RGB
    for imagen in imagenes:
        imagen = cv2.cvtColor(imagen, cv2.COLOR_BGR2RGB)

        # Codificar
        codificado = fr.face_encodings(imagen)[0]

        # Agregar a la lista
        lista_codificada.append(codificado)

    # Devolver una lista codificada
    return lista_codificada

def compare_images(file):
    start_time = time.time()  # Guardar el tiempo antes de ejecutar las funciones

    imagen = decode_base64_image_cached(file)

    ruta = './app/recognition_face/img'
    mis_imagenes = []
    # nombres_empleados = []
    lista_empleados = os.listdir(ruta)

    for nombre in lista_empleados:
        # Cargar cada imagen individual a la lista creada
        imagen_actual = cv2.imread(os.path.join(ruta, nombre))

        if imagen_actual is None:
            print(f"No se pudo cargar la imagen: {nombre}")
        else:
            imagen_actual = resize_image(imagen_actual)
            mis_imagenes.append(imagen_actual)

    lista_empleados_codificada = codificar(mis_imagenes)

    cara_captura = fr.face_locations(imagen)

    # Codificar cara capturada
    cara_captura_codificada = fr.face_encodings(np.array(imagen), cara_captura)

    for caracodif, caraubic in zip(cara_captura_codificada, cara_captura):
        coincidencias = fr.compare_faces(lista_empleados_codificada, caracodif)
        distancias = fr.face_distance(lista_empleados_codificada, caracodif)

        indice_coincidencia = np.argmin(distancias)

        # Mostrar coincidencia
        if distancias[indice_coincidencia] > 0.6:
            message = ("No coincide con ninguno de nuestros empleados")
            return message
        else:
            
            elapsed_time = time.time() - start_time  # Calcular el tiempo transcurrido
            mesagge = (f"Bienvenido sr. {distancias[indice_coincidencia]} {coincidencias} Tiempo transcurrido: {elapsed_time} segundos ")
            return mesagge




