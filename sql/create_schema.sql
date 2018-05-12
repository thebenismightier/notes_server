CREATE TABLE note
(
  id	     	    INT unsigned NOT NULL AUTO_INCREMENT,
  title			    VARCHAR(255) NOT NULL,
  content		    VARCHAR(255) NOT NULL,
  type          ENUM('text') NOT NULL DEFAULT 'text',
  user_id	      INT unsigned NOT NULL,
  date_created  INT unsigned NOT NULL, # MS since epoch
  PRIMARY KEY	(id)
);

CREATE TABLE user
(
  id		    INT unsigned NOT NULL AUTO_INCREMENT,
  name			VARCHAR(255) NOT NULL,
  email			VARCHAR(255),
  PRIMARY KEY	(id)
);

ALTER TABLE note 
ADD CONSTRAINT FK_NoteCreatedBy
FOREIGN KEY (user_id) REFERENCES user(id);

-- INIT
insert into user (name, email) 
values ('admin', null);

insert into note (title, content, user_id, date_created) 
values ("BennyTitle", "bennyContent", 1, 5);