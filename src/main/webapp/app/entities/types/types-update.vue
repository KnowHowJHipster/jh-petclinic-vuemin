<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="petclinicApp.types.home.createOrEditLabel" data-cy="TypesCreateUpdateHeading">Create or edit a Types</h2>
        <div>
          <div class="form-group" v-if="types.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="types.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="types-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="types-name"
              data-cy="name"
              :class="{ valid: !$v.types.name.$invalid, invalid: $v.types.name.$invalid }"
              v-model="$v.types.name.$model"
              required
            />
            <div v-if="$v.types.name.$anyDirty && $v.types.name.$invalid">
              <small class="form-text text-danger" v-if="!$v.types.name.required"> This field is required. </small>
              <small class="form-text text-danger" v-if="!$v.types.name.maxLength"> This field cannot be longer than 80 characters. </small>
            </div>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.types.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./types-update.component.ts"></script>
