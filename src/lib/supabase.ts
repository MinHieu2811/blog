
import { createClient } from "@supabase/supabase-js";
// import { createServerClient } from '@supabase/ssr'
// import { cookies } from 'next/headers'


const supabaseUrl = process?.env?.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process?.env?.SUPABASE_SERVICE_ROLE_KEY;

export const supabase = createClient(supabaseUrl ?? '', supabaseKey ?? '');

// export async function createClientServer() {
//   const cookieStore = await cookies()

//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.SUPABASE_SERVICE_ROLE_KEY!,
//     {
//       cookies: {
//         getAll() {
//           return cookieStore.getAll()
//         },
//         setAll(cookiesToSet: any) {
//           try {
//             cookiesToSet.forEach(({ name, value, options }: any) =>
//               cookieStore.set(name, value, options)
//             )
//           } catch {
//             // The `setAll` method was called from a Server Component.
//             // This can be ignored if you have middleware refreshing
//             // user sessions.
//           }
//         },
//       },
//     }
//   )
// }

// export const supabaseServer = createClientServer()