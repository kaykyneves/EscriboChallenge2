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

#criando a PROCEDURE para cadastrar o usuário
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
    
    #setando a variável 'method' como TRUE
    SET method = TRUE;
    
    #verificando já existe um email cadastrado, passando o valor da variável 'user_email';
    SELECT EXISTS(SELECT 1 FROM users WHERE email_user = user_email) INTO email;
    
    #se existir, então a variável 'email' é verdadeira, e eu seto o 'method' como FALSE;
    IF (email) THEN
        SET method = FALSE;
	
    #se não existir, então eu cadastro o usúario
    ELSE
        INSERT INTO users (name_user, email_user, password_user, phone, area_code)
        VALUES (nome_user, user_email, user_password, phone_user, code_area);
	
		#pego o id dele usando o LAST_INSERT_ID()
        SET novo_id = LAST_INSERT_ID();
		
        #faço um INSERT na tabela 'changes_user', passando os valores pedidos
        INSERT INTO changes_user(id, data_criacao, data_atualizacao, ultimo_login)
        VALUES (novo_id, NOW(), NOW(), NOW());
	
	    # e crio o valor do query_result, fazendo um SELECT na tabela 'changes_user' e pegando como JSON
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

#criando a procedure para validar o usuário
CREATE PROCEDURE validity_user(IN user_email VARCHAR(255),
OUT query_result TEXT, OUT query_password TEXT, OUT method BOOLEAN)

BEGIN
    DECLARE enc INT;
    SET method = TRUE;
    
    #verificco se o email existe na base de dados
	SELECT EXISTS(SELECT id FROM users WHERE email_user = user_email) INTO enc;
    
    #se o email existir, eu entro no IF
    IF(enc) THEN
    
    #atualizo a tabela changes_user para setar que o ultimo_login dele é na hora que ele loga
    UPDATE changes_user SET ultimo_login = NOW();
    
		#pego os valores da tabela 'changes_user', passando o id do usúario desejado
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
        #obtendo o valor da 'password_user' pelo id do usuário desejado, para poder fazer a validação no bcrypt
        SET query_password = (SELECT password_user FROM users WHERE id = enc);
        
        #se não existir um email na base de dados, então eu seto o method como FALSE
	ELSE
		SET method = FALSE;
	END IF;
END$

DELIMITER ;

