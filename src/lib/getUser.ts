import 'server-only'
import { cache } from "react";
import authorize from "./supabase/jwtAuthorize";
import { getUserProfile } from "@/services/userProfile";
import { createClient } from './supabase/ssrServer';

export interface User {
    id: number,
    publicId: string,
    isCollectionPublic: boolean
}

export const getUser = cache(async () => {
    const client = await createClient()
    const { data } = await client.auth.getClaims()
    const id = data?.claims.sub
    if (!id) {
        return null
    }

    const userProfile = await getUserProfile(id)
    
    return userProfile === null
        ? null
        : {
            id: userProfile.id,
            publicId: id,
            isCollectionPublic: userProfile.is_collection_public
        }
})