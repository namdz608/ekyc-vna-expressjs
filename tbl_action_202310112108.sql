CREATE TABLE ekyc_vna.tbl_action (
	id int4 NOT NULL DEFAULT nextval('ekyc_vna.tbl_action_role_id_seq'::regclass),
	"action" varchar(50) NULL
);

INSERT INTO ekyc_vna.tbl_action ("action") VALUES
	 ('delete_user'),
	 ('view_user_list'),
	 ('add_user_info'),
	 ('view_user_detail');
