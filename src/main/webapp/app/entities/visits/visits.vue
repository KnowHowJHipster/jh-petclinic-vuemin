<template>
  <div>
    <h2 id="page-heading" data-cy="VisitsHeading">
      <span id="visits-heading">Visits</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'VisitsCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-visits"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Visits </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && visits && visits.length === 0">
      <span>No visits found</span>
    </div>
    <div class="table-responsive" v-if="visits && visits.length > 0">
      <table class="table table-striped" aria-describedby="visits">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span>ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('visitdate')">
              <span>Visitdate</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'visitdate'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('description')">
              <span>Description</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'description'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('pet.id')">
              <span>Pet</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'pet.id'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="visits in visits" :key="visits.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'VisitsView', params: { visitsId: visits.id } }">{{ visits.id }}</router-link>
            </td>
            <td>{{ visits.visitdate | formatDate }}</td>
            <td>{{ visits.description }}</td>
            <td>
              <div v-if="visits.pet">
                <router-link :to="{ name: 'PetsView', params: { petsId: visits.pet.id } }">{{ visits.pet.id }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'VisitsView', params: { visitsId: visits.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'VisitsEdit', params: { visitsId: visits.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(visits)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="petclinicApp.visits.delete.question" data-cy="visitsDeleteDialogHeading">Confirm delete operation</span></span
      >
      <div class="modal-body">
        <p id="jhi-delete-visits-heading">Are you sure you want to delete this Visits?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-visits"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeVisits()"
        >
          Delete
        </button>
      </div>
    </b-modal>
    <div v-show="visits && visits.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./visits.component.ts"></script>
