SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
DROP DATABASE IF EXISTS venta;
CREATE DATABASE venta;
USE venta;

CREATE TABLE CATEGORIA
(
  CAT         INT          NOT NULL,
  DESCRIPCION VARCHAR(100) NOT NULL,
  ACTIVO      BOOLEAN      NOT NULL DEFAULT TRUE,
  PRIMARY KEY (CAT)
);

CREATE TABLE PRODUCTO
(
  PK_PRO       INT           NOT NULL AUTO_INCREMENT,
  FK_CAT       INT           NOT NULL,
  NOM          VARCHAR(100)  NOT NULL,
  PREC         DECIMAL(12,2) NOT NULL,
  DESCRIPCION  VARCHAR(500)  NULL    ,
  STOCK        INT           NOT NULL DEFAULT 0,
  PESO_KG      DOUBLE        NULL    ,
  CALIFICACION FLOAT         NULL    ,
  ACTIVO       BOOLEAN       NOT NULL DEFAULT TRUE,
  FOTO_URL     VARCHAR(500)  NULL    ,
  PRIMARY KEY (PK_PRO)
);

CREATE TABLE USUARIO
(
  PK_COD_USU       INT          NOT NULL AUTO_INCREMENT,
  NOM              VARCHAR(100) NOT NULL,
  APE              VARCHAR(100) NOT NULL,
  CORREO           VARCHAR(150) NOT NULL,
  FECHA_NACIMIENTO DATE         NULL    ,
  ACTIVO           BOOLEAN      NOT NULL DEFAULT TRUE,
  FECHA_REGISTRO   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (PK_COD_USU)
);

ALTER TABLE USUARIO
  ADD CONSTRAINT UQ_USUARIO_CORREO UNIQUE (CORREO);

CREATE TABLE VENTA
(
  PK_ID_VENTA    INT           NOT NULL AUTO_INCREMENT,
  FK_COD_CLIENTE INT           NOT NULL,
  FK_COD_CAJERO  INT           NOT NULL,
  FECHA          DATE          NOT NULL,
  TOTAL          DECIMAL(12,2) NOT NULL DEFAULT 0,
  HORA           TIME          NOT NULL,
  SUBTOTAL       DECIMAL(12,2) NOT NULL DEFAULT 0,
  DESCUENTO      DECIMAL(12,2) NOT NULL DEFAULT 0,
  IMPUESTO       DECIMAL(12,2) NOT NULL DEFAULT 0,
  ESTADO         VARCHAR(20)   NOT NULL DEFAULT 'REGISTRADA',
  OBSERVACION    VARCHAR(500)  NULL    ,
  PRIMARY KEY (PK_ID_VENTA)
);

CREATE TABLE DETALLE_VENTA
(
  ID_VENTA    INT           NOT NULL,
  ID_PRO      INT           NOT NULL,
  CANTIDAD    INT           NOT NULL,
  PRECIO      DECIMAL(12,2) NOT NULL,
  DESCUENTO   DECIMAL(12,2) NOT NULL DEFAULT 0,
  IMPORTE     DECIMAL(12,2) NULL    ,
  OBSERVACION VARCHAR(500)  NULL    ,
  PRIMARY KEY (ID_VENTA, ID_PRO)
);

ALTER TABLE DETALLE_VENTA
  ADD CONSTRAINT FK_VENTA_TO_DETALLE_VENTA
    FOREIGN KEY (ID_VENTA)
    REFERENCES VENTA (PK_ID_VENTA)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT;

ALTER TABLE DETALLE_VENTA
  ADD CONSTRAINT FK_PRODUCTO_TO_DETALLE_VENTA
    FOREIGN KEY (ID_PRO)
    REFERENCES PRODUCTO (PK_PRO)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT;

ALTER TABLE VENTA
  ADD CONSTRAINT FK_USUARIO_TO_VENTA
    FOREIGN KEY (FK_COD_CLIENTE)
    REFERENCES USUARIO (PK_COD_USU)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT;

