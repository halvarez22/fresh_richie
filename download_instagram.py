#!/usr/bin/env python3
"""
Script para descargar imágenes de Instagram
"""
import requests
import os
import re
from urllib.parse import urlparse
import time

def download_image(url, filename, folder="images"):
    """Descarga una imagen desde una URL"""
    try:
        # Crear la carpeta si no existe
        os.makedirs(folder, exist_ok=True)
        
        # Headers para simular un navegador
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        # Descargar la imagen
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()
        
        # Guardar la imagen
        filepath = os.path.join(folder, filename)
        with open(filepath, 'wb') as f:
            f.write(response.content)
        
        print(f"✅ Descargada: {filename}")
        return True
        
    except Exception as e:
        print(f"❌ Error descargando {filename}: {str(e)}")
        return False

def main():
    """Función principal"""
    print("🎵 Descargando fotos de Fresh Richie desde Instagram...")
    
    # URLs de imágenes de Instagram (necesitarás reemplazar estas con las URLs reales)
    # Estas son URLs de ejemplo - necesitarás las URLs reales de las imágenes
    image_urls = [
        # Agregar aquí las URLs reales de las imágenes de Instagram
        # Ejemplo: "https://scontent.cdninstagram.com/v/..."
    ]
    
    if not image_urls:
        print("⚠️  No hay URLs de imágenes para descargar.")
        print("📝 Instrucciones:")
        print("1. Ve a https://www.instagram.com/freshrichie.vhs/p/DN1Qn283E8l/")
        print("2. Haz clic derecho en cada imagen")
        print("3. Selecciona 'Copiar dirección de imagen'")
        print("4. Agrega las URLs al script")
        return
    
    # Descargar cada imagen
    success_count = 0
    for i, url in enumerate(image_urls, 1):
        filename = f"fresh_richie_{i:02d}.jpg"
        if download_image(url, filename):
            success_count += 1
        time.sleep(1)  # Pausa entre descargas
    
    print(f"\n🎉 Descarga completada: {success_count}/{len(image_urls)} imágenes")

if __name__ == "__main__":
    main()
