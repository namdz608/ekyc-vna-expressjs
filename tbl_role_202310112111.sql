CREATE TABLE ekyc_vna.tbl_role (
	id serial4 NOT NULL,
	role_name varchar(50) NULL,
	CONSTRAINT tbl_role_pkey PRIMARY KEY (id)
);

INSERT INTO ekyc_vna.tbl_role (role_name) VALUES
	 ('Super_Admin'),
	 ('Staff');
