import { NotFoundError } from "./errors"
import { insertFlag, deleteFlag } from "@/repositories/flags"

// throws NotFoundError
export async function addFlag(
    barcode: string,
    type: 'P' | 'M',
    fileName: string,
    user: { id: string },
): Promise<void> {
    const found = await insertFlag(barcode, type, fileName, user.id)
    if (!found) throw new NotFoundError()
}

export async function removeFlag(
    barcode: string,
    type: 'P' | 'M',
    fileName: string,
    user: { id: string },
): Promise<void> {
    await deleteFlag(barcode, type, fileName, user.id)
}
