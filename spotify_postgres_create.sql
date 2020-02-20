CREATE TABLE "client" (
	"id" serial NOT NULL,
	"client_id" serial(255) NOT NULL UNIQUE,
	CONSTRAINT "client_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "artist" (
	"id" serial NOT NULL UNIQUE,
	"name" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "artist_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "client_library" (
	"id" serial NOT NULL,
	"client_id" bigint NOT NULL,
	"artist_id" bigint NOT NULL,
	CONSTRAINT "client_library_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);





ALTER TABLE "client_library" ADD CONSTRAINT "client_library_fk0" FOREIGN KEY ("client_id") REFERENCES "client"("id");
ALTER TABLE "client_library" ADD CONSTRAINT "client_library_fk1" FOREIGN KEY ("artist_id") REFERENCES "artist"("id");
