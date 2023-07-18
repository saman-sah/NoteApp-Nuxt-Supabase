import { createClient } from '@supabase/supabase-js'
const SUPABASE_KEY=""
const SUPABASE_URL = ''
const useSupabase= ()=> {
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

    return {
        supabase
    }
}

export default useSupabase