USE wiki_test;


-- initial node --

INSERT INTO page (uid, type, title, href, scraped, description)
VALUES ('1', 'page', 'First page', '', 1, 'Initial node');

-- first degree --

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

-- first and second degree --

INSERT INTO page (uid, type, title, href, scraped, description)
VALUES ('7', 'page', 'Seventh page', '', 1, 'First and second degree');

-- second degree --

INSERT INTO page (uid, type, title, href, scraped, description)
VALUES ('8', 'page', 'Eight page', '', 1, 'Second degree');

INSERT INTO page (uid, type, title, href, scraped, description)
VALUES ('9', 'page', 'Ninth page', '', 1, 'Second degree');

INSERT INTO page (uid, type, title, href, scraped, description)
VALUES ('10', 'page', 'Tenth page', '', 1, 'Second degree');

INSERT INTO page (uid, type, title, href, scraped, description)
VALUES ('11', 'page', 'Eleventh page', '', 1, 'Second degree');

INSERT INTO page (uid, type, title, href, scraped, description)
VALUES ('12', 'page', 'Twelvth page', '', 1, 'Second degree');

INSERT INTO page (uid, type, title, href, scraped, description)
VALUES ('13', 'page', 'Thirdteenth page', '', 1, 'Second degree');

INSERT INTO page (uid, type, title, href, scraped, description)
VALUES ('14', 'page', 'Fourteenth page', '', 1, 'Second degree');

-- third degree --

INSERT INTO page (uid, type, title, href, scraped, description)
VALUES ('15', 'page', 'Fifthteenth page', '', 1, 'Third degree');

INSERT INTO page (uid, type, title, href, scraped, description)
VALUES ('16', 'page', 'Sexteenth page', '', 1, 'Third degree');

INSERT INTO page (uid, type, title, href, scraped, description)
VALUES ('17', 'page', 'Seventeenth page', '', 1, 'Third degree');


-- first degree edges --

INSERT INTO reference (from_node, to_node) VALUES ('1', '2');

INSERT INTO reference (from_node, to_node) VALUES ('1', '3');

INSERT INTO reference (from_node, to_node) VALUES ('1', '4');

INSERT INTO reference (from_node, to_node) VALUES ('1', '5');

INSERT INTO reference (from_node, to_node) VALUES ('1', '6');

INSERT INTO reference (from_node, to_node) VALUES ('1', '7');

-- second degree edges --

INSERT INTO reference (from_node, to_node) VALUES ('3', '8');

INSERT INTO reference (from_node, to_node) VALUES ('3', '9');

INSERT INTO reference (from_node, to_node) VALUES ('3', '10');

INSERT INTO reference (from_node, to_node) VALUES ('4', '10');

INSERT INTO reference (from_node, to_node) VALUES ('4', '14');

INSERT INTO reference (from_node, to_node) VALUES ('6', '15');

INSERT INTO reference (from_node, to_node) VALUES ('5', '7');

INSERT INTO reference (from_node, to_node) VALUES ('5', '11');

INSERT INTO reference (from_node, to_node) VALUES ('7', '12');

INSERT INTO reference (from_node, to_node) VALUES ('7', '13');

-- third degree edges --

INSERT INTO reference (from_node, to_node) VALUES ('15', '17');

INSERT INTO reference (from_node, to_node) VALUES ('15', '16');

INSERT INTO reference (from_node, to_node) VALUES ('13', '14');