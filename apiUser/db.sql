Create table user(
id INT auto_increment not null,
firstname  varchar(20) not null,
lastname varchar(20) not null,
email varchar(50) not null,
PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS `ci_sessions` (
        `id` varchar(40) NOT NULL,
        `ip_address` varchar(45) NOT NULL,
        `timestamp` int(10) unsigned DEFAULT 0 NOT NULL,
        `data` blob NOT NULL,
        PRIMARY KEY (id),
        KEY `ci_sessions_timestamp` (`timestamp`)
);