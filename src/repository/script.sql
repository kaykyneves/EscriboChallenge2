drop DATABASE if exists escribo;
CREATE DATABASE escribo;

USE escribo;

CREATE TABLE users (
id INT PRIMARY KEY AUTO_INCREMENT,
name_user VARCHAR(255) NOT NULL,
email_user VARCHAR(255) NOT NULL UNIQUE,
password_user VARCHAR(255) NOT NULL,
phone INT (9) NOT NULL,
area_code INT (2) NOT NULL
);

CREATE TABLE changes_user(
id INT,
data_criacao DATE,
data_atualizacao DATE,
ultimo_login DATETIME,
FOREIGN KEY (id) REFERENCES users (id)
);

DELIMITER $

CREATE PROCEDURE cadastrar_usuario(
    IN nome_user VARCHAR(255),
    IN user_email VARCHAR(255),
    IN user_password VARCHAR(255),
    IN phone_user INT,
    IN code_area INT,
    OUT method BOOLEAN,
    OUT query_result TEXT 
)
BEGIN
    DECLARE novo_id INT;
    DECLARE email INT;
    SET method = TRUE;
    SELECT EXISTS(SELECT 1 FROM users WHERE email_user = user_email) INTO email;
    IF (email) THEN
        SET method = FALSE;
    ELSE
        INSERT INTO users (name_user, email_user, password_user, phone, area_code)
        VALUES (nome_user, user_email, user_password, phone_user, code_area);

        SET novo_id = LAST_INSERT_ID();

        INSERT INTO changes_user(id, data_criacao, data_atualizacao, ultimo_login)
        VALUES (novo_id, NOW(), NOW(), NOW());

        SET query_result = (
            SELECT JSON_OBJECT(
                'id', id,
                'data_criacao', data_criacao,
                'data_atualizacao', data_atualizacao,
                'ultimo_login', ultimo_login
            ) 
            FROM changes_user 
            WHERE id = novo_id
        );
    END IF;
END$

DELIMITER ;

DELIMITER $
CREATE PROCEDURE validity_user(IN user_email VARCHAR(255), user_password VARCHAR(255),
OUT query_result TEXT, OUT query_password TEXT, OUT method BOOLEAN)

BEGIN
    DECLARE enc INT;
    SET method = TRUE;
	SELECT EXISTS(SELECT id FROM users WHERE email_user = user_email) INTO enc;
    
    IF(enc) THEN
    UPDATE changes_user SET ultimo_login = NOW();
		SET query_result = (
            SELECT JSON_OBJECT(
                'id', id,
                'data_criacao', data_criacao,
                'data_atualizacao', data_atualizacao,
                'ultimo_login', ultimo_login
            ) 
            FROM changes_user 
            WHERE id = enc
        );
        
        SET query_password = (SELECT password_user FROM users WHERE id = enc);
	ELSE
		SET method = FALSE;
	END IF;
END$

DELIMITER ;

