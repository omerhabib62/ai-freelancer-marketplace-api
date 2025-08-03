import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1754204954621 implements MigrationInterface {
  name = 'InitialMigration1754204954621';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "job_reviews" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "job_id" integer NOT NULL, "type" integer NOT NULL, "rating" character varying NOT NULL, "comment" text NOT NULL, "jobId" integer, "freelancerId" integer, "clientId" integer, CONSTRAINT "PK_ee149f66570f1416ba1f91d775a" PRIMARY KEY ("id")); COMMENT ON COLUMN "job_reviews"."comment" IS 'review text of client for review type'`,
    );
    await queryRunner.query(
      `CREATE TABLE "clients" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer NOT NULL, "national_id" character varying(255) NOT NULL, "national_id_type" character varying(255) NOT NULL, "image" character varying(255) NOT NULL, "title" character varying(255) NOT NULL, "type" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "userId" integer, CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "job_proposals" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "job_id" integer NOT NULL, "freelancer_id" integer NOT NULL, "status" character varying NOT NULL, "title" character varying(255) NOT NULL, "description" text NOT NULL, "submission_attachment" character varying(255) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "jobId" integer, "freelancerId" integer, CONSTRAINT "PK_dab61c202b2bf8f2603101c4afc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "job_payments" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "job_id" integer NOT NULL, "phone_number" character varying(12) NOT NULL, "amount" double precision NOT NULL, "is_payment_successful" boolean NOT NULL DEFAULT false, "jobId" integer, CONSTRAINT "PK_1c501fded61cbd8d14ab53d0aeb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "jobs" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "client_id" integer NOT NULL, "description" character varying(255) NOT NULL, "image" character varying(255) NOT NULL, "pay_rate_per_hour" double precision NOT NULL, "expected_duration_in_hours" double precision NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "clientId" integer, CONSTRAINT "PK_cf0a6c42b72fcc7f7c237def345" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "job_skills" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "job_id" integer NOT NULL, "skill_id" integer NOT NULL, "jobId" integer, "skillId" integer, CONSTRAINT "PK_79dc7f5be80bfe7a4e590a71041" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "skills" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, CONSTRAINT "PK_0d3212120f4ecedf90864d7e298" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "freelancer_skills" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "freelancer_id" integer NOT NULL, "skill_id" integer NOT NULL, "freelancerId" integer, "skillId" integer, CONSTRAINT "PK_d11d8dd6244b833967b299495c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "freelancers" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer NOT NULL, "national_id" character varying(255) NOT NULL, "national_id_type" character varying NOT NULL, "description" text NOT NULL, "title" character varying(255) NOT NULL, "years_of_experience" integer NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "userId" integer, CONSTRAINT "PK_2e27ad3c871f34f5d8cfffeb950" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "logs" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer NOT NULL, "action" character varying NOT NULL, "ip_address" character varying(255) NOT NULL, "time_created" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_fb1b805f2f7795de79fa69340ba" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying NOT NULL, "middle_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'freelancer', "bio" character varying, "skills" text, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "courses" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" text NOT NULL, "content" jsonb NOT NULL, "createdById" integer, CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "quizzes" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "questions" jsonb NOT NULL, "courseId" integer, CONSTRAINT "PK_b24f0f7662cf6b3a0e7dba0a1b4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "locations" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "address" character varying(255) NOT NULL, "state" character varying(255) NOT NULL, "country" character varying(255) NOT NULL, "city" character varying(255) NOT NULL, "latitude" character varying(255) NOT NULL, "longitude" character varying(255) NOT NULL, CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."projects_status_enum" AS ENUM('open', 'in_progress', 'completed', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TABLE "projects" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" text NOT NULL, "status" "public"."projects_status_enum" NOT NULL DEFAULT 'open', "budget" numeric NOT NULL, "deadline" TIMESTAMP NOT NULL, "clientId" integer, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "enrollments" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "progress" numeric NOT NULL, "completed" boolean NOT NULL DEFAULT false, "userId" integer, "courseId" integer, CONSTRAINT "PK_7c0f752f9fb68bf6ed7367ab00f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "chat_messages" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "markAsRead" boolean NOT NULL DEFAULT 'false', "content" text NOT NULL, "sentAt" TIMESTAMP NOT NULL, "senderId" integer, "receiverId" integer, "jobProjectId" integer, CONSTRAINT "PK_40c55ee0e571e268b0d3cd37d10" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."bids_status_enum" AS ENUM('pending', 'accepted', 'rejected')`,
    );
    await queryRunner.query(
      `CREATE TABLE "bids" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "amount" numeric NOT NULL, "timeline" integer NOT NULL, "status" "public"."bids_status_enum" NOT NULL DEFAULT 'pending', "freelancerId" integer, "jobProjectId" integer, CONSTRAINT "PK_7950d066d322aab3a488ac39fe5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_reviews" ADD CONSTRAINT "FK_62879c803b94b7d2737183dc518" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_reviews" ADD CONSTRAINT "FK_d4f88c648b16424c9a99c5ac839" FOREIGN KEY ("freelancerId") REFERENCES "freelancers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_reviews" ADD CONSTRAINT "FK_b3443881a6dbfdd6aa0f99eabf5" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ADD CONSTRAINT "FK_59c1e5e51addd6ebebf76230b37" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_proposals" ADD CONSTRAINT "FK_99d5faffcfeb5383df7e71b8f62" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_proposals" ADD CONSTRAINT "FK_80d6dd105ba1158c04f111fda46" FOREIGN KEY ("freelancerId") REFERENCES "freelancers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_payments" ADD CONSTRAINT "FK_89331be70aa2a7a66d37e181e8f" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD CONSTRAINT "FK_e638bfcae652e31c8a92ebac147" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_skills" ADD CONSTRAINT "FK_aef367731b3f3e78ea90892fd47" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_skills" ADD CONSTRAINT "FK_b8d0000c11602550abb81788412" FOREIGN KEY ("skillId") REFERENCES "skills"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "freelancer_skills" ADD CONSTRAINT "FK_b9dc136ff67a4899f07707b1e13" FOREIGN KEY ("freelancerId") REFERENCES "freelancers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "freelancer_skills" ADD CONSTRAINT "FK_faf9acaae384d1607267b2e479e" FOREIGN KEY ("skillId") REFERENCES "skills"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "freelancers" ADD CONSTRAINT "FK_1672df028678c74fffe28fbb723" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "logs" ADD CONSTRAINT "FK_a1196a1956403417fe3a0343390" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD CONSTRAINT "FK_3fff66ead8c0964a1805eb194b3" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quizzes" ADD CONSTRAINT "FK_9021b7e89ea353c02a361a10b72" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ADD CONSTRAINT "FK_091f9433895a53408cb8ae3864f" FOREIGN KEY ("clientId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollments" ADD CONSTRAINT "FK_de33d443c8ae36800c37c58c929" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollments" ADD CONSTRAINT "FK_60dd0ae4e21002e63a5fdefeec8" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "chat_messages" ADD CONSTRAINT "FK_fc6b58e41e9a871dacbe9077def" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "chat_messages" ADD CONSTRAINT "FK_9a197c82c9ea44d75bc145a6e2c" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "chat_messages" ADD CONSTRAINT "FK_20736b2371a78c60b637c458d85" FOREIGN KEY ("jobProjectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bids" ADD CONSTRAINT "FK_a17064c5537e773e9f1d6ab883c" FOREIGN KEY ("freelancerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bids" ADD CONSTRAINT "FK_92e0df226ee0a8b7a2eeef79dc8" FOREIGN KEY ("jobProjectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bids" DROP CONSTRAINT "FK_92e0df226ee0a8b7a2eeef79dc8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bids" DROP CONSTRAINT "FK_a17064c5537e773e9f1d6ab883c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "chat_messages" DROP CONSTRAINT "FK_20736b2371a78c60b637c458d85"`,
    );
    await queryRunner.query(
      `ALTER TABLE "chat_messages" DROP CONSTRAINT "FK_9a197c82c9ea44d75bc145a6e2c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "chat_messages" DROP CONSTRAINT "FK_fc6b58e41e9a871dacbe9077def"`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollments" DROP CONSTRAINT "FK_60dd0ae4e21002e63a5fdefeec8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollments" DROP CONSTRAINT "FK_de33d443c8ae36800c37c58c929"`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" DROP CONSTRAINT "FK_091f9433895a53408cb8ae3864f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quizzes" DROP CONSTRAINT "FK_9021b7e89ea353c02a361a10b72"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" DROP CONSTRAINT "FK_3fff66ead8c0964a1805eb194b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "logs" DROP CONSTRAINT "FK_a1196a1956403417fe3a0343390"`,
    );
    await queryRunner.query(
      `ALTER TABLE "freelancers" DROP CONSTRAINT "FK_1672df028678c74fffe28fbb723"`,
    );
    await queryRunner.query(
      `ALTER TABLE "freelancer_skills" DROP CONSTRAINT "FK_faf9acaae384d1607267b2e479e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "freelancer_skills" DROP CONSTRAINT "FK_b9dc136ff67a4899f07707b1e13"`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_skills" DROP CONSTRAINT "FK_b8d0000c11602550abb81788412"`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_skills" DROP CONSTRAINT "FK_aef367731b3f3e78ea90892fd47"`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" DROP CONSTRAINT "FK_e638bfcae652e31c8a92ebac147"`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_payments" DROP CONSTRAINT "FK_89331be70aa2a7a66d37e181e8f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_proposals" DROP CONSTRAINT "FK_80d6dd105ba1158c04f111fda46"`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_proposals" DROP CONSTRAINT "FK_99d5faffcfeb5383df7e71b8f62"`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" DROP CONSTRAINT "FK_59c1e5e51addd6ebebf76230b37"`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_reviews" DROP CONSTRAINT "FK_b3443881a6dbfdd6aa0f99eabf5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_reviews" DROP CONSTRAINT "FK_d4f88c648b16424c9a99c5ac839"`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_reviews" DROP CONSTRAINT "FK_62879c803b94b7d2737183dc518"`,
    );
    await queryRunner.query(`DROP TABLE "bids"`);
    await queryRunner.query(`DROP TYPE "public"."bids_status_enum"`);
    await queryRunner.query(`DROP TABLE "chat_messages"`);
    await queryRunner.query(`DROP TABLE "enrollments"`);
    await queryRunner.query(`DROP TABLE "projects"`);
    await queryRunner.query(`DROP TYPE "public"."projects_status_enum"`);
    await queryRunner.query(`DROP TABLE "locations"`);
    await queryRunner.query(`DROP TABLE "quizzes"`);
    await queryRunner.query(`DROP TABLE "courses"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "logs"`);
    await queryRunner.query(`DROP TABLE "freelancers"`);
    await queryRunner.query(`DROP TABLE "freelancer_skills"`);
    await queryRunner.query(`DROP TABLE "skills"`);
    await queryRunner.query(`DROP TABLE "job_skills"`);
    await queryRunner.query(`DROP TABLE "jobs"`);
    await queryRunner.query(`DROP TABLE "job_payments"`);
    await queryRunner.query(`DROP TABLE "job_proposals"`);
    await queryRunner.query(`DROP TABLE "clients"`);
    await queryRunner.query(`DROP TABLE "job_reviews"`);
  }
}
