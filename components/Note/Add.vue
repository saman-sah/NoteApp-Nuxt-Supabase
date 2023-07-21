<script setup lang="ts">

    const noteInput= reactive({
        title: "",
        note: "",
    })

    const { supabase }= useSupabase();
    const { user }= useAuth();

    const handleSubmit= async ()=> {
        if(!noteInput.title || !noteInput.note) return;
console.log(noteInput.title);
console.log(noteInput.note);
console.log(user.value.id);
        const { error } = await supabase.from("notes").insert({
            title: noteInput.title,
            note: noteInput.note,
            user_id: user.value.id            
        })

        if(error) {
            console.log(error);
        }
        noteInput.title= ""
        noteInput.note= ""


    }
</script>
<template>

<div class="mx-auto grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
        <div class="max-w-xl lg:max-w-xl">
          
          <p class="mt-4 text-lg leading-8 text-gray-300"></p>
          <div class="mt-6 flex max-w-md gap-x-4">
            <label for="email-address" class="sr-only">Email address</label>
            <input 
            v-model="noteInput.title"
            class="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            id="email-address" 
            name="email" 
            type="email" 
            autocomplete="email" 
            required 
            placeholder="Note Title">            
          </div>
        </div>
        <div class="max-w-xl lg:max-w-lg">
          <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl"></h2>
          <p class="mt-4 text-lg leading-8 text-gray-300"></p>
          <div class="mt-6 flex max-w-md gap-x-4 mt-16">
            <label for="email-address" class="sr-only">Email address</label>
            <textarea 
            v-model="noteInput.note"
            class="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            id="note" 
            name="note"
            autocomplete="note" 
            required 
            placeholder="Note Body"> 
            </textarea>           
            <button @click="handleSubmit"
            type="button" class="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
              Add Note
            </button>
          </div>
        </div>
      </div>  
    
</template>
<style scoped>
  input, textarea {
    outline: none;
  }
</style>