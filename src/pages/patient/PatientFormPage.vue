<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { DefaultTemplate } from '@/template'
import { mdiCancel, mdiPlusCircle } from '@mdi/js'
import type { PatientForm } from '@/interfaces/patient'
import type { IPatient, GetPatientListResponse } from '@/interfaces/patient'
import request from '@/engine/httpClient'
import { useRoute } from 'vue-router'
import { PageMode } from '@/enum'
import { useToastStore } from '@/stores'
import router from '@/router'
import { vMaska } from 'maska/vue'
import { documentNumberMask, phoneNumberMask, dateMask } from '@/utils'
import { clearMask } from '@/utils/string'

const toastStore = useToastStore()
const route = useRoute()
const isLoadingFilter = ref<boolean>(false)
const filterStatusId = ref<IPatient['id'] | null>(null)
const isLoadingForm = ref<boolean>(false)
const statusItems = ref<IPatient[]>([])

const id = route.params.id
const pageMode = id ? PageMode.PAGE_UPDATE : PageMode.PAGE_INSERT

const form = ref<PatientForm>({
  name: '',
  documentNumber: '',
  phoneNumber: '',
  birthDate: '',
  statusId: 1
})

const pageTitle = computed(() => {
  return pageMode === PageMode.PAGE_UPDATE ? 'Editar status' : 'Cadastrar novo paciente'
})

const loadFilters = async () => {
  isLoadingFilter.value = true

  try {
    const statusResponse = await request<undefined, GetPatientListResponse>({
      method: 'GET',
      endpoint: 'status/list'
    })

    if (statusResponse.isError) return

    statusItems.value = statusResponse.data.items
  } catch (e) {
    console.error('Erro ao buscar items do filtro', e)
  }

  isLoadingFilter.value = false
}

const submitForm = async () => {
  isLoadingForm.value = true

  //form.value.documentNumber = clearMask(form.value.documentNumber)
  //form.value.phoneNumber = clearMask(form.value.phoneNumber)

  const response = await request<PatientForm, null>({
    method: pageMode == PageMode.PAGE_INSERT ? 'POST' : 'PUT',
    endpoint: pageMode == PageMode.PAGE_INSERT ? 'patient/insert' : `patient/update/${id}`,
    body: {
      name: form.value.name,
      statusId: filterStatusId.value,
      documentNumber: clearMask(form.value.documentNumber),
      phoneNumber: clearMask(form.value.phoneNumber),
      birthDate: clearMask(form.value.birthDate)
    }
  })

  if (response.isError) return

  toastStore.setToast({
    type: 'success',
    text: `Status ${pageMode == PageMode.PAGE_INSERT ? 'criada' : 'alterada'} com sucesso!`
  })

  router.push({ name: 'status-list' })

  isLoadingForm.value = false
}

const loadForm = async () => {
  if (pageMode === PageMode.PAGE_INSERT) return

  isLoadingForm.value = true
  const statusFormResponse = await request<undefined, PatientForm>({
    method: 'GET',
    endpoint: `status/update/${id}`
  })

  if (statusFormResponse?.isError) return

  form.value = statusFormResponse.data
  isLoadingForm.value = false
}

onMounted(() => {
  loadForm()
  loadFilters()
})
</script>

<template>
  <default-template>
    <template #title>
      {{ pageTitle }}
    </template>

    <template #action>
      <v-btn :prepend-icon="mdiCancel" :to="{ name: 'status-list' }"> Cancelar </v-btn>
      <v-btn color="primary" :prepend-icon="mdiPlusCircle" @click.prevent="submitForm">
        Salvar
      </v-btn>
    </template>

    <v-form :disabled="isLoadingForm" @submit.prevent="submitForm">
      <v-row>
        <v-col cols="4">
          <v-text-field v-model.trim="form.name" label="Nome" hide-details />
        </v-col>
        <v-col cols="4">
          <v-select
            v-model="filterStatusId"
            label="Status"
            :loading="isLoadingFilter"
            :items="statusItems"
            item-value="id"
            item-title="name"
            clearable
            hide-details
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-text-field
            v-model.trim="form.documentNumber"
            v-maska="documentNumberMask"
            label="CPF"
            hide-details
        /></v-col>
        <v-col cols="4">
          <v-text-field
            v-model.trim="form.phoneNumber"
            v-maska="phoneNumberMask"
            label="Telefone"
            hide-details
          /> </v-col
        ><v-col cols="4">
          <v-text-field
            v-model.trim="form.birthDate"
            v-maska="dateMask"
            label="Data"
            hide-details
          />
        </v-col>
      </v-row>
    </v-form>
  </default-template>
</template>
