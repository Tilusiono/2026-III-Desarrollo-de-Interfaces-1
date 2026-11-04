-- ==========================================================
-- SISTEMA DE VENTAS
-- MySQL 8.0.16+
-- Ejecutar una sola vez sobre una base nueva.
-- No elimina bases ni tablas existentes.
-- ==========================================================

CREATE DATABASE ventas_demo
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE ventas_demo;

-- ==========================================================
-- 1. TABLAS
-- ==========================================================

CREATE TABLE USUARIO (
    COD_USU INT AUTO_INCREMENT PRIMARY KEY,
    NOM VARCHAR(100) NOT NULL,
    APE VARCHAR(100) NOT NULL,
    CORREO VARCHAR(150) NOT NULL UNIQUE,
    FECHA_NACIMIENTO DATE,
    ACTIVO BOOLEAN NOT NULL DEFAULT TRUE,
    FECHA_REGISTRO DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB;

CREATE TABLE PRODUCTO (
    PRO INT AUTO_INCREMENT PRIMARY KEY,
    NOM VARCHAR(100) NOT NULL,
    PREC DECIMAL(12,2) NOT NULL,
    DESCRIPCION VARCHAR(500),
    STOCK INT NOT NULL DEFAULT 0,
    PESO_KG DOUBLE,
    CALIFICACION FLOAT,
    ACTIVO BOOLEAN NOT NULL DEFAULT TRUE,
    FOTO_URL VARCHAR(500),

    CONSTRAINT CK_PRODUCTO_PREC CHECK (PREC >= 0),
    CONSTRAINT CK_PRODUCTO_STOCK CHECK (STOCK >= 0),
    CONSTRAINT CK_PRODUCTO_PESO CHECK (PESO_KG >= 0),
    CONSTRAINT CK_PRODUCTO_CALIFICACION
        CHECK (CALIFICACION BETWEEN 0 AND 5)
) ENGINE = InnoDB;

CREATE TABLE VENTA (
    ID_VENTA INT AUTO_INCREMENT PRIMARY KEY,
    FECHA DATE NOT NULL,
    COD_USU INT NOT NULL,
    TOTAL DECIMAL(12,2) NOT NULL DEFAULT 0,
    HORA TIME NOT NULL,
    SUBTOTAL DECIMAL(12,2) NOT NULL DEFAULT 0,
    DESCUENTO DECIMAL(12,2) NOT NULL DEFAULT 0,
    IMPUESTO DECIMAL(12,2) NOT NULL DEFAULT 0,
    ESTADO VARCHAR(20) NOT NULL DEFAULT 'REGISTRADA',
    OBSERVACION VARCHAR(500),

    INDEX IDX_VENTA_FECHA (FECHA),

    CONSTRAINT FK_VENTA_USUARIO
        FOREIGN KEY (COD_USU)
        REFERENCES USUARIO (COD_USU)
        ON DELETE RESTRICT
        ON UPDATE RESTRICT,

    CONSTRAINT CK_VENTA_ESTADO
        CHECK (ESTADO IN ('REGISTRADA', 'PAGADA', 'ANULADA')),

    CONSTRAINT CK_VENTA_MONTOS CHECK (
        SUBTOTAL >= 0
        AND DESCUENTO >= 0
        AND DESCUENTO <= SUBTOTAL
        AND IMPUESTO >= 0
        AND TOTAL >= 0
    ),

    CONSTRAINT CK_VENTA_TOTAL
        CHECK (TOTAL = SUBTOTAL - DESCUENTO + IMPUESTO)
) ENGINE = InnoDB;

CREATE TABLE DETALLE_VENTA (
    ID_VENTA INT NOT NULL,
    ID_PRO INT NOT NULL,
    CANTIDAD INT NOT NULL,
    PRECIO DECIMAL(12,2) NOT NULL,
    DESCUENTO DECIMAL(12,2) NOT NULL DEFAULT 0,

    -- MySQL calcula este campo automáticamente.
    IMPORTE DECIMAL(12,2)
        GENERATED ALWAYS AS (
            CANTIDAD * PRECIO - DESCUENTO
        ) STORED,

    OBSERVACION VARCHAR(500),

    PRIMARY KEY (ID_VENTA, ID_PRO),

    CONSTRAINT FK_DETALLE_VENTA
        FOREIGN KEY (ID_VENTA)
        REFERENCES VENTA (ID_VENTA)
        ON DELETE RESTRICT
        ON UPDATE RESTRICT,

    CONSTRAINT FK_DETALLE_PRODUCTO
        FOREIGN KEY (ID_PRO)
        REFERENCES PRODUCTO (PRO)
        ON DELETE RESTRICT
        ON UPDATE RESTRICT,

    CONSTRAINT CK_DETALLE_CANTIDAD CHECK (CANTIDAD > 0),
    CONSTRAINT CK_DETALLE_PRECIO CHECK (PRECIO >= 0),

    CONSTRAINT CK_DETALLE_DESCUENTO CHECK (
        DESCUENTO >= 0
        AND DESCUENTO <= CANTIDAD * PRECIO
    )
) ENGINE = InnoDB;

-- ==========================================================
-- 2. INSERTAR 10 USUARIOS
-- Datos ficticios de demostración.
-- ==========================================================

INSERT INTO USUARIO
    (COD_USU, NOM, APE, CORREO, FECHA_NACIMIENTO)
VALUES
(1, 'Daniel', 'Inche', 'daniel@example.com', '1995-05-12'),
(2, 'Rosa', 'Sanchez', 'rosa@example.com', '1998-03-20'),
(3, 'Luis', 'Perez', 'luis@example.com', '1992-07-15'),
(4, 'Maria', 'Torres', 'maria@example.com', '1997-11-08'),
(5, 'Carlos', 'Ramirez', 'carlos@example.com', '1990-01-25'),
(6, 'Ana', 'Flores', 'ana@example.com', '1999-09-10'),
(7, 'Jorge', 'Medina', 'jorge@example.com', '1993-12-03'),
(8, 'Lucia', 'Vargas', 'lucia@example.com', '2000-06-18'),
(9, 'Pedro', 'Castro', 'pedro@example.com', '1996-04-22'),
(10, 'Sofia', 'Rojas', 'sofia@example.com', '2001-08-30');

-- ==========================================================
-- 3. INSERTAR 20 PRODUCTOS
-- PREC se considera precio SIN impuesto en esta simulación.
-- Stock inicial: 100 unidades por producto.
-- Las rutas de fotos son ejemplos: debes añadir los archivos.
-- ==========================================================

INSERT INTO PRODUCTO
    (PRO, NOM, PREC, DESCRIPCION, STOCK,
     PESO_KG, CALIFICACION, FOTO_URL)
VALUES
(1, 'Laptop', 3300.00,
 'Laptop de 16 GB de RAM y SSD de 512 GB',
 100, 1.85, 4.7, '/imagenes/productos/laptop.jpg'),

(2, 'PC', 29000.00,
 'Estacion de trabajo de alto rendimiento',
 100, 12.50, 4.9, '/imagenes/productos/pc.jpg'),

(3, 'Celular', 3300.00,
 'Telefono inteligente de 256 GB',
 100, 0.19, 4.6, '/imagenes/productos/celular.jpg'),

(4, 'Monitor', 850.00,
 'Monitor de 24 pulgadas',
 100, 3.20, 4.5, '/imagenes/productos/monitor.jpg'),

(5, 'Teclado', 180.00,
 'Teclado mecanico USB',
 100, 0.85, 4.4, '/imagenes/productos/teclado.jpg'),

(6, 'Mouse', 90.00,
 'Mouse optico inalambrico',
 100, 0.12, 4.3, '/imagenes/productos/mouse.jpg'),

(7, 'Impresora', 1200.00,
 'Impresora multifuncional',
 100, 5.40, 4.5, '/imagenes/productos/impresora.jpg'),

(8, 'Tablet', 1500.00,
 'Tablet de 10 pulgadas',
 100, 0.48, 4.4, '/imagenes/productos/tablet.jpg'),

(9, 'Audifonos', 250.00,
 'Audifonos Bluetooth',
 100, 0.23, 4.6, '/imagenes/productos/audifonos.jpg'),

(10, 'Parlante', 320.00,
 'Parlante portatil Bluetooth',
 100, 0.75, 4.2, '/imagenes/productos/parlante.jpg'),

(11, 'Camara web', 210.00,
 'Camara web Full HD',
 100, 0.15, 4.3, '/imagenes/productos/camara-web.jpg'),

(12, 'Microfono', 380.00,
 'Microfono USB para grabacion',
 100, 0.65, 4.7, '/imagenes/productos/microfono.jpg'),

(13, 'Disco SSD', 350.00,
 'Unidad SSD de 1 TB',
 100, 0.05, 4.8, '/imagenes/productos/ssd.jpg'),

(14, 'Memoria RAM', 220.00,
 'Memoria DDR4 de 16 GB',
 100, 0.04, 4.6, '/imagenes/productos/ram.jpg'),

(15, 'Router', 280.00,
 'Router Wi-Fi de doble banda',
 100, 0.45, 4.4, '/imagenes/productos/router.jpg'),

(16, 'Memoria USB', 45.00,
 'Memoria USB de 64 GB',
 100, 0.02, 4.1, '/imagenes/productos/usb.jpg'),

(17, 'Disco externo', 310.00,
 'Disco externo de 1 TB',
 100, 0.24, 4.5, '/imagenes/productos/disco-externo.jpg'),

(18, 'Proyector', 2400.00,
 'Proyector Full HD',
 100, 2.80, 4.6, '/imagenes/productos/proyector.jpg'),

(19, 'UPS', 650.00,
 'Sistema de alimentacion ininterrumpida',
 100, 4.50, 4.7, '/imagenes/productos/ups.jpg'),

(20, 'Cable HDMI', 35.00,
 'Cable HDMI de 2 metros',
 100, 0.10, 4.2, '/imagenes/productos/hdmi.jpg');

-- ==========================================================
-- 4. GENERAR 100 VENTAS Y 300 DETALLES
--
-- Cada usuario tendrá 10 ventas.
-- Cada venta tendrá 3 productos diferentes.
-- Cantidades: entre 1 y 3 unidades por detalle.
-- Cada quinta venta tendrá 5% de descuento.
-- Impuesto de ejemplo: 18% sobre la base con descuento.
-- Se descuenta el stock vendido.
-- ==========================================================

DELIMITER $$

CREATE PROCEDURE GENERAR_VENTAS_DEMO()
BEGIN
    DECLARE v_numero INT DEFAULT 1;
    DECLARE v_linea INT;
    DECLARE v_venta INT;
    DECLARE v_producto INT;
    DECLARE v_cantidad INT;

    DECLARE v_precio DECIMAL(12,2);
    DECLARE v_descuento_linea DECIMAL(12,2);
    DECLARE v_subtotal DECIMAL(12,2);
    DECLARE v_descuento DECIMAL(12,2);
    DECLARE v_impuesto DECIMAL(12,2);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    IF EXISTS (SELECT 1 FROM VENTA) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT =
                'La carga de ejemplo requiere la tabla VENTA vacia.';
    END IF;

    WHILE v_numero <= 100 DO

        INSERT INTO VENTA (
            FECHA, COD_USU, TOTAL, HORA,
            SUBTOTAL, DESCUENTO, IMPUESTO,
            ESTADO, OBSERVACION
        )
        VALUES (
            DATE_ADD('2026-07-01', INTERVAL (v_numero - 1) DAY),
            MOD(v_numero - 1, 10) + 1,
            0,
            MAKETIME(9 + MOD(v_numero, 9), MOD(v_numero * 7, 60), 0),
            0, 0, 0,
            'PAGADA',
            CONCAT('Venta de demostracion numero ', v_numero)
        );

        SET v_venta = LAST_INSERT_ID();
        SET v_linea = 1;

        WHILE v_linea <= 3 DO

            -- Tres productos distintos por venta.
            SET v_producto =
                MOD((v_numero - 1) * 3 + v_linea - 1, 20) + 1;

            SET v_cantidad = MOD(v_numero + v_linea, 3) + 1;

            SELECT PREC
              INTO v_precio
              FROM PRODUCTO
             WHERE PRO = v_producto;

            SET v_descuento_linea =
                CASE
                    WHEN MOD(v_numero, 5) = 0
                    THEN ROUND(v_cantidad * v_precio * 0.05, 2)
                    ELSE 0
                END;

            INSERT INTO DETALLE_VENTA (
                ID_VENTA, ID_PRO, CANTIDAD,
                PRECIO, DESCUENTO, OBSERVACION
            )
            VALUES (
                v_venta,
                v_producto,
                v_cantidad,
                v_precio,
                v_descuento_linea,
                CASE
                    WHEN MOD(v_numero, 5) = 0
                    THEN 'Descuento promocional del 5%'
                    ELSE 'Precio regular'
                END
            );

            UPDATE PRODUCTO
               SET STOCK = STOCK - v_cantidad
             WHERE PRO = v_producto
               AND STOCK >= v_cantidad;

            IF ROW_COUNT() <> 1 THEN
                SIGNAL SQLSTATE '45000'
                    SET MESSAGE_TEXT = 'Stock insuficiente.';
            END IF;

            SET v_linea = v_linea + 1;
        END WHILE;

        SELECT
            SUM(CANTIDAD * PRECIO),
            SUM(DESCUENTO)
        INTO v_subtotal, v_descuento
        FROM DETALLE_VENTA
        WHERE ID_VENTA = v_venta;

        SET v_impuesto =
            ROUND((v_subtotal - v_descuento) * 0.18, 2);

        UPDATE VENTA
           SET SUBTOTAL = v_subtotal,
               DESCUENTO = v_descuento,
               IMPUESTO = v_impuesto,
               TOTAL = v_subtotal - v_descuento + v_impuesto
         WHERE ID_VENTA = v_venta;

        SET v_numero = v_numero + 1;
    END WHILE;

    COMMIT;
END$$

DELIMITER ;

CALL GENERAR_VENTAS_DEMO();

-- El procedimiento solo se utiliza para cargar los ejemplos.
DROP PROCEDURE GENERAR_VENTAS_DEMO;

-- ==========================================================
-- 5. VERIFICAR CANTIDADES
-- Resultado esperado: 10, 20, 100 y 300.
-- ==========================================================

SELECT 'USUARIO' AS TABLA, COUNT(*) AS REGISTROS FROM USUARIO
UNION ALL
SELECT 'PRODUCTO', COUNT(*) FROM PRODUCTO
UNION ALL
SELECT 'VENTA', COUNT(*) FROM VENTA
UNION ALL
SELECT 'DETALLE_VENTA', COUNT(*) FROM DETALLE_VENTA;

-- ==========================================================
-- 6. LISTAR VENTAS CON EL USUARIO
-- ==========================================================

SELECT
    v.ID_VENTA,
    v.FECHA,
    v.HORA,
    CONCAT(u.NOM, ' ', u.APE) AS USUARIO,
    v.SUBTOTAL,
    v.DESCUENTO,
    v.IMPUESTO,
    v.TOTAL,
    v.ESTADO
FROM VENTA v
INNER JOIN USUARIO u ON u.COD_USU = v.COD_USU
ORDER BY v.ID_VENTA;

-- ==========================================================
-- 7. CONSULTAR DETALLES DE LA VENTA 1
-- ==========================================================

SELECT
    d.ID_VENTA,
    p.PRO,
    p.NOM AS PRODUCTO,
    p.FOTO_URL,
    d.CANTIDAD,
    d.PRECIO,
    d.DESCUENTO,
    d.IMPORTE
FROM DETALLE_VENTA d
INNER JOIN PRODUCTO p ON p.PRO = d.ID_PRO
WHERE d.ID_VENTA = 1
ORDER BY p.PRO;

-- ==========================================================
-- 8. VALIDAR CABECERAS CONTRA DETALLES
-- Si todo está correcto, devuelve cero filas.
-- ==========================================================

SELECT
    v.ID_VENTA,
    v.SUBTOTAL,
    x.SUBTOTAL_CALCULADO,
    v.DESCUENTO,
    x.DESCUENTO_CALCULADO,
    v.TOTAL
FROM VENTA v
INNER JOIN (
    SELECT
        ID_VENTA,
        SUM(CANTIDAD * PRECIO) AS SUBTOTAL_CALCULADO,
        SUM(DESCUENTO) AS DESCUENTO_CALCULADO
    FROM DETALLE_VENTA
    GROUP BY ID_VENTA
) x ON x.ID_VENTA = v.ID_VENTA
WHERE v.SUBTOTAL <> x.SUBTOTAL_CALCULADO
   OR v.DESCUENTO <> x.DESCUENTO_CALCULADO
   OR v.TOTAL <> ROUND(
        (x.SUBTOTAL_CALCULADO - x.DESCUENTO_CALCULADO) * 1.18,
        2
   );

-- ==========================================================
-- 9. CONSULTAR STOCK RESTANTE
-- ==========================================================

SELECT PRO, NOM, PREC, STOCK, FOTO_URL
FROM PRODUCTO
ORDER BY PRO;