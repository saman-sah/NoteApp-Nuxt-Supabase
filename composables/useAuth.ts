const useAuth= ()=> {
    const user= useState("user",()=> null)
    const router= useRouter()
    const { supabase }= useSupabase();

    supabase.auth.onAuthStateChange((e, session)=> {
        user.value= session?.user || null;
    });

    const signUp=async ({email, password, ...metadata}) => {
        const { user: u , error } = await supabase.auth.signUp(
            {
                email : email,
                password  :password,
                options: {
                    emailRedirectTo: `${window.location.origin}/profile`,
                }
            },            
        )
        if(error) throw error;
        return u
    }

    const signIn =async({email, password }) => {
        const { data, error }= await supabase.auth.signInWithPassword({
            email,
            password
        })
        if(error){
            throw new Error('Invalid login credentials')
        }
        return data.user
    }

    const signOut= async ()=> {
        const { error }= await supabase.auth.signOut()
        if(error){
            throw new Error('sigout in not compeleted')
        }
        router.push("/")
    }
    
    
    const isLoggedIn= ()=> {
        return !!user.value
    }

    return {
        user,
        signUp,
        signIn,
        signOut,
        isLoggedIn
    }

}

export default useAuth