# Frames para animación scroll-scrub (estilo Apple) — Oficinas Magistral

Secuencia de imágenes extraída de la toma de drone para hacer el efecto de
animación controlada por scroll (el que usa Apple en AirPods/MacBook): en vez
de un `<video>`, se dibuja un frame en un `<canvas>` según la posición del scroll.

---

## 📦 Qué hay en esta carpeta

| Archivo / carpeta | Qué es |
|---|---|
| `recorte.mp4` | Video original de drone (fuente). |
| `generar_frames.py` | Script reutilizable que extrae los frames del video. |
| `frames/` | Las imágenes generadas (lo que usas en la web). |

### Datos de los frames generados (estado actual)

- **Cantidad:** 60 frames
- **Nombres:** `frame_0001.jpg` … `frame_0060.jpg` (numeración con 4 dígitos)
- **Resolución:** 1920 × 1080 px (Full HD nativo)
- **Peso total:** ~26 MB
- **fps efectivo:** ~2.5 fps (sobre los 24.2 s del video)
- **Por qué tan pocos:** la toma es lenta / modo cine, así que con ~60 frames
  el scrub se ve perfectamente fluido (validado en `preview.html`) y ganamos
  resolución nativa.

> Estos números pueden cambiar si vuelves a correr el script con otras opciones.
> Al terminar, el script imprime **el número total de frames** que generó: ese
> es el valor que tu web necesita.

---

## 🔁 Cómo regenerar los frames (cuando llegue el video con el pin)

Cuando la diseñadora te devuelva el video (mismo plano pero con el pin en las
oficinas), **solo vuelves a correr el script** y se regenera todo igual.

### Requisitos
- `ffmpeg` y `ffprobe` instalados y accesibles en el PATH (ya lo están en esta máquina).
- Python 3.

### Uso simple
Si el nuevo video se llama igual (`recorte.mp4`), basta con:

```bash
python generar_frames.py
```

Si tiene otro nombre, apúntale al archivo:

```bash
python generar_frames.py --input recorte_con_pin.mp4
```

El script **borra y regenera** la carpeta `frames/` para que cada corrida sea
idéntica y reproducible. Al final imprime cuántos frames generó.

### Opciones disponibles

| Opción | Por defecto | Para qué sirve |
|---|---|---|
| `--input` | `recorte.mp4` | Video de entrada. |
| `--output` | `frames` | Carpeta de salida. |
| `--frames` | `60` | Número aproximado de frames (se logra remuestreando a fps). |
| `--width` | `1920` | Ancho en px (el alto se ajusta solo, manteniendo proporción). |
| `--quality` | `3` | Calidad JPEG (2 = mejor/más pesado, 31 = peor/más liviano). |
| `--prefix` | `frame_` | Prefijo del nombre de cada imagen. |

Ejemplos:

```bash
# Más ligero (menos frames)
python generar_frames.py --frames 200

# Máxima nitidez (cuidado: más peso)
python generar_frames.py --quality 4 --width 1920
```

---

## 🧠 Por qué 60 frames (y resolución nativa)

- Apple **no razona en fps**: ata cada frame a la **posición del scroll**, no al
  tiempo. Su animación de AirPods Pro usa solo **148 frames** en total.
- Esta toma de drone es **lenta / modo cine**: hay poco cambio entre un instante
  y el siguiente, así que **~60 frames bastan** para que el scrub se vea fluido
  (se validó visualmente con `preview.html`).
- Al usar tan pocos frames, sobra presupuesto de peso → subimos a **1920×1080
  nativo** con calidad alta y aun así pesa solo ~26 MB.

> Si en el futuro la toma fuera más rápida o con más movimiento, sube `--frames`
> (p. ej. 145 o 290) para evitar saltos.

---

## 🌐 Cómo usar los frames en la web (React) — referencia

> Esta parte es solo orientativa para quien programe el front. La idea central:
> precargar las imágenes y, en cada evento de scroll, dibujar en un `<canvas>` el
> frame que corresponde al progreso del scroll.

Lo que tu código necesita saber:

```js
const TOTAL_FRAMES = 60;             // <-- el número que imprime el script
const frameSrc = (i) =>
  `/frames/frame_${String(i).padStart(4, "0")}.jpg`; // frame_0001.jpg ...
```

Flujo típico:

1. **Precargar** las 60 imágenes (`new Image()`) y guardarlas en un array.
2. Medir el **progreso del scroll** de la sección (0 → 1).
3. Mapear ese progreso al índice de frame:
   `frameIndex = Math.round(progress * (TOTAL_FRAMES - 1))`.
4. Dibujar ese frame en el `<canvas>` dentro de un `requestAnimationFrame`.

Recomendaciones de rendimiento:
- Sirve los frames con buen cacheo (carpeta estática / CDN).
- Considera **carga progresiva** (no bloquear el render hasta tener las 60).
- El `<canvas>` puede ir en `position: sticky` mientras dura la sección de scroll.
- Librerías que facilitan el "scrub": **GSAP + ScrollTrigger** es la opción más
  usada para replicar exactamente el efecto de Apple.

---

## ✅ Checklist al recibir el video con el pin

1. Copia el nuevo video a esta carpeta.
2. Corre `python generar_frames.py` (o con `--input <nombre>`).
3. Anota el **número total de frames** que imprime el script.
4. Actualiza `TOTAL_FRAMES` en tu código web si cambió.
5. Sube la carpeta `frames/` actualizada a tu proyecto.
