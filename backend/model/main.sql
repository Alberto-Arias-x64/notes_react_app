CREATE database test;
CREATE database production;
use test;
CREATE Table comentatios(id INT UNIQUE AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL,
    note TEXT NOT NULL,
    date_note TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);
DESCRIBE comentatios;
RENAME TABLE comentatios TO comments