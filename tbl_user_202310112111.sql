CREATE TABLE ekyc_vna.tbl_user (
	id serial4 NOT NULL,
	"name" varchar(50) NULL,
	email varchar(255) NOT NULL,
	phone varchar(255) NOT NULL,
	"password" varchar(255) NULL,
	created_date timestamp NULL,
	is_delete bool NULL DEFAULT false,
	CONSTRAINT tbl_user_email_key UNIQUE (email),
	CONSTRAINT tbl_user_phone_key UNIQUE (phone),
	CONSTRAINT tbl_user_pkey PRIMARY KEY (id)
);

INSERT INTO ekyc_vna.tbl_user ("name",email,phone,"password",created_date,is_delete) VALUES
	 ('Vu Khanh Nam','namvu7689@gmail.com','0377040819','$2a$10$zC6K4v9rQDfvgSoh9tD0Vu1cUTf/POIrLD1g4FeAyeXnjr4SxWQxK','2023-10-11 13:12:54.717',false);
