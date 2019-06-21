

-- count two degree connections --
SELECT count(*) as two_degree_connections
FROM page p1
INNER JOIN reference r1
ON p1.uid = r1.from_node
INNER JOIN page p2
ON p2.uid = r1.to_node;


-- count three degree connections --
SELECT count(*) as three_degree_connections
FROM page p1
INNER JOIN reference r1
ON p1.uid = r1.from_node
INNER JOIN page p2
ON p2.uid = r1.to_node
INNER JOIN reference r2
ON p2.uid = r2.from_node
INNER JOIN page p3
ON r2.to_node = p3.uid;


-- count forth degree connections --
SELECT count(*) as forth_degree_connections
FROM page p1
INNER JOIN reference r1
ON p1.uid = r1.from_node
INNER JOIN page p2
ON p2.uid = r1.to_node
INNER JOIN reference r2
ON p2.uid = r2.from_node
INNER JOIN page p3
ON r2.to_node = p3.uid
INNER JOIN reference r3
ON p3.uid = r3.from_node
INNER JOIN page p4
ON r3.to_node = p4.uid;


-- forth degree connections --
SELECT p1.title, p2.title, p3.title, p4.title
FROM page p1
INNER JOIN reference r1
ON p1.uid = r1.from_node
INNER JOIN page p2
ON p2.uid = r1.to_node
INNER JOIN reference r2
ON p2.uid = r2.from_node
INNER JOIN page p3
ON r2.to_node = p3.uid
INNER JOIN reference r3
ON p3.uid = r3.from_node
INNER JOIN page p4
ON r3.to_node = p4.uid;


-- fifth degree connections --
SELECT p1.title, p2.title, p3.title, p4.title, p5.title
FROM page p1
INNER JOIN reference r1
ON p1.uid = r1.from_node
INNER JOIN page p2
ON p2.uid = r1.to_node
INNER JOIN reference r2
ON p2.uid = r2.from_node
INNER JOIN page p3
ON r2.to_node = p3.uid
INNER JOIN reference r3
ON p3.uid = r3.from_node
INNER JOIN page p4
ON r3.to_node = p4.uid
INNER JOIN reference r4
ON p4.uid = r4.from_node
INNER JOIN page p5
ON r4.to_node = p5.uid;