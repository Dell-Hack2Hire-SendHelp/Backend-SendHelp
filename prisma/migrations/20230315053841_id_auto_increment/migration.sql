-- AlterTable
CREATE SEQUENCE order_id_seq;
ALTER TABLE "Order" ALTER COLUMN "id" SET DEFAULT nextval('order_id_seq');
ALTER SEQUENCE order_id_seq OWNED BY "Order"."id";

-- AlterTable
CREATE SEQUENCE tree_id_seq;
ALTER TABLE "Tree" ALTER COLUMN "id" SET DEFAULT nextval('tree_id_seq');
ALTER SEQUENCE tree_id_seq OWNED BY "Tree"."id";
