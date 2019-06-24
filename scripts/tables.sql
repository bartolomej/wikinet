USE wiki;

CREATE TABLE page (
    uid varchar(100) primary key,
    type varchar(20),
    title varchar(100),
    href varchar(200),
    scraped boolean,
    description mediumtext
);

CREATE TABLE reference (
    id int auto_increment primary key,
    from_node varchar(100),
    to_node varchar(100),
    FOREIGN KEY(from_node) REFERENCES page(uid),
    FOREIGN KEY(to_node) REFERENCES page(uid)
);