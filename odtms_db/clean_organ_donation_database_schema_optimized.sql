CREATE TABLE hospital (
    ID INT(11) NOT NULL AUTO_INCREMENT,
    hospital_name VARCHAR(100) NOT NULL UNIQUE,
    hospital_code VARCHAR(50) NOT NULL UNIQUE,
    PRIMARY KEY (ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE organ (
    organ_id INT(11) NOT NULL AUTO_INCREMENT,
    organ_name VARCHAR(50) DEFAULT NULL,
    organ_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    amount INT(11) NOT NULL,
    statuss VARCHAR(50) DEFAULT 'Pending',
    PRIMARY KEY (organ_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE users (
    user_id INT(11) NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50) DEFAULT NULL,
    last_name VARCHAR(50) DEFAULT NULL,
    age INT(11) DEFAULT NULL,
    role VARCHAR(100) DEFAULT NULL,
    location VARCHAR(100) DEFAULT NULL,
    password VARCHAR(255) DEFAULT NULL,
    phone_number VARCHAR(20) NOT NULL,
    gender VARCHAR(30) DEFAULT NULL,
    email VARCHAR(100) DEFAULT NULL,
    blood_type VARCHAR(50) DEFAULT NULL,
    fayda_no BIGINT(20) DEFAULT NULL,
    profile_image VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (phone_number),
    UNIQUE KEY (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE admin (
    admin_id INT(11) NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    age INT(10) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    location VARCHAR(50) NOT NULL,
    blood_type VARCHAR(10) NOT NULL,
    role VARCHAR(30) NOT NULL,
    profile_image VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ID INT(11) NOT NULL,
    PRIMARY KEY (phone_number),
    UNIQUE KEY (admin_id),
    CONSTRAINT fk_hospital_id
        FOREIGN KEY (ID)
        REFERENCES hospital(ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE donations (
    donation_id INT(11) NOT NULL AUTO_INCREMENT,
    phone_numbers VARCHAR(50) DEFAULT NULL,
    organ_id INT(11) DEFAULT NULL,
    donation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'Pending',
    PRIMARY KEY (donation_id),
    CONSTRAINT donations_ibfk_1
        FOREIGN KEY (phone_numbers)
        REFERENCES users(phone_number)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT donations_ibfk_2
        FOREIGN KEY (organ_id)
        REFERENCES organ(organ_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE recipents (
    wait_id INT(11) NOT NULL AUTO_INCREMENT,
    phone_number VARCHAR(20) DEFAULT NULL,
    organ_id INT(11) DEFAULT NULL,
    reg_date DATE NOT NULL DEFAULT (CURRENT_DATE),
    status VARCHAR(50) DEFAULT 'Pending',
    urgency_level VARCHAR(10) NOT NULL DEFAULT 'Low',
    PRIMARY KEY (wait_id),
    CONSTRAINT fk_waitinglist_userphone
        FOREIGN KEY (phone_number)
        REFERENCES users(phone_number)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_waitinglist_organ
        FOREIGN KEY (organ_id)
        REFERENCES organ(organ_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE waiting_lists (
    id INT(11) NOT NULL AUTO_INCREMENT,
    rec_phone_number VARCHAR(20) NOT NULL,
    don_phone_number VARCHAR(20) NOT NULL,
    organ_id INT(11) NOT NULL,
    date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL DEFAULT 'Pending',
    PRIMARY KEY (id),
    CONSTRAINT fk_rec_phone_num
        FOREIGN KEY (rec_phone_number)
        REFERENCES users(phone_number)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_don_phone_num
        FOREIGN KEY (don_phone_number)
        REFERENCES users(phone_number)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_organ_id
        FOREIGN KEY (organ_id)
        REFERENCES organ(organ_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
