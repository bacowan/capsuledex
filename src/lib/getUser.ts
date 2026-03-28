import 'server-only'
import { cache } from "react";
import authorize from "./supabase/jwtAuthorize";
import { getUserProfile } from "@/services/userProfile";

export interface User {
    id: number,
    publicId: string,
    isCollectionPublic: boolean
}

export const getUser = cache(async (request: Request) => {
    const user = await authorize(request)
    if (user instanceof Response) {
        return null
    }

    const userProfile = await getUserProfile(user.id)
    
    return userProfile === null
        ? null
        : {
            id: userProfile.id,
            publicId: user.id,
            isCollectionPublic: userProfile.is_collection_public
        }
})