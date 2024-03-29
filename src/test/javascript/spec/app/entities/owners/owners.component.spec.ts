/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import OwnersComponent from '@/entities/owners/owners.vue';
import OwnersClass from '@/entities/owners/owners.component';
import OwnersService from '@/entities/owners/owners.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(ToastPlugin);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-badge', {});
localVue.component('jhi-sort-indicator', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('Owners Management Component', () => {
    let wrapper: Wrapper<OwnersClass>;
    let comp: OwnersClass;
    let ownersServiceStub: SinonStubbedInstance<OwnersService>;

    beforeEach(() => {
      ownersServiceStub = sinon.createStubInstance<OwnersService>(OwnersService);
      ownersServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<OwnersClass>(OwnersComponent, {
        store,
        localVue,
        stubs: { jhiItemCount: true, bPagination: true, bModal: bModalStub as any },
        provide: {
          ownersService: () => ownersServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      ownersServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllOwnerss();
      await comp.$nextTick();

      // THEN
      expect(ownersServiceStub.retrieve.called).toBeTruthy();
      expect(comp.owners[0]).toEqual(expect.objectContaining({ id: 123 }));
    });

    it('should load a page', async () => {
      // GIVEN
      ownersServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });
      comp.previousPage = 1;

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();

      // THEN
      expect(ownersServiceStub.retrieve.called).toBeTruthy();
      expect(comp.owners[0]).toEqual(expect.objectContaining({ id: 123 }));
    });

    it('should re-initialize the page', async () => {
      // GIVEN
      ownersServiceStub.retrieve.reset();
      ownersServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();
      comp.clear();
      await comp.$nextTick();

      // THEN
      expect(ownersServiceStub.retrieve.callCount).toEqual(2);
      expect(comp.page).toEqual(1);
      expect(comp.owners[0]).toEqual(expect.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,asc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // GIVEN
      comp.propOrder = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,asc', 'id']);
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      ownersServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(ownersServiceStub.retrieve.callCount).toEqual(1);

      comp.removeOwners();
      await comp.$nextTick();

      // THEN
      expect(ownersServiceStub.delete.called).toBeTruthy();
      expect(ownersServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
