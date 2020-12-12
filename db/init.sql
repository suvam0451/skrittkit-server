create table if not exists items (
    id int primary key,
    name varchar(100) not null,
    description varchar(1000),
    type varchar(24)
);
-- unique: entry has to be unique
-- not null: canno9t be null

drop table items;

-- add extra column
alter table items add gpa decimal
-- drop extra column
alter table items drop column gpa;

insert into items values(1, "Chat", "Holler", "Actor");
insert into items values(2, "Chat", "Holler", "Actor");

-- Opting out of inserting certain fields
insert into items(id, name) values(3, "Claire");