import { NotFoundError } from "./errors"
import { insertFlag, deleteFlag } from "@/repositories/flags"

// throws NotFoundError
export async function addFlag(
    barcode: string,
    isFront: boolean,
    fileName: string,
    user: { id: string },
): Promise<void> {
    const found = await insertFlag(barcode, isFront, fileName, user.id)
    if (!found) throw new NotFoundError()
}

export async function removeFlag(
    barcode: string,
    isFront: boolean,
    fileName: string,
    user: { id: string },
): Promise<void> {
    await deleteFlag(barcode, isFront, fileName, user.id)
}
