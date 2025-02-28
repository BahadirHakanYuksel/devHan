-- CreateTable
CREATE TABLE "Friends" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'İsimsiz Kahraman',
    "surname" TEXT NOT NULL DEFAULT 'İsimsiz Kahraman',
    "birthdayDate" TIMESTAMP(3) NOT NULL,
    "profilePhoto" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "actionNumber" INTEGER NOT NULL,
    "eventsAttended" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Friends_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Events" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "googleMapsLink" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uploadedAt" TIMESTAMP(3) NOT NULL,
    "category" TEXT NOT NULL,
    "eventImg" TEXT NOT NULL,
    "participants" TEXT[],
    "reactions" TEXT[],
    "creatorName" TEXT NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);
