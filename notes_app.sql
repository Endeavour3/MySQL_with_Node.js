create database notes_app;
use notes_app;

create table notes (
id integer primary key auto_increment,
title varchar(255) NOT NULL,
contents text not null, 
created timestamp not null default NOW()
);

INSERT into notes (title, contents)
values 
("first note", "my first note"),
("secone note", "my second note");