
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;

CREATE TABLE IF NOT EXISTS CATEGORIA
(
  CAT         INT          NOT NULL,
  DESCRIPCION VARCHAR(100) NOT NULL,
  ACTIVO      BOOLEAN      NOT NULL DEFAULT TRUE,
  PRIMARY KEY (CAT)
);



CREATE TABLE IF NOT EXISTS PRODUCTO
(
  PK_PRO       INT           NOT NULL     AUTO_INCREMENT,
  FK_CAT       INT           NOT NULL,
  NOM          VARCHAR(100)  NOT NULL,
  PREC         DECIMAL(12,2) NOT NULL,
  DESCRIPCION  VARCHAR(500)  NULL    ,
  STOCK        INT           NOT NULL DEFAULT 0,
  PESO_KG      DOUBLE        NULL    ,
  CALIFICACION FLOAT         NULL    ,
  ACTIVO       BOOLEAN       NOT NULL DEFAULT TRUE,
  FOTO_URL     VARCHAR(500)  NULL    ,
  PRIMARY KEY (PK_PRO),
  CONSTRAINT FK_CATEGORIA_TO_PRODUCTO
    FOREIGN KEY (FK_CAT)
    REFERENCES CATEGORIA (CAT)
);

CREATE TABLE IF NOT EXISTS USUARIO
(
  PK_COD_USU       INT          NOT NULL     AUTO_INCREMENT,
  NOM              VARCHAR(100) NOT NULL,
  APE              VARCHAR(100) NOT NULL,
  CORREO           VARCHAR(150) NOT NULL,
  FECHA_NACIMIENTO DATE         NULL    ,
  ACTIVO           BOOLEAN      NOT NULL DEFAULT TRUE,
  FECHA_REGISTRO   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (PK_COD_USU),
  CONSTRAINT UQ_USUARIO_CORREO UNIQUE (CORREO)
);

