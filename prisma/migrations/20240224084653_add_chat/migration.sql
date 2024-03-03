-- CreateTable
CREATE TABLE "ChatMessage" (
    "appId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "chatRoomId" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("appId")
);

-- CreateTable
CREATE TABLE "ChatRoom" (
    "appId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatRoom_pkey" PRIMARY KEY ("appId")
);

-- CreateTable
CREATE TABLE "_ChatRoomToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ChatRoomToUser_AB_unique" ON "_ChatRoomToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ChatRoomToUser_B_index" ON "_ChatRoomToUser"("B");

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("appId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_chatRoomId_fkey" FOREIGN KEY ("chatRoomId") REFERENCES "ChatRoom"("appId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatRoomToUser" ADD CONSTRAINT "_ChatRoomToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "ChatRoom"("appId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatRoomToUser" ADD CONSTRAINT "_ChatRoomToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("appId") ON DELETE CASCADE ON UPDATE CASCADE;
