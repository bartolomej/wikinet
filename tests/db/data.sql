USE wiki_test;


-- first degree --

INSERT INTO page (uid, type, title, href, scraped, description)
VALUES ('1', 'page', 'First page', '', 1, 'First degree');

INSERT INTO page (uid, type, title, href, scraped, description)
VALUES ('2', 'page', 'Second page', '', 1, 'First degree');

INSERT INTO page (uid, type, title, href, scraped, description)
VALUES ('3', 'page', 'Third page', '', 1, 'First degree');

INSERT INTO page (uid, type, title, href, scraped, description)
VALUES ('4', 'page', 'Forth page', '', 1, 'First degree');

INSERT INTO page (uid, type, title, href, scraped, description)
VALUES ('5', 'page', 'Fifth page', '', 1, 'First degree');

INSERT INTO page (uid, type, title, href, scraped, description)
VALUES ('6', 'page', 'Sixth page', '', 1, 'First degree');

INSERT INTO page (uid, type, title, href, scraped, description)
VALUES ('7', 'page', 'Seventh page', '', 1, 'First degree');

INSERT INTO page (uid, type, title, href, scraped, description)
VALUES ('8', 'page', 'Eight page', '', 1, 'First degree');

INSERT INTO page (uid, type, title, href, scraped, description)
VALUES ('9', 'page', 'Ninth page', '', 1, 'First degree');


-- second degree --

INSERT INTO page (uid, type, title, href, scraped, description)
VALUES ('11', 'page', 'First page', '', 1, 'Second degree');

INSERT INTO page (uid, type, title, href, scraped, description)
VALUES ('12', 'page', 'Second page', '', 1, 'Second degree');

INSERT INTO page (uid, type, title, href, scraped, description)
VALUES ('13', 'page', 'Third page', '', 1, 'Second degree');

INSERT INTO page (uid, type, title, href, scraped, description)
VALUES ('14', 'page', 'Forth page', '', 1, 'Second degree');


-- third degree --

INSERT INTO page (uid, type, title, href, scraped, description)
VALUES ('21', 'page', 'First page', '', 1, 'Third degree');

INSERT INTO page (uid, type, title, href, scraped, description)
VALUES ('22', 'page', 'Second page', '', 1, 'Third degree');

INSERT INTO page (uid, type, title, href, scraped, description)
VALUES ('23', 'page', 'Third page', '', 1, 'Third degree');

INSERT INTO page (uid, type, title, href, scraped, description)
VALUES ('24', 'page', 'Forth page', '', 1, 'Third degree');


-- edges --

INSERT INTO reference (from_node, to_node) VALUES ('1', '2');

INSERT INTO reference (from_node, to_node) VALUES ('1', '3');

INSERT INTO reference (from_node, to_node) VALUES ('1', '4');

INSERT INTO reference (from_node, to_node) VALUES ('1', '5');