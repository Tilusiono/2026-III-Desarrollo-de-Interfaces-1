SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;

-- ==========================================
-- 1. CREACIÓN DE TABLAS
-- ==========================================

CREATE TABLE IF NOT EXISTS CATEGORIA
(
  CAT         INT          NOT NULL,
  DESCRIPCION VARCHAR(100) NOT NULL,                                                                                     
  ACTIVO      BOOLEAN      NOT NULL DEFAULT TRUE,                                                            
  PRIMARY KEY (CAT)
);

CREATE TABLE IF NOT EXISTS USUARIO
(
  PK_COD_USU       INT          NOT NULL AUTO_INCREMENT,
  NOM              VARCHAR(100) NOT NULL,
  APE              VARCHAR(100) NOT NULL,
  CORREO           VARCHAR(150) NOT NULL,
  FECHA_NACIMIENTO DATE         NULL    ,
  ACTIVO           BOOLEAN      NOT NULL DEFAULT TRUE,
  FECHA_REGISTRO   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (PK_COD_USU),
  CONSTRAINT UQ_USUARIO_CORREO UNIQUE (CORREO)
);

CREATE TABLE IF NOT EXISTS PRODUCTO
(
  PK_PRO       INT          NOT NULL AUTO_INCREMENT,
  FK_CAT       INT          NOT NULL,
  NOM          VARCHAR(100) NOT NULL,
  PREC         DECIMAL(12,2) NOT NULL,
  DESCRIPCION  VARCHAR(500) NULL    ,
  STOCK        INT          NOT NULL DEFAULT 0,
  PESO_KG      DOUBLE       NULL    ,
  CALIFICACION FLOAT        NULL    ,
  ACTIVO       BOOLEAN      NOT NULL DEFAULT TRUE,
  FOTO_URL     VARCHAR(500) NULL    ,
  PRIMARY KEY (PK_PRO),
  CONSTRAINT FK_CATEGORIA_TO_PRODUCTO
    FOREIGN KEY (FK_CAT)
    REFERENCES CATEGORIA (CAT)
);

CREATE TABLE IF NOT EXISTS VENTA
(
  PK_ID_VENTA    INT          NOT NULL AUTO_INCREMENT,
  FK_COD_CLIENTE INT          NOT NULL,
  FK_COD_CAJERO  INT          NOT NULL,
  FECHA          DATE         NOT NULL,
  TOTAL          DECIMAL(12,2) NOT NULL DEFAULT 0,
  HORA           TIME         NOT NULL,
  SUBTOTAL       DECIMAL(12,2) NOT NULL DEFAULT 0,
  DESCUENTO      DECIMAL(12,2) NOT NULL DEFAULT 0,
  IMPUESTO       DECIMAL(12,2) NOT NULL DEFAULT 0,
  ESTADO         VARCHAR(20)  NOT NULL DEFAULT 'REGISTRADA',
  OBSERVACION    VARCHAR(500) NULL    ,
  PRIMARY KEY (PK_ID_VENTA),
  INDEX IDX_VENTA_FECHA (FECHA ASC),
  CONSTRAINT FK_USUARIO_TO_VENTA
    FOREIGN KEY (FK_COD_CLIENTE)
    REFERENCES USUARIO (PK_COD_USU)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT FK_USUARIO_TO_VENTA1
    FOREIGN KEY (FK_COD_CAJERO)
    REFERENCES USUARIO (PK_COD_USU)
);

CREATE TABLE IF NOT EXISTS DETALLE_VENTA
(
  ID_VENTA    INT          NOT NULL,
  ID_PRO      INT          NOT NULL,
  CANTIDAD    INT          NOT NULL,
  PRECIO      DECIMAL(12,2) NOT NULL,
  DESCUENTO   DECIMAL(12,2) NOT NULL DEFAULT 0,
  IMPORTE     DECIMAL(12,2) NULL    ,
  OBSERVACION VARCHAR(500)  NULL    ,
  PRIMARY KEY (ID_VENTA, ID_PRO),
  CONSTRAINT FK_VENTA_TO_DETALLE_VENTA
    FOREIGN KEY (ID_VENTA)
    REFERENCES VENTA (PK_ID_VENTA)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT FK_PRODUCTO_TO_DETALLE_VENTA
    FOREIGN KEY (ID_PRO)
    REFERENCES PRODUCTO (PK_PRO)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT
);


-- ==========================================
-- 2. INSERCIÓN DE DATOS (10 REGISTROS POR TABLA)
-- ==========================================

-- CATEGORIA (10 registros)
INSERT INTO CATEGORIA (CAT, DESCRIPCION, ACTIVO) VALUES
(1, 'Electrónica y Tecnología', TRUE),
(2, 'Línea Blanca y Hogar', TRUE),
(3, 'Ropa y Accesorios', TRUE),
(4, 'Alimentos y Bebidas', TRUE),
(5, 'Deportes y Aire Libre', TRUE),
(6, 'Juguetes y Entretenimiento', TRUE),
(7, 'Salud y Cuidado Personal', TRUE),
(8, 'Libros y Papelería', TRUE),
(9, 'Ferretería y Construcción', TRUE),
(10, 'Muebles y Decoración', TRUE);

