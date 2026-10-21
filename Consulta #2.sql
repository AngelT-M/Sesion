CREATE DATABASE if NOT EXISTS  tableroKanvan;
USE tableroKanvan;


CREATE TABLE categorias(
	categoria_id TINYINT AUTO_INCREMENT PRIMARY KEY,
	nom_categoria VARCHAR(50)
);


CREATE TABLE tareas(
	tarea_id INT AUTO_INCREMENT PRIMARY KEY,
	titulo VARCHAR(25) NOT NULL,
	descripcion VARCHAR(100),
	categoria_id TINYINT NOT NULL,
	prioridad ENUM("Baja","Media","Alta") NOT NULL DEFAULT "Alta"
);

CREATE TABLE estados_tarea(
	estado_tarea_id TINYINT AUTO_INCREMENT PRIMARY KEY,
	nom_estado ENUM("Pendiente","En proceso","Completada") NOT NULL DEFAULT "Pendiente"
);

CREATE TABLE tablero_kanvan(
	tablero_kanvan_id INT AUTO_INCREMENT PRIMARY KEY,
	estado_tarea_id TINYINT NOT NULL,
	tarea_id INT NOT NULL
);



ALTER TABLE tareas
	ADD CONSTRAINT fk_categoria FOREIGN KEY (categoria_id)
	REFERENCES categorias(categoria_id)
	ON DELETE CASCADE 
	ON UPDATE CASCADE;
	
ALTER TABLE tablero_kanvan 
	ADD CONSTRAINT fk_tarea FOREIGN KEY (tarea_id)
	REFERENCES tareas(tarea_id)
	ON UPDATE CASCADE 
	ON DELETE CASCADE,
	ADD CONSTRAINT fk_estado_tarea FOREIGN KEY(estado_tarea_id)
	REFERENCES estados_tarea(estado_tarea_id)
	ON UPDATE CASCADE 
	ON DELETE CASCADE;


ALTER TABLE tareas
	ADD estado ENUM('COMPLETA', 'EN_PROCESO', 'PENDIENTE') NOT NULL DEFAULT 'PENDIENTE';
	
ALTER TABLE tareas
	ADD usuario VARCHAR(50);
	
	
INSERT tareas()
	VALUES(1,"tarea1","tareatarea",1,"Alta","COMPLETA","Luis");
	
	
	
INSERT tareas()
	VALUES(2,"tarea2","tareatarea2",2,"Media","PEDI","Angel");
	
	
UPDATE tareas
	SET estado = "PENDIENTE"	
	WHERE tarea_id = 2;