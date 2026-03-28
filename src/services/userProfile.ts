import { findUserProfileByPublicId } from "@/repositories/userProfile"

export const getUserProfile = async (publicId: string) => {
    return await findUserProfileByPublicId(publicId)
}