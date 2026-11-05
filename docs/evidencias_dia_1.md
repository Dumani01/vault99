# Día 1 completado

Verificado el 4 de noviembre de 2026, MySQL 8.0.46, Node 24.19.0.

| Criterio | Peso | Evidencia |
|---|---:|---|
| Modelado | 35 % | Cinco tablas conectadas, DDL ejecutado, PK/FK/UNIQUE/CHECK, DER editable y 3FN |
| Enfoque empresarial | 15 % | justificacion.md: inventario por talla para boutique conceptual |
| Estructura | 20 % | backend/src/models, controllers, routes, app.js y frontend/src/components, pages, services |
| Inicio CRUD | 30 % | POST /api/marcas 201, SELECT directo coincide; GET /api/marcas 200 |

## Evidencia HTTP real

```json
{
  "crear": {
    "method": "POST",
    "path": "/marcas",
    "body": {
      "nombre": "QA-A-1793811295505"
    },
    "status": 201,
    "response": {
      "success": true,
      "data": {
        "id": 8,
        "nombre": "QA-A-1793811295505",
        "descripcion": null,
        "pais_origen": null
      }
    }
  },
  "listar": {
    "method": "GET",
    "path": "/marcas",
    "status": 200,
    "response": {
      "success": true,
      "data": [
        {
          "id": 10,
          "nombre": "QA-B-1793811295505",
          "descripcion": null,
          "pais_origen": null
        },
        {
          "id": 8,
          "nombre": "QA-A-1793811295505",
          "descripcion": null,
          "pais_origen": null
        },
        {
          "id": 4,
          "nombre": "Off-White",
          "descripcion": "Referencia de diseño; sin afiliación.",
          "pais_origen": "Italia"
        },
        {
          "id": 3,
          "nombre": "Supreme",
          "descripcion": "Referencia streetwear; sin afiliación.",
          "pais_origen": "Estados Unidos"
        },
        {
          "id": 2,
          "nombre": "Louis Vuitton",
          "descripcion": "Referencia de diseño de lujo; sin afiliación.",
          "pais_origen": "Francia"
        },
        {
          "id": 1,
          "nombre": "Nike",
          "descripcion": "Referencia cultural; sin afiliación comercial.",
          "pais_origen": "Estados Unidos"
        }
      ]
    }
  }
}
```

El registro de prueba fue eliminado al terminar. api-evidence.json conserva las 62 peticiones/respuestas de los 25 grupos de integración. El ensayo usa un puerto efímero para aislar las pruebas; la aplicación usa 3011. No incluye credenciales.

## Verificación adicional

Tres pruebas unitarias de validación: aprobadas. API: aprobados los CRUD de las cinco entidades, FK inexistentes, duplicados, restricciones de borrado, stock, agregación y filtros. Build React: aprobado.

Navegador: carrusel anterior/siguiente; detalle y selección de talla; alta y edición de una marca desde React; recarga conservando el registro; formulario de inventario con opciones de MySQL; diálogo de confirmación de borrado. La eliminación efectiva se comprobó en la API. Los registros de prueba se limpiaron.
