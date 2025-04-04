<script setup lang="ts">
import { ref } from 'vue'
import { DefaultTemplate } from '@/template'

const specialtyName = ref('')
const description = ref('')
const isActive = ref(true)

function handleSubmit() {
  const data = {
    specialtyName: specialtyName.value,
    description: description.value,
    isActive: isActive.value
  }
  console.log('Dados do formulário:', data)
}
</script>

<template>
  <default-template>
    <template #title>
      <h1>Specilaty Form</h1>
    </template>

    <template #default>
      <form class="space-y-4 p-4 bg-white rouded shadow-md max-w-md" @submit.prevent="handleSubmit">
        <div>
          <label class="block font-medium text-gray-700">Profissional</label>
          <input
            v-model="specialtyName"
            type="text"
            class="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div></form
    ></template>
  </default-template>
</template>
