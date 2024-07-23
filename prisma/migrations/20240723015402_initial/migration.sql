-- CreateTable
CREATE TABLE "Movie" (
    "adult" BOOLEAN NOT NULL,
    "backdrop_path" TEXT,
    "id" INTEGER NOT NULL,
    "genre_ids" TEXT NOT NULL,
    "original_language" TEXT NOT NULL,
    "original_title" TEXT NOT NULL,
    "overview" TEXT,
    "popularity" DECIMAL(10,3),
    "poster_path" TEXT,
    "release_date" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "video" BOOLEAN NOT NULL,
    "vote_average" DECIMAL(10,3),
    "vote_count" INTEGER NOT NULL,
    "genre" TEXT NOT NULL,
    "words" TEXT NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sample" (
    "adult" BOOLEAN NOT NULL,
    "backdrop_path" TEXT,
    "id" INTEGER NOT NULL,
    "genre_ids" TEXT NOT NULL,
    "original_language" TEXT NOT NULL,
    "original_title" TEXT NOT NULL,
    "overview" TEXT,
    "popularity" DECIMAL(10,3),
    "poster_path" TEXT,
    "release_date" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "video" BOOLEAN NOT NULL,
    "vote_average" DECIMAL(10,3),
    "vote_count" INTEGER NOT NULL,
    "genre" TEXT NOT NULL,
    "words" TEXT NOT NULL,

    CONSTRAINT "Sample_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
