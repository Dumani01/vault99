export const entities={
  "marcas": {
    "nombre": {
      "type": "text",
      "required": true,
      "max": 120
    },
    "descripcion": {
      "type": "text",
      "max": 255
    },
    "pais_origen": {
      "type": "text",
      "max": 100
    }
  },
  "colaboraciones": {
    "nombre": {
      "type": "text",
      "required": true,
      "max": 180
    },
    "marca_principal_id": {
      "type": "id",
      "required": true
    },
    "marca_colaboradora_id": {
      "type": "id",
      "required": true
    },
    "anio_lanzamiento": {
      "type": "year",
      "required": true
    },
    "historia": {
      "type": "text",
      "max": 16000
    },
    "edicion_limitada": {
      "type": "bool",
      "required": true,
      "default": true
    }
  },
  "tenis": {
    "colaboracion_id": {
      "type": "id",
      "required": true
    },
    "sku": {
      "type": "text",
      "required": true,
      "max": 60
    },
    "modelo": {
      "type": "text",
      "required": true,
      "max": 180
    },
    "colorway": {
      "type": "text",
      "required": true,
      "max": 120
    },
    "descripcion": {
      "type": "text",
      "max": 16000
    },
    "precio_venta_crc": {
      "type": "money",
      "required": true,
      "min": 0.01
    },
    "costo_adquisicion_crc": {
      "type": "money",
      "min": 0
    },
    "rareza": {
      "type": "enum",
      "required": true,
      "values": [
        "EXCLUSIVO",
        "MUY_RARO",
        "GRAIL"
      ]
    },
    "condicion": {
      "type": "enum",
      "required": true,
      "values": [
        "NUEVO",
        "COLECCION"
      ]
    },
    "autenticidad_estado": {
      "type": "enum",
      "required": true,
      "default": "PENDIENTE",
      "values": [
        "PENDIENTE",
        "VERIFICADA"
      ]
    },
    "imagen_url": {
      "type": "url",
      "max": 500
    }
  },
  "tallas": {
    "sistema": {
      "type": "enum",
      "required": true,
      "values": [
        "US_HOMBRE",
        "US_MUJER",
        "EU"
      ]
    },
    "valor": {
      "type": "size",
      "required": true
    }
  },
  "inventario": {
    "tenis_id": {
      "type": "id",
      "required": true
    },
    "talla_id": {
      "type": "id",
      "required": true
    },
    "cantidad": {
      "type": "count",
      "required": true,
      "default": 0
    },
    "ubicacion": {
      "type": "text",
      "max": 120
    }
  }
};
