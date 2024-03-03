-- CreateTable
CREATE TABLE "_AppToRequest" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AppToRequest_AB_unique" ON "_AppToRequest"("A", "B");

-- CreateIndex
CREATE INDEX "_AppToRequest_B_index" ON "_AppToRequest"("B");

-- AddForeignKey
ALTER TABLE "_AppToRequest" ADD CONSTRAINT "_AppToRequest_A_fkey" FOREIGN KEY ("A") REFERENCES "App"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppToRequest" ADD CONSTRAINT "_AppToRequest_B_fkey" FOREIGN KEY ("B") REFERENCES "Request"("id") ON DELETE CASCADE ON UPDATE CASCADE;
