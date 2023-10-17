CREATE TABLE ekyc_vna.tbl_action (
	id serial,
	"action" varchar(50) NULL
);

INSERT INTO ekyc_vna.tbl_action ("action") VALUES
	 ('delete_user'),
	 ('view_user_list'),
	 ('add_user_info'),
	 ('view_user_detail');
