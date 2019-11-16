module.exports.createAll = function () {
  return (`
    CREATE TABLE page (
      href varchar(300) primary key,
      type varchar(20),
      title varchar(100),
      scraped boolean,
      description mediumtext
    );
  
    CREATE TABLE reference (
      id int auto_increment primary key,
      from_node varchar(300),
      to_node varchar(300),
      FOREIGN KEY(from_node) REFERENCES page(href),
      FOREIGN KEY(to_node) REFERENCES page(href)
    );
  `)
};