ALTER TABLE VENTA
  ADD CONSTRAINT FK_USUARIO_TO_VENTA1
    FOREIGN KEY (FK_COD_CAJERO)
    REFERENCES USUARIO (PK_COD_USU);

ALTER TABLE PRODUCTO
  ADD CONSTRAINT FK_CATEGORIA_TO_PRODUCTO
    FOREIGN KEY (FK_CAT)
    REFERENCES CATEGORIA (CAT);

CREATE INDEX IDX_VENTA_FECHA
  ON VENTA (FECHA ASC);

-- ==========================================
-- 1. INSERTAR REGISTROS EN CATEGORIA (10)
-- ==========================================
INSERT INTO CATEGORIA (CAT, DESCRIPCION, ACTIVO) VALUES 
(1, 'Electrónica y Tecnología', TRUE),
(2, 'Línea Blanca', TRUE),
(3, 'Ropa y Accesorios', TRUE),
(4, 'Alimentos y Bebidas', TRUE),
(5, 'Hogar y Decoración', TRUE),
(6, 'Deportes y Aire Libre', TRUE),
(7, 'Juguetes y Entretenimiento', TRUE),
(8, 'Salud y Cuidado Personal', TRUE),
(9, 'Libros y Papelería', TRUE),
(10, 'Ferretería y Herramientas', TRUE);

-- ==========================================
-- 2. INSERTAR REGISTROS EN USUARIO (10)
-- ==========================================
INSERT INTO USUARIO (NOM, APE, CORREO, FECHA_NACIMIENTO, ACTIVO) VALUES 
('Juan', 'Pérez', 'juan.perez@email.com', '1985-04-12', TRUE),
('María', 'Gómez', 'maria.gomez@email.com', '1990-08-22', TRUE),
('Carlos', 'López', 'carlos.lopez@email.com', '1982-12-05', TRUE),
('Ana', 'Torres', 'ana.torres@email.com', '1995-03-18', TRUE),
('Luis', 'Ramírez', 'luis.ramirez@email.com', '1988-07-30', TRUE),
('Sofía', 'Martínez', 'sofia.martinez@email.com', '1992-11-11', TRUE),
('Pedro', 'Sánchez', 'pedro.sanchez@email.com', '1980-01-25', TRUE),
('Lucía', 'Fernández', 'lucia.fernandez@email.com', '1998-05-14', TRUE),
('Jorge', 'Díaz', 'jorge.diaz@email.com', '1987-09-09', TRUE),
('Elena', 'Castro', 'elena.castro@email.com', '1993-06-20', TRUE);

-- ==========================================
-- 3. INSERTAR REGISTROS EN PRODUCTO (10)
-- ==========================================
INSERT INTO PRODUCTO (FK_CAT, NOM, PREC, DESCRIPCION, STOCK, PESO_KG, CALIFICACION, ACTIVO, FOTO_URL) VALUES 
(1, 'Smartphone X1', 699.99, 'Teléfono inteligente con 128GB de almacenamiento', 50, 0.18, 4.5, TRUE, 'http://img.com/x1.jpg'),
(1, 'Laptop Pro 14', 1299.50, 'Laptop de 14 pulgadas con procesador de alta velocidad', 20, 1.45, 4.8, TRUE, 'http://img.com/laptop.jpg'),
(2, 'Refrigeradora No Frost', 850.00, 'Refrigeradora de doble puerta 300L', 10, 65.00, 4.2, TRUE, 'http://img.com/refri.jpg'),
(3, 'Camisa Formal Hombre', 35.50, 'Camisa de algodón manga larga', 100, 0.30, 4.0, TRUE, 'http://img.com/camisa.jpg'),
(4, 'Café Molido Premium', 8.99, 'Café tostado y molido de origen 500g', 200, 0.50, 4.9, TRUE, 'http://img.com/cafe.jpg'),
(5, 'Juego de Sábanas Queen', 45.00, 'Juego de sábanas de 400 hilos', 40, 1.20, 4.3, TRUE, 'http://img.com/sabanas.jpg'),
(6, 'Bicicleta de Montaña', 320.00, 'Bicicleta aro 29 con frenos de disco', 15, 14.50, 4.6, TRUE, 'http://img.com/bici.jpg'),
(7, 'Consola de Videojuegos', 499.99, 'Consola de última generación', 25, 3.80, 4.9, TRUE, 'http://img.com/consola.jpg'),
(8, 'Set de Cuidado Facial', 29.99, 'Kit limpiador, tónico e hidratante', 60, 0.40, 4.4, TRUE, 'http://img.com/skincare.jpg'),
(10, 'Taladro Percutor', 75.00, 'Taladro eléctrico 600W con maletín', 30, 2.10, 4.7, TRUE, 'http://img.com/taladro.jpg');