CREATE TABLE IF NOT EXISTS VENTA
(
  PK_ID_VENTA    INT           NOT NULL     AUTO_INCREMENT,
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
  ID_VENTA    INT           NOT NULL,
  ID_PRO      INT           NOT NULL,
  CANTIDAD    INT           NOT NULL,
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

SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;

INSERT INTO CATEGORIA (CAT, DESCRIPCION, ACTIVO) VALUES
(1, 'Tecnología', TRUE),
(2, 'Electrodomésticos', TRUE),
(3, 'Accesorios', TRUE),
(4, 'Muebles', TRUE),
(5, 'Oficina', TRUE),
(6, 'Audio y video', TRUE),
(7, 'Deportes', TRUE),
(8, 'Ropa', TRUE);

INSERT INTO USUARIO
(NOM, APE, CORREO, FECHA_NACIMIENTO, ACTIVO)
VALUES
('Juan', 'Perez', 'juan@gmail.com', '1995-05-10', TRUE),
('Maria', 'Lopez', 'maria@gmail.com', '1998-08-15', TRUE),
('Carlos', 'Ramirez', 'carlos@gmail.com', '1990-02-20', TRUE),
('Ana', 'Torres', 'ana@gmail.com', '1997-11-25', TRUE),
('Pedro', 'Gonzales', 'pedro@gmail.com', '1992-04-12', TRUE),
('Lucia', 'Fernandez', 'lucia@gmail.com', '1999-06-18', TRUE),
('Diego', 'Castillo', 'diego@gmail.com', '1994-09-22', TRUE),
('Sofia', 'Mendoza', 'sofia@gmail.com', '1996-12-30', TRUE),
('Roberto', 'Diaz', 'roberto@gmail.com', '1988-03-14', TRUE),
('Elena', 'Vargas', 'elena@gmail.com', '1993-07-19', TRUE);

INSERT INTO PRODUCTO
(FK_CAT, NOM, PREC, DESCRIPCION, STOCK, PESO_KG,
 CALIFICACION, ACTIVO, FOTO_URL)
VALUES
(1, 'Laptop HP', 2500.00, 'Laptop HP Core i5 16GB RAM', 20, 2.10, 4.8, TRUE, NULL),
(1, 'Laptop Lenovo', 2800.00, 'Laptop Lenovo Core i7', 15, 2.00, 4.7, TRUE, NULL),
(1, 'Mouse Logitech', 75.00, 'Mouse inalámbrico USB', 50, 0.15, 4.5, TRUE, NULL),
(1, 'Teclado Gamer', 150.00, 'Teclado mecánico RGB', 30, 0.80, 4.6, TRUE, NULL),
(2, 'Licuadora Oster', 250.00, 'Licuadora de 3 velocidades', 18, 2.50, 4.4, TRUE, NULL),
(2, 'Microondas Samsung', 450.00, 'Microondas de 20 litros', 12, 12.00, 4.5, TRUE, NULL),
(3, 'Audífonos Bluetooth', 120.00, 'Audífonos inalámbricos', 40, 0.20, 4.7, TRUE, NULL),
(3, 'Cargador USB', 35.00, 'Cargador rápido de celular', 60, 0.10, 4.2, TRUE, NULL),
(4, 'Silla Ergonómica', 380.00, 'Silla para oficina', 10, 8.50, 4.6, TRUE, NULL),
(5, 'Escritorio', 550.00, 'Escritorio de madera', 8, 15.00, 4.3, TRUE, NULL),
(6, 'Parlante JBL', 320.00, 'Parlante Bluetooth portátil', 25, 1.20, 4.8, TRUE, NULL),
(7, 'Balón de fútbol', 85.00, 'Balón profesional', 35, 0.45, 4.5, TRUE, NULL),
(8, 'Casaca deportiva', 180.00, 'Casaca deportiva unisex', 20, 0.60, 4.4, TRUE, NULL);


INSERT INTO VENTA
(FK_COD_CLIENTE, FK_COD_CAJERO, FECHA, TOTAL,
 HORA, SUBTOTAL, DESCUENTO, IMPUESTO, ESTADO, OBSERVACION)
VALUES
(1, 3, '2026-10-01', 2500.00, '09:30:00', 2500.00, 0, 0, 'REGISTRADA', 'Venta de laptop'),
(2, 3, '2026-10-02', 325.00, '10:15:00', 325.00, 0, 0, 'REGISTRADA', 'Compra de accesorios'),
(3, 4, '2026-10-03', 700.00, '11:20:00', 700.00, 0, 0, 'REGISTRADA', 'Compra de electrodomésticos'),
(4, 5, '2026-10-04', 450.00, '12:30:00', 450.00, 0, 0, 'REGISTRADA', 'Compra de microondas'),
(5, 3, '2026-10-05', 760.00, '13:45:00', 760.00, 0, 0, 'REGISTRADA', 'Compra de muebles'),
(6, 4, '2026-10-06', 195.00, '14:10:00', 195.00, 0, 0, 'REGISTRADA', 'Compra de accesorios'),
(7, 5, '2026-10-07', 320.00, '15:20:00', 320.00, 0, 0, 'REGISTRADA', 'Compra de parlante'),
(8, 3, '2026-10-08', 2800.00, '16:30:00', 2800.00, 0, 0, 'REGISTRADA', 'Compra de laptop'),
(9, 4, '2026-10-09', 255.00, '17:15:00', 255.00, 0, 0, 'REGISTRADA', 'Compra de accesorios'),
(10, 5, '2026-10-10', 265.00, '18:00:00', 265.00, 0, 0, 'REGISTRADA', 'Compra de productos');

INSERT INTO DETALLE_VENTA
(ID_VENTA, ID_PRO, CANTIDAD, PRECIO, DESCUENTO, IMPORTE, OBSERVACION)
VALUES
(1, 1, 1, 2500.00, 0, 2500.00, 'Laptop HP'),
(2, 3, 1, 75.00, 0, 75.00, 'Mouse Logitech'),
(2, 4, 1, 150.00, 0, 150.00, 'Teclado Gamer'),
(2, 8, 1, 35.00, 0, 35.00, 'Cargador USB'),
(2, 7, 1, 120.00, 55.00, 65.00, 'Audífonos con descuento'),
(3, 5, 1, 250.00, 0, 250.00, 'Licuadora'),
(3, 6, 1, 450.00, 0, 450.00, 'Microondas'),
(4, 6, 1, 450.00, 0, 450.00, 'Microondas Samsung'),
(5, 9, 1, 380.00, 0, 380.00, 'Silla ergonómica'),
(5, 10, 1, 550.00, 170.00, 380.00, 'Escritorio con descuento'),
(6, 3, 1, 75.00, 0, 75.00, 'Mouse'),
(6, 8, 1, 35.00, 0, 35.00, 'Cargador'),
(6, 7, 1, 120.00, 35.00, 85.00, 'Audífonos'),
(7, 11, 1, 320.00, 0, 320.00, 'Parlante JBL'),
(8, 2, 1, 2800.00, 0, 2800.00, 'Laptop Lenovo'),
(9, 12, 3, 85.00, 0, 255.00, 'Balones de fútbol'),
(10, 13, 1, 180.00, 0, 180.00, 'Casaca deportiva'),
(10, 8, 1, 35.00, 0, 35.00, 'Cargador'),
(10, 3, 1, 75.00, 25.00, 50.00, 'Mouse con descuento');