-- USUARIO (10 registros)
INSERT INTO USUARIO (PK_COD_USU, NOM, APE, CORREO, FECHA_NACIMIENTO, ACTIVO, FECHA_REGISTRO) VALUES
(1, 'Juan', 'Pérez', 'juan.perez@email.com', '1990-05-12', TRUE, '2026-01-10 08:30:00'),
(2, 'María', 'Gómez', 'maria.gomez@email.com', '1985-11-23', TRUE, '2026-01-12 09:15:00'),
(3, 'Carlos', 'Ruiz', 'carlos.ruiz@email.com', '1995-03-04', TRUE, '2026-02-01 10:00:00'),
(4, 'Ana', 'Torres', 'ana.torres@email.com', '1992-08-19', TRUE, '2026-02-15 14:20:00'),
(5, 'Luis', 'Ramírez', 'luis.ramirez@email.com', '1988-12-01', TRUE, '2026-03-01 16:45:00'),
(6, 'Sofía', 'Castro', 'sofia.castro@email.com', '1994-07-22', TRUE, '2026-03-05 11:10:00'),
(7, 'Jorge', 'Morales', 'jorge.morales@email.com', '1983-04-15', TRUE, '2026-03-10 09:00:00'),
(8, 'Lucía', 'Fernández', 'lucia.fernandez@email.com', '1998-09-30', TRUE, '2026-03-12 13:25:00'),
(9, 'David', 'Jiménez', 'david.jimenez@email.com', '1991-01-18', TRUE, '2026-03-15 17:05:00'),
(10, 'Elena', 'Vargas', 'elena.vargas@email.com', '1987-06-25', TRUE, '2026-03-18 10:40:00');

-- PRODUCTO (10 registros)
INSERT INTO PRODUCTO (PK_PRO, FK_CAT, NOM, PREC, DESCRIPCION, STOCK, PESO_KG, CALIFICACION, ACTIVO, FOTO_URL) VALUES
(1, 1, 'Laptop Gamer 15.6"', 1200.00, 'Laptop con procesador de alta gama y 16GB RAM', 15, 2.3, 4.8, TRUE, 'https://example.com/img/laptop.jpg'),
(2, 1, 'Mouse Inalámbrico RGB', 25.50, 'Mouse ergonómico con luces LED y batería recargable', 50, 0.2, 4.5, TRUE, 'https://example.com/img/mouse.jpg'),
(3, 2, 'Licuadora de 3 Velocidades', 85.00, 'Vaso de vidrio templado y cuchillas de acero inoxidable', 20, 3.5, 4.2, TRUE, 'https://example.com/img/licuadora.jpg'),
(4, 2, 'Cafetera Eléctrica', 45.99, 'Capacidad para 12 tazas con filtro permanente', 30, 1.8, 4.3, TRUE, 'https://example.com/img/cafetera.jpg'),
(5, 3, 'Camisa Casual de Algodón', 30.00, 'Camisa manga larga color azul marino', 40, 0.4, 4.0, TRUE, 'https://example.com/img/camisa.jpg'),
(6, 4, 'Café Molido Premium 500g', 12.50, 'Café de altura 100% arabica tostado medio', 60, 0.5, 4.7, TRUE, 'https://example.com/img/cafe.jpg'),
(7, 5, 'Balón de Fútbol Profesional', 35.00, 'Cosido a mano, alta retención de aire', 25, 0.45, 4.6, TRUE, 'https://example.com/img/balon.jpg'),
(8, 6, 'Juego de Mesa Estrategia', 50.00, 'Juego de tablero para 2 a 4 jugadores', 18, 1.2, 4.9, TRUE, 'https://example.com/img/juego.jpg'),
(9, 7, 'Set de Cuidado Facial Orgánico', 40.00, 'Incluye limpiador, tónico y crema hidratante', 35, 0.6, 4.4, TRUE, 'https://example.com/img/skincare.jpg'),
(10, 10, 'Lámpara de Escritorio LED', 22.00, 'Luz regulable con puerto de carga USB', 45, 0.9, 4.1, TRUE, 'https://example.com/img/lampara.jpg');

-- VENTA (10 registros)
INSERT INTO VENTA (PK_ID_VENTA, FK_COD_CLIENTE, FK_COD_CAJERO, FECHA, TOTAL, HORA, SUBTOTAL, DESCUENTO, IMPUESTO, ESTADO, OBSERVACION) VALUES
(1, 1, 3, '2026-03-02', 1225.50, '11:30:00', 1038.56, 10.00, 196.94, 'REGISTRADA', 'Venta al contado'),
(2, 2, 3, '2026-03-02', 110.99, '12:05:00', 94.06, 0.00, 16.93, 'REGISTRADA', NULL),
(3, 3, 4, '2026-03-03', 30.00, '15:10:00', 25.42, 0.00, 4.58, 'COMPLETADA', 'Cliente frecuente'),
(4, 4, 4, '2026-03-04', 85.00, '10:25:00', 72.03, 5.00, 17.97, 'REGISTRADA', NULL),
(5, 5, 3, '2026-03-04', 1245.50, '17