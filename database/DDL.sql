drop database if exists degustame;
create database degustame;
use degustame;

drop user if exists degustame_user;
CREATE USER degustame_user IDENTIFIED WITH mysql_native_password BY "d3gust4m3123$";
grant all privileges on degustame.* to degustame_user;


drop table if exists usuario;
create table usuario (
                         nombre_usuario  varchar(100)  not null primary key,
                         correo varchar(100) not null,
                         contrasena varchar(500) not null,
                         edad int(3) not null,
                         peso int(3) not null,
                         dieta varchar(100) not null,
                         genero varchar(100) not null,
                         padecimientos varchar(100) not null,
                         altura int(4) not null
)ENGINE=InnoDB;


drop table if exists receta;
create table receta (
                        receta_id int(8) not null primary key,
                        nombre varchar(100) not null,
                        descripcion text not null,
                        tiempo int(3) not null,
                        tipo varchar(100) not null
)ENGINE=InnoDB;

drop table if exists usuario_receta;
create table usuario_receta (
                                nombre_usuario varchar(100) not null,
                                receta_id int(8) not null,
                                constraint pk_usuario_receta primary key (nombre_usuario, receta_id),
                                constraint fk_usuario_receta_usuario foreign key (nombre_usuario) references usuario(nombre_usuario) on delete cascade,
                                constraint fk_usuario_receta_receta foreign key (receta_id) references receta(receta_id) on delete cascade
)ENGINE=InnoDB;

drop table if exists ingrediente;
create table ingrediente (
                             ingrediente_id int(8) not null primary key,
                             nombre varchar(100) not null,
                             medida varchar(100) not null,
                             tipo varchar(100) not null,
                             proteinas double not null,
                             grasas double not null,
                             calorias double not null
)ENGINE=InnoDB;

drop table if exists receta_ingrediente;
create table receta_ingrediente (
                                    receta_id int(8) not null,
                                    ingrediente_id int(8) not null,
                                    cantidad int(3) not null,
                                    constraint pk_receta_ingrediente primary key (receta_id, ingrediente_id),
                                    constraint fk_receta_ingrediente_receta foreign key (receta_id) references receta(receta_id) on delete cascade,
                                    constraint fk_receta_ingrediente_ingrediente foreign key (ingrediente_id) references ingrediente(ingrediente_id) on delete cascade
)ENGINE=InnoDB;

drop table if exists usuario_ingrediente;
create table usuario_ingrediente (
                                     nombre_usuario  varchar(100) not null,
                                     ingrediente_id int(8) not null,
                                     constraint pk_usuario_ingrediente primary key (nombre_usuario, ingrediente_id),
                                     constraint fk_usuario_ingrediente_usuario foreign key (nombre_usuario) references usuario(nombre_usuario) on delete cascade,
                                     constraint fk_usuario_ingrediente_ingrediente foreign key (ingrediente_id) references ingrediente(ingrediente_id) on delete cascade
)ENGINE=InnoDB;

