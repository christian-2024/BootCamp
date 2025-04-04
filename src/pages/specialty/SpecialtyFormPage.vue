<script setup lang="ts">
import { ref } from 'vue'
import { DefaultTemplate } from '@/template'
import type {
  ISpecialty,
  GetSpecialtyListRequest,
  GetSpecialtyListResponse
} from '@/interfaces/specialty'

const filterName = ref<GetSpecialtyListRequest['name']>('')
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

const loadDataTable = async () => {
}
</script>

<template>
  <default-template>
    <template #title>
      <h1>Specilaty Form</h1>
    </template>

    
    <template #default>
      <v-sheet class="pa-4 mb-4">
        <v-form @submit.prevent="loadDataTable">
          <v-row>
            <v-col>
              <v-text-field v-model.trim="filterName" label="Nome" hide-details />
            </v-col>
            <v-col cols="auto" class="d-flex align-center">
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field v-model.trim="filterName" label="Especialidade" hide-details />
            </v-col>
            <v-col cols="auto" class="d-flex align-center">
              <v-btn color="primary" type="submit">Cadastrar</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-sheet>
    </template>
  </default-template>
</template>
