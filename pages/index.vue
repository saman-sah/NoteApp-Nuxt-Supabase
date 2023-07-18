
<script setup lang="ts">
    const authState= ref<"Login" | "Signup">("Login")
    const { signUp, user, signIn, signOut }= useAuth();
    const toggleAuthState= () => {
        if(authState.value === "Login") authState.value= "Signup"
        else authState.value = "Login"
        authError.value= ""
    }
    const input= reactive({
        email:"",
        password: ""
    })

    const authError=ref("")
    const { supabase }= useSupabase()

    async function handleSubmit() {
        try {
            if(authState.value === "Login") {
                await signIn({
                    email: input.email,
                    password: input.password
                })
            }else {
                await signUp({
                    email: input.email,
                    password: input.password
                })
            }
            input.email= "";
            input.password=""
        } catch (error) {
            authError.value= error?.message;
        }
        
        
    }
</script>
<template>
    {{ user }}
    <div v-if="user" class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">You Are Logged In!</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div>
                <button @click="signOut"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Sign Out
                </button>
            </div>
        </div>
    </div>
    <div v-else class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{{ authState }} to your account</h2>
        </div>
  
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div class="mt-2">
                    <input 
                    v-model="input.email"
                    id="email" 
                    name="email" 
                    type="email" 
                    autocomplete="email" 
                    required 
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
        
                <div>
                    <div class="flex items-center justify-between">
                    <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <div class="text-sm">
                        <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                    </div>
                    </div>
                    <div class="mt-2">
                    <input 
                    v-model="input.password"
                    id="password" 
                    name="password" 
                    type="password" 
                    autocomplete="current-password" 
                    required 
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
        
                <div>
                    <button @click="handleSubmit"
                     class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                </div>
    
            <p v-if="authError" class="text-red-400 mt-10 text-center text-sm text-gray-500">
                {{ authError }}
            </p>
            <p class="mt-10 text-center text-sm text-gray-500">
                {{ authState=== "Login" ? 'Not a member!' : 'You already have an account!' }}    
                
                <span @click="toggleAuthState"
                class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer">
                    {{ authState=== "Login" ? 'Create on account' : 'Login to your account!' }}        
                
                </span>
            </p>
        </div>
    </div>
  </template>
  