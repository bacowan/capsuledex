// import supabase from "@/lib/supabase"
// import { z } from 'zod'

// const validImageTypes = ["image/jpeg", "image/png", "image/bmp"]
// const maxSizeString = process.env.MAX_FILE_SIZE_MB

// if (!maxSizeString) {
//     throw Error("MAX_FILE_SIZE_MB was not defined as an environment variable")
// }
// const maxSize = Number.parseInt(maxSizeString)

// const formDataSchema = z.object({
//     front: z.instanceof(File).optional(),
//     back: z.instanceof(File),
//     barcode: z.number().optional(),
//     name: z.string().optional(),
//     line: z.string().optional(),
//     brand: z.string().optional(),
// })

// type ValidatedPamphlet = {
//     front: File | undefined
//     back: File
//     barcode: number
//     name: string
//     line: string
//     brandId: number
// }

// async function validate(request: Request): Promise<ValidatedPamphlet | Response> {
//     // validate form data types
//     const formData = await request.formData()
//     const parsedFormData = formDataSchema.safeParse(Object.fromEntries(formData))

//     if (!parsedFormData.success) {
//         return Response.json({ error: z.treeifyError(parsedFormData.error) }, { status: 400 })
//     }

//     // validate images
//     const { front, back, name, line } = parsedFormData.data

//     if (!validImageTypes.includes(back.type) || (front && !validImageTypes.includes(front.type))) {
//         const formattedImageTypes = validImageTypes.map(i => i.slice('image/'.length)).join(", ")
//         return Response.json({ error: `Only ${formattedImageTypes} image types are supported` }, { status: 415 })
//     }
//     if (back.size > maxSize || (front && front.size > maxSize)) {
//         return Response.json({ error: `File exceeds the limit of ${process.env.MAX_FILE_SIZE_MB}MB` }, { status: 413 })
//     }

//     // TODO: verify with AI
//     // check if it already exists in the db
//     const barcode = parsedFormData.data.barcode ?? Math.floor(Math.random() * 10000000000)
//     const { data: existingSeries } = await supabase
//         .from('series')
//         .select('id')
//         .eq('barcode', barcode)
//         .maybeSingle()
//     if (existingSeries !== null) {
//         return Response.json({ error: `Series with given barcode already exists` }, { status: 409 })
//     }

//     // check if the given brand exists or not
//     const { data: brandData, error: brandError } = await supabase
//         .from('brand')
//         .select()
//         .eq('public_id', parsedFormData.data.brand ?? '456-def')
//         .single()
//     if (brandError) {
//         return Response.json({ error: 'Brand with given ID does not exist' }, { status: 422 })
//     }

//     return { front, back, barcode, name: name ?? "", line: line ?? "", brandId: brandData.id }
// }

// async function insert(data: ValidatedPamphlet): Promise<Response> {
//     // try to upload the images
//     const backId = crypto.randomUUID()
//     const backPath = `pamphlets/back/${backId}.${data.back.type.slice('image/'.length)}`
//     const { error: backError } = await supabase.storage
//         .from('public_images')
//         .upload(backPath, data.back)
//     if (backError) {
//         return Response.json({ error: "Failed to upload back image" }, { status: 500 })
//     }

//     let frontPath: string | null = null
//     if (data.front) {
//         const frontId = crypto.randomUUID()
//         frontPath = `pamphlets/front/${frontId}.${data.front.type.slice('image/'.length)}`
//         const { error: frontError } = await supabase.storage
//             .from('public_images')
//             .upload(frontPath, data.front)
//         if (frontError) {
//             // rollback back upload
//             await supabase.storage.from('public_images').remove([backPath])
//             return Response.json({ error: "Failed to upload front image" }, { status: 500 })
//         }
//     }

//     // upload the data into the database
//     const { error } = await supabase.from('series').insert({
//         barcode: data.barcode,
//         name: data.name,
//         line: data.line,
//         brand_id: data.brandId,
//         pamphlet_back_id: backPath,
//         pamphlet_front_id: frontPath,
//         official_url: null
//     })
//     if (error) {
//         return Response.json({ error: "Failed to insert series" }, { status: 500 })
//     }

//     return Response.json({}, { status: 201 })
// }

// export async function POST(request: Request) {
//     const validated = await validate(request)
//     if (validated instanceof Response) return validated
//     return insert(validated)
// }
