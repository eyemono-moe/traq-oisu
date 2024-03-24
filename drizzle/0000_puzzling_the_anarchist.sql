CREATE TABLE `list_admins` (
	`list_id` bigint NOT NULL,
	`user_id` char NOT NULL,
	CONSTRAINT `list_admins_list_id_user_id_pk` PRIMARY KEY(`list_id`,`user_id`)
);
--> statement-breakpoint
CREATE TABLE `lists` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`title` char NOT NULL,
	`description` char NOT NULL,
	`visibility` int NOT NULL,
	`begin_at` timestamp NOT NULL DEFAULT (now()),
	`end_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `lists_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `receptions` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`list_id` bigint,
	`user_id` char,
	`guest_name` char,
	`event_type` int NOT NULL,
	`attend_method` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `receptions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `receptions` ADD CONSTRAINT `receptions_list_id_lists_id_fk` FOREIGN KEY (`list_id`) REFERENCES `lists`(`id`) ON DELETE no action ON UPDATE no action;