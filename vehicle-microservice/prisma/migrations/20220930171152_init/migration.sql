-- CreateTable
CREATE TABLE "Vehicle" (
    "guid" TEXT NOT NULL,
    "regNo" TEXT NOT NULL,
    "regDate" TIMESTAMP(3) NOT NULL,
    "chassisNo" TEXT NOT NULL,
    "quota" INTEGER DEFAULT 0,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("guid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_regNo_key" ON "Vehicle"("regNo");