-- ==========================================
-- 4. INSERTAR REGISTROS EN VENTA (10)
-- ==========================================
INSERT INTO VENTA (FK_COD_CLIENTE, FK_COD_CAJERO, FECHA, TOTAL, HORA, SUBTOTAL, DESCUENTO, IMPUESTO, ESTADO, OBSERVACION) VALUES 
(1, 5, '2026-06-01', 735.49, '10:30:00', 699.98, 0.00, 35.51, 'REGISTRADA', 'Venta en efectivo'),
(2, 5, '2026-06-01', 1299.50, '11:15:00', 1237.62, 0.00, 61.88, 'REGISTRADA', 'Pago con tarjeta de crédito'),
(3, 6, '2026-06-02', 850.00, '12:00:00', 809.52, 0.00, 40.48, 'REGISTRADA', 'Entrega a domicilio programada'),
(4, 6, '2026-06-02', 35.50, '13:45:00', 33.81, 0.00, 1.69, 'REGISTRADA', NULL),
(5, 7, '2026-06-03', 17.98, '14:20:00', 17.12, 0.00, 0.86, 'REGISTRADA', 'Compra rápida'),
(6, 7, '2026-06-03', 45.00, '15:10:00', 42.86, 0.00, 2.14, 'REGISTRADA', NULL),
(7, 8, '2026-06-04', 320.00, '16:05:00', 304.76, 0.00, 15.24, 'REGISTRADA', 'Descuento aplicado por campaña'),
(8, 8, '2026-06-04', 499.99, '17:30:00', 476.18, 0.00, 23.81, 'REGISTRADA', NULL),
(9, 9, '2026-06-05', 29.99, '18:00:00', 28.56, 0.00, 1.43, 'REGISTRADA', NULL),
(10, 9, '2026-06-05', 75.00, '19:12:00', 71.43, 0.00, 3.57, 'REGISTRADA', 'Garantía extendida solicitada');

-- ==========================================
-- 5. INSERTAR REGISTROS EN DETALLE_VENTA (10)
-- ==========================================
INSERT INTO DETALLE_VENTA (ID_VENTA, ID_PRO, CANTIDAD, PRECIO, DESCUENTO, IMPORTE, OBSERVACION) VALUES 
(1, 1, 1, 699.99, 0.00, 699.99, 'Ninguna'),
(2, 2, 1, 1299.50, 0.00, 1299.50, 'Empaque de regalo'),
(3, 3, 1, 850.00, 0.00, 850.00, 'Frágil'),
(4, 4, 1, 35.50, 0.00, 35.50, 'Talla M'),
(5, 5, 2, 8.99, 0.00, 17.98, 'Promoción 2x1'),
(6, 6, 1, 45.00, 0.00, 45.00, 'Color azul'),
(7, 7, 1, 320.00, 0.00, 320.00, 'Revisado por técnico'),
(8, 8, 1, 499.99, 0.00, 499.99, 'Incluye juego digital'),
(9, 9, 1, 29.99, 0.00, 29.99, 'Piel sensible'),
(10, 10, 1, 75.00, 0.00, 75.00, 'Prueba de encendido exitosa');