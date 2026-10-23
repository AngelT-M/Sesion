CREATE DATABASE if NOT EXISTS tablero_kanban;
USE tablero_kanban;

CREATE TABLE categorias(
	categoria_id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	nom_categoria VARCHAR(50) NOT NULL UNIQUE
);


CREATE TABLE usuarios(
	usuario_id INT AUTO_INCREMENT PRIMARY KEY,
	nom_usuario VARCHAR(100) NOT NULL,
	fecha_nac DATE NOT NULL ,
	numero VARCHAR(20) NOT NULL,
	email VARCHAR(50) NOT NULL UNIQUE
);


CREATE TABLE tareas(
	tarea_id INT AUTO_INCREMENT PRIMARY KEY,
	titulo VARCHAR(100) NOT NULL,
	descripcion TEXT NOT NULL,
	categoria_id SMALLINT NOT NULL,
	usuario_id INT NULL,
	prioridad ENUM("BAJA","MEDIA","ALTA") NOT NULL DEFAULT "MEDIA",
	estado ENUM("PENDIENTE","EN_PROCESO","COMPLETADA") NOT NULL DEFAULT "PENDIENTE",
	orden INT NOT NULL DEFAULT 0,
	fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE tareas
	ADD CONSTRAINT fk_tarea_categoria FOREIGN KEY (categoria_id)
	REFERENCES categorias(categoria_id)
	ON UPDATE CASCADE 
	ON DELETE CASCADE,
	ADD CONSTRAINT fk_tarea_usuario FOREIGN KEY(usuario_id)
	REFERENCES usuarios(usuario_id)
	ON UPDATE CASCADE 
	ON DELETE SET NULL;


INSERT INTO categorias (nom_categoria) 
	VALUES 
		("Desarrollo web"),
		("Dase de Datos"),
		("Diseño UI/UX"),
		("Investigacion");
		
		
INSERT INTO usuarios(nom_usuario, fecha_nac, numero, email)
	VALUES
		("Miguel Tomas","2006-02-03", "46154758","tomas4321.3@gmail.com"),
		("Luis Tomas","2002-12-12", "33457812","luist32633@gmail.com"),
		("Mike Martin","1999-03-25", "40261578","mikeM.3@gmail.com"),
		("Maria Gomez","2004-09-20", "46562312","mariaGomez.3@gmail.com");
		
		
INSERT INTO tareas (titulo, descripcion, categoria_id, usuario_id, prioridad, estado, orden)
	VALUES
		("Diseño esqueam SQL","Descricion descripcion",2,1,"ALTA","COMPLETADA", 0),
		("Diseño Adobe","Descricion descripcion ADOBE",1,2,"MEDIA","EN_PROCESO", 0),
		("Diseño esqueam SQL","Descricion descripcion",3,3,"BAJA","PENDIENTE", 0),
		("Diseño esqueam SQL","Descricion descripcion",2,4,"MEDIA","PENDIENTE", 0),
		("Diseño esqueam SQL","Descricion descripcion",1,2,"ALTA","COMPLETADA", 0)



