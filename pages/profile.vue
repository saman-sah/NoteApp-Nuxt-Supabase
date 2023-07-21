<script setup lang="ts">
  definePageMeta({
    middleware: "auth"
  })
  
  const { supabase } = useSupabase();
  const { user } = useAuth();
  const notesRes= ref()

  if(process.client) {
    notesRes.value= await supabase.from("notes").select().eq("user_id", user.value.id)
  }
</script>
<template>
  <div class="profile-page w-100">
    <div class="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-8">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">Note App</h2>
        <NoteAdd />
        
      </div>
      
      <div class="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
        <div class="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
      </div>
      
    </div>
    <div class="relative isolate overflow-hidden p-16 sm:py-24 lg:py-8">
      <ul v-if="notesRes.data" role="list" class="divide-y divide-gray-100">
        <li v-for="note in notesRes.data"
        :key="note.id"
        class="flex justify-between gap-x-6 py-5">
          <div class="flex gap-x-4">
            <div class="min-w-0 flex-auto">
              <p class="text-xl font-semibold leading-6 text-gray-900">{{ note.title }}</p>
              <p class="mt-1 truncate text-lg leading-5 text-gray-500">{{ note.note }}</p>
            </div>
          </div>
          <div class="hidden sm:flex sm:flex-col sm:items-end">
            <p class="text-sm leading-6 text-gray-900">User name</p>
            <p class="mt-1 text-xs leading-5 text-gray-500">Created_at <time datetime="2023-01-23T13:23Z" class="ml-2">3h ago</time></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

