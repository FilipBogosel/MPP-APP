import { Link } from 'react-router';
import { cls } from '@/styles/classes';
import type { SelectOption } from '@/types';
import { AddServiceBasicSection } from './AddServiceBasicSection';
import { AddServiceNotesSection } from './AddServiceNotesSection';
import { AddServiceShopCostSection } from './AddServiceShopCostSection';
import { AddServiceUploadSection } from './AddServiceUploadSection';
import { useAddServiceForm } from './useAddServiceForm';

type Props = {
  carOptions: ReadonlyArray<SelectOption>;
};

export function AddServiceForm({ carOptions }: Props) {
  const { form, onSubmit, submitError } = useAddServiceForm(carOptions);
  const { formState: { errors, isSubmitting }, handleSubmit, register } = form;

  return (
    <div className={`overflow-hidden ${cls.card}`}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8 p-6 sm:p-8">
        <div>
          <h3 className="mb-4 border-b pb-2 text-lg font-medium leading-6 text-gray-900">Basic Details</h3>
          <AddServiceBasicSection carOptions={carOptions} errors={errors} register={register} />
        </div>

        <div>
          <h3 className="mb-4 border-b pb-2 text-lg font-medium leading-6 text-gray-900">Shop & Cost</h3>
          <AddServiceShopCostSection errors={errors} register={register} />
        </div>

        <div>
          <h3 className="mb-4 border-b pb-2 text-lg font-medium leading-6 text-gray-900">Notes & Documents</h3>
          <div className="space-y-6">
            <AddServiceNotesSection errors={errors} register={register} />
            <AddServiceUploadSection />
          </div>
        </div>

        <div className="border-t border-gray-200 pt-5">
          <div className="flex justify-end gap-3">
            <Link
              to="/dashboard/records"
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className={isSubmitting ? cls.btnDisabled : cls.btnPrimary}
            >
              Save Record
            </button>
          </div>
          {submitError && <p className="mt-2 text-sm text-red-600">{submitError}</p>}
        </div>
      </form>
    </div>
  );
}